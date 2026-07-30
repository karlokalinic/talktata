/*
 * TalkTata runtime compatibility layer.
 *
 * This file is injected by the Electron main process after app.js. It keeps
 * speech, microphone and sound effects optional: the course must remain usable
 * when a device is missing, permission is denied, or a browser API fails.
 */
(() => {
    'use strict';

    if (window.__talkTataRuntimePatched) return;
    window.__talkTataRuntimePatched = true;

    const runtime = {
        tts: {
            supported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
            ready: false,
            voice: null,
            lastError: null,
        },
        stt: {
            apiSupported: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
            permission: 'unknown',
            device: 'unknown',
            active: false,
            lastError: null,
        },
        sfx: {
            available: !!(window.AudioContext || window.webkitAudioContext),
            lastError: null,
        },
    };

    let activeRecognition = null;
    let capabilityBanner = null;
    let reportedTtsFailure = false;

    function getGlobal(name) {
        try {
            // Separate classic scripts share the global lexical environment,
            // but these bindings are intentionally not properties of window.
            return Function(`return typeof ${name} !== 'undefined' ? ${name} : null`)();
        } catch (_) {
            return null;
        }
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, Number(value) || min));
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function safeToast(title, message, icon = 'ℹ️') {
        const ToastRef = getGlobal('Toast');
        try {
            if (ToastRef && typeof ToastRef.show === 'function') {
                ToastRef.show('info', icon, title, message);
                return;
            }
        } catch (_) {}
        console.info(`[TalkTata] ${title}: ${message}`);
    }

    function reportError(scope, error) {
        const normalized = error instanceof Error ? error : new Error(String(error || 'Unknown error'));
        console.error(`[TalkTata:${scope}]`, normalized);
        try {
            window.electronRuntime?.reportRendererError?.({
                scope,
                message: normalized.message,
                stack: normalized.stack || '',
            });
        } catch (_) {}
    }

    function dispatchCapabilitiesChanged() {
        window.dispatchEvent(new CustomEvent('talktata:capabilities-changed', {
            detail: getStatus(),
        }));
        syncAudioControls();
        renderCapabilityBanner();
    }

    function getState() {
        return getGlobal('state');
    }

    function microphoneDisabledByUser() {
        const appState = getState();
        return !!appState?.micDisabled;
    }

    function isMicAvailable() {
        if (microphoneDisabledByUser()) return false;
        if (!runtime.stt.apiSupported) return false;
        if (runtime.stt.permission === 'denied') return false;
        if (runtime.stt.device === 'missing') return false;
        return true;
    }

    function getStatus() {
        return JSON.parse(JSON.stringify({
            ...runtime,
            stt: {
                ...runtime.stt,
                available: isMicAvailable(),
                disabledByUser: microphoneDisabledByUser(),
            },
        }));
    }

    async function probeMicrophone({ requestPermission = false } = {}) {
        runtime.stt.apiSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

        if (!navigator.mediaDevices) {
            runtime.stt.device = runtime.stt.apiSupported ? 'unknown' : 'missing';
            dispatchCapabilitiesChanged();
            return getStatus();
        }

        if (navigator.permissions?.query) {
            try {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                runtime.stt.permission = permission.state;
                permission.onchange = () => {
                    runtime.stt.permission = permission.state;
                    dispatchCapabilitiesChanged();
                };
            } catch (_) {
                runtime.stt.permission = 'unknown';
            }
        }

        if (requestPermission && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                stream.getTracks().forEach(track => track.stop());
                runtime.stt.permission = 'granted';
                runtime.stt.device = 'present';
            } catch (error) {
                const name = error?.name || '';
                runtime.stt.lastError = name || String(error);
                if (name === 'NotAllowedError' || name === 'SecurityError') runtime.stt.permission = 'denied';
                if (name === 'NotFoundError' || name === 'DevicesNotFoundError') runtime.stt.device = 'missing';
            }
        }

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const inputs = devices.filter(device => device.kind === 'audioinput');
            // Some browsers hide devices before permission. An empty list combined
            // with a denied permission is definitive; otherwise keep it unknown.
            if (inputs.length > 0) runtime.stt.device = 'present';
            else if (runtime.stt.permission === 'granted' || runtime.stt.permission === 'denied') runtime.stt.device = 'missing';
            else runtime.stt.device = 'unknown';
        } catch (error) {
            runtime.stt.lastError = error?.message || String(error);
        }

        dispatchCapabilitiesChanged();
        return getStatus();
    }

    function chooseVoice() {
        if (!runtime.tts.supported) return null;
        const voices = window.speechSynthesis.getVoices?.() || [];
        runtime.tts.voice = voices.find(v => v.lang === 'en-US' && v.localService)
            || voices.find(v => v.lang === 'en-US')
            || voices.find(v => /^en[-_]/i.test(v.lang))
            || voices[0]
            || null;
        runtime.tts.ready = true; // The browser default voice also works when the list is temporarily empty.
        dispatchCapabilitiesChanged();
        return runtime.tts.voice;
    }

    function showTextAudioFallback(text, reason = 'Zvuk nije dostupan na ovom uređaju.') {
        const cleanText = String(text || '').trim();
        if (!cleanText) return;

        const exerciseBody = document.querySelector('#view-exercise:not(.hidden) #exercise-body');
        const phraseCard = document.querySelector('#view-lesson:not(.hidden) #phrase-card');
        const host = exerciseBody || phraseCard || document.querySelector('#main-content');
        if (!host) return;

        let panel = host.querySelector(':scope > .runtime-audio-transcript');
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'runtime-audio-transcript';
            panel.style.cssText = [
                'margin:14px 0',
                'padding:14px 16px',
                'border:1px solid rgba(201,168,76,.45)',
                'border-radius:12px',
                'background:rgba(201,168,76,.10)',
                'line-height:1.5',
                'text-align:center',
            ].join(';');
            host.prepend(panel);
        }
        panel.innerHTML = `<strong>Tekstualni način</strong><br>${escapeHtml(reason)}<br><span style="font-size:1.1em">“${escapeHtml(cleanText)}”</span>`;
    }

    function patchTts() {
        const TTSRef = getGlobal('TTS');
        if (!TTSRef) return;

        TTSRef.init = () => {
            if (!runtime.tts.supported) {
                runtime.tts.ready = false;
                dispatchCapabilitiesChanged();
                return;
            }
            chooseVoice();
            try {
                window.speechSynthesis.addEventListener?.('voiceschanged', chooseVoice);
            } catch (_) {
                window.speechSynthesis.onvoiceschanged = chooseVoice;
            }
        };

        TTSRef.speak = (text, rate = 0.9, onEnd) => {
            const done = typeof onEnd === 'function' ? onEnd : () => {};
            if (!runtime.tts.supported) {
                runtime.tts.lastError = 'speech-synthesis-not-supported';
                showTextAudioFallback(text);
                if (!reportedTtsFailure) {
                    reportedTtsFailure = true;
                    safeToast('Tekstualni način', 'Glasovno čitanje nije dostupno, ali sve lekcije i dalje rade.', '🔇');
                }
                queueMicrotask(done);
                return null;
            }

            try {
                const SettingsRef = getGlobal('Settings');
                const speedMultiplier = SettingsRef?.getTtsSpeed ? SettingsRef.getTtsSpeed() : 1;
                window.speechSynthesis.cancel();
                window.speechSynthesis.resume?.();

                const utterance = new SpeechSynthesisUtterance(String(text || ''));
                utterance.voice = runtime.tts.voice || chooseVoice();
                utterance.lang = utterance.voice?.lang || 'en-US';
                utterance.rate = clamp(rate * speedMultiplier, 0.35, 1.8);
                utterance.pitch = 1;
                utterance.volume = 1;
                utterance.onend = done;
                utterance.onerror = event => {
                    runtime.tts.lastError = event.error || 'speech-error';
                    reportError('tts', new Error(runtime.tts.lastError));
                    showTextAudioFallback(text, 'Glasovno čitanje nije uspjelo. Fraza je prikazana kao tekst.');
                    done();
                    dispatchCapabilitiesChanged();
                };
                window.speechSynthesis.speak(utterance);
                runtime.tts.ready = true;
                return utterance;
            } catch (error) {
                runtime.tts.lastError = error?.message || String(error);
                reportError('tts', error);
                showTextAudioFallback(text, 'Glasovno čitanje nije uspjelo. Fraza je prikazana kao tekst.');
                queueMicrotask(done);
                dispatchCapabilitiesChanged();
                return null;
            }
        };

        TTSRef.speakSlow = (text, onEnd) => TTSRef.speak(text, 0.6, onEnd);
        TTSRef.stop = () => {
            try { window.speechSynthesis?.cancel(); } catch (_) {}
        };
        TTSRef.isReady = () => runtime.tts.supported && runtime.tts.ready;
    }

    function normalizeSpeech(text) {
        return String(text || '').toLowerCase()
            .replace(/n't/g, ' not')
            .replace(/'re/g, ' are')
            .replace(/'s/g, ' is')
            .replace(/'ll/g, ' will')
            .replace(/'d/g, ' would')
            .replace(/'ve/g, ' have')
            .replace(/'m/g, ' am')
            .replace(/[^a-z\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function levenshtein(a, b) {
        const rows = a.length + 1;
        const cols = b.length + 1;
        const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
        for (let i = 0; i < rows; i++) matrix[i][0] = i;
        for (let j = 0; j < cols; j++) matrix[0][j] = j;
        for (let i = 1; i < rows; i++) {
            for (let j = 1; j < cols; j++) {
                matrix[i][j] = a[i - 1] === b[j - 1]
                    ? matrix[i - 1][j - 1]
                    : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
            }
        }
        return matrix[a.length][b.length];
    }

    function similarity(a, b) {
        const left = normalizeSpeech(a);
        const right = normalizeSpeech(b);
        if (left === right) return 1;
        const max = Math.max(left.length, right.length);
        return max === 0 ? 1 : Math.max(0, 1 - levenshtein(left, right) / max);
    }

    function mapRecognitionError(code) {
        const messages = {
            'not-allowed': 'Pristup mikrofonu je odbijen.',
            'service-not-allowed': 'Sustav ne dopušta prepoznavanje govora.',
            'audio-capture': 'Mikrofon nije pronađen ili ga koristi drugi program.',
            'no-speech': 'Nisam čuo govor. Možete pokušati ponovno ili nastaviti bez mikrofona.',
            'network': 'Prepoznavanje govora trenutačno nema mrežnu uslugu.',
            'aborted': 'Snimanje je prekinuto.',
            'not-available': 'Prepoznavanje govora nije dostupno.',
        };
        return messages[code] || 'Prepoznavanje govora nije uspjelo.';
    }

    function markRecognitionFailure(code) {
        runtime.stt.lastError = code;
        if (code === 'not-allowed' || code === 'service-not-allowed') runtime.stt.permission = 'denied';
        if (code === 'audio-capture') runtime.stt.device = 'missing';
        dispatchCapabilitiesChanged();
    }

    function renderLessonMicFallback(targetText) {
        const feedback = document.getElementById('phrase-feedback');
        if (!feedback) return;
        const LessonsRef = getGlobal('Lessons');
        feedback.className = 'phrase-feedback retry';
        feedback.classList.remove('hidden');
        feedback.innerHTML = `
            <p><strong>Mikrofon nije potreban.</strong> Izgovorite naglas:</p>
            <p style="font-size:1.15em">“${escapeHtml(targetText)}”</p>
            <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
                <button class="btn btn-success runtime-self-good">👍 Zvučalo je dobro</button>
                <button class="btn btn-secondary runtime-self-retry">🔄 Pokušat ću ponovo</button>
            </div>`;
        feedback.querySelector('.runtime-self-good')?.addEventListener('click', () => LessonsRef?._selfAssess?.(true));
        feedback.querySelector('.runtime-self-retry')?.addEventListener('click', () => LessonsRef?._selfAssess?.(false));
    }

    function renderExerciseMicFallback(targetText) {
        const area = document.querySelector('#view-exercise:not(.hidden) .shadowing-btn-area');
        if (!area || area.querySelector('.runtime-shadowing-fallback')) return;

        area.querySelectorAll('button').forEach(button => {
            if (/Slušam|Ponovi naglas/.test(button.textContent || '')) button.remove();
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'runtime-shadowing-fallback';
        wrapper.style.cssText = 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%';
        wrapper.innerHTML = `
            <button class="btn btn-success runtime-shadow-good">👍 Ponovio sam dobro</button>
            <button class="btn btn-secondary runtime-shadow-retry">🔄 Ponovi frazu</button>
            <button class="btn btn-secondary runtime-shadow-next">Nastavi bez mikrofona →</button>`;
        area.appendChild(wrapper);

        const revealNext = () => {
            const next = document.getElementById('btn-next-exercise');
            next?.classList.remove('hidden');
        };
        wrapper.querySelector('.runtime-shadow-good')?.addEventListener('click', () => {
            const appState = getState();
            if (appState) appState.exerciseCorrect = (appState.exerciseCorrect || 0) + 1;
            const GamificationRef = getGlobal('Gamification');
            try { GamificationRef?.addXP?.(5); } catch (_) {}
            revealNext();
            safeToast('Vježba završena', 'Nastavite kad ste spremni.', '✅');
        });
        wrapper.querySelector('.runtime-shadow-retry')?.addEventListener('click', () => {
            const TTSRef = getGlobal('TTS');
            TTSRef?.speak?.(targetText);
        });
        wrapper.querySelector('.runtime-shadow-next')?.addEventListener('click', revealNext);
    }

    function runRecognition(targetText, callback, freeform = false) {
        const done = typeof callback === 'function' ? callback : () => {};
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!isMicAvailable() || !SR) {
            const error = runtime.stt.lastError || 'not-available';
            done(freeform
                ? { heard: '', error }
                : { success: false, heard: '', score: 0, error });
            if (freeform) renderExerciseMicFallback(targetText);
            else renderLessonMicFallback(targetText);
            return;
        }

        try { activeRecognition?.abort?.(); } catch (_) {}

        let recognition;
        try {
            recognition = new SR();
        } catch (error) {
            markRecognitionFailure('not-available');
            done(freeform
                ? { heard: '', error: 'not-available' }
                : { success: false, heard: '', score: 0, error: 'not-available' });
            return;
        }

        activeRecognition = recognition;
        runtime.stt.active = true;
        runtime.stt.lastError = null;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.maxAlternatives = 5;

        let settled = false;
        const settle = result => {
            if (settled) return;
            settled = true;
            runtime.stt.active = false;
            if (activeRecognition === recognition) activeRecognition = null;
            clearTimeout(timeoutId);
            done(result);
        };

        const timeoutId = window.setTimeout(() => {
            try { recognition.abort(); } catch (_) {}
            markRecognitionFailure('no-speech');
            settle(freeform
                ? { heard: '', error: 'no-speech' }
                : { success: false, heard: '', score: 0, error: 'no-speech' });
        }, 12000);

        recognition.onresult = event => {
            const alternatives = event.results?.[0] || [];
            let bestHeard = '';
            let bestScore = 0;
            for (let index = 0; index < alternatives.length; index++) {
                const heard = alternatives[index]?.transcript || '';
                const score = targetText ? similarity(heard, targetText) : (alternatives[index]?.confidence || 1);
                if (score >= bestScore) {
                    bestScore = score;
                    bestHeard = heard;
                }
            }
            runtime.stt.permission = 'granted';
            runtime.stt.device = 'present';
            dispatchCapabilitiesChanged();
            settle(freeform
                ? { heard: bestHeard, error: null }
                : { success: bestScore >= 0.70, heard: bestHeard, score: bestScore, error: null });
        };

        recognition.onerror = event => {
            const code = event.error || 'recognition-error';
            markRecognitionFailure(code);
            settle(freeform
                ? { heard: '', error: code }
                : { success: false, heard: '', score: 0, error: code });

            if (code === 'not-allowed' || code === 'service-not-allowed' || code === 'audio-capture' || code === 'not-available') {
                safeToast('Nastavite bez mikrofona', mapRecognitionError(code), '🎤');
                window.setTimeout(() => {
                    if (document.querySelector('#view-lesson:not(.hidden)')) renderLessonMicFallback(targetText);
                    else renderExerciseMicFallback(targetText);
                }, 0);
            }
        };

        recognition.onnomatch = () => {
            settle(freeform
                ? { heard: '', error: 'no-speech' }
                : { success: false, heard: '', score: 0, error: 'no-speech' });
        };

        recognition.onend = () => {
            if (!settled) {
                settle(freeform
                    ? { heard: '', error: 'no-speech' }
                    : { success: false, heard: '', score: 0, error: 'no-speech' });
            }
        };

        try {
            recognition.start();
        } catch (error) {
            markRecognitionFailure(error?.name === 'InvalidStateError' ? 'aborted' : 'not-available');
            settle(freeform
                ? { heard: '', error: runtime.stt.lastError }
                : { success: false, heard: '', score: 0, error: runtime.stt.lastError });
        }
    }

    function patchStt() {
        const STTRef = getGlobal('STT');
        if (!STTRef) return;

        STTRef.init = () => {
            runtime.stt.apiSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
            probeMicrophone().catch(error => reportError('microphone-probe', error));
        };
        STTRef.listen = (targetText, callback) => runRecognition(targetText, callback, false);
        STTRef.listenFreeform = callback => runRecognition('', callback, true);
        STTRef.stop = () => {
            try { activeRecognition?.abort?.(); } catch (_) {}
            activeRecognition = null;
            runtime.stt.active = false;
        };
        STTRef.isAvailable = isMicAvailable;
        STTRef.similarity = similarity;
        STTRef.normalize = normalizeSpeech;
    }

    function patchSfx() {
        const SFXRef = getGlobal('SFX');
        if (!SFXRef) return;
        ['init', 'play', 'resume', 'playCombo', 'toggle'].forEach(method => {
            const original = SFXRef[method];
            if (typeof original !== 'function') return;
            SFXRef[method] = (...args) => {
                try {
                    return original(...args);
                } catch (error) {
                    runtime.sfx.available = false;
                    runtime.sfx.lastError = error?.message || String(error);
                    reportError(`sfx-${method}`, error);
                    dispatchCapabilitiesChanged();
                    return undefined;
                }
            };
        });
    }

    function patchPersistence() {
        ['Storage', 'ProfileManager'].forEach(globalName => {
            const target = getGlobal(globalName);
            if (!target) return;
            Object.keys(target).forEach(method => {
                if (typeof target[method] !== 'function') return;
                const original = target[method];
                target[method] = (...args) => {
                    try {
                        return original(...args);
                    } catch (error) {
                        reportError(`${globalName}.${method}`, error);
                        safeToast('Podaci nisu spremljeni', 'Aplikacija će nastaviti raditi, ali provjerite slobodan prostor.', '⚠️');
                        return method.startsWith('get') ? null : false;
                    }
                };
            });
        });
    }

    function syncAudioControls() {
        const micAvailable = isMicAvailable();
        const ttsAvailable = runtime.tts.supported;

        document.querySelectorAll('#btn-record, .btn-record').forEach(button => {
            button.textContent = micAvailable ? '🎤 Pokušaj izgovoriti' : '🗣️ Vježbaj bez mikrofona';
            button.title = micAvailable
                ? 'Provjeri izgovor mikrofonom'
                : 'Izgovorite frazu naglas i sami potvrdite rezultat';
            button.dataset.audioMode = micAvailable ? 'microphone' : 'manual';
        });

        if (!ttsAvailable) {
            document.querySelectorAll('#btn-play, #btn-play-slow, .exercise-play-btn').forEach(button => {
                button.title = 'Audio nije dostupan; klik prikazuje tekst fraze';
                button.dataset.audioMode = 'text';
            });
        }
    }

    function renderCapabilityBanner() {
        const appRoot = document.getElementById('app');
        if (!appRoot) return;

        const micUnavailable = !isMicAvailable();
        const ttsUnavailable = !runtime.tts.supported;
        if (!micUnavailable && !ttsUnavailable) {
            capabilityBanner?.remove();
            capabilityBanner = null;
            return;
        }

        if (!capabilityBanner) {
            capabilityBanner = document.createElement('div');
            capabilityBanner.id = 'runtime-capability-banner';
            capabilityBanner.style.cssText = [
                'position:fixed',
                'left:50%',
                'bottom:18px',
                'transform:translateX(-50%)',
                'z-index:10000',
                'max-width:min(680px,calc(100vw - 24px))',
                'padding:12px 14px',
                'border-radius:12px',
                'background:rgba(35,30,23,.96)',
                'color:#fff',
                'box-shadow:0 10px 35px rgba(0,0,0,.28)',
                'display:flex',
                'align-items:center',
                'gap:12px',
                'font-size:14px',
            ].join(';');
            appRoot.appendChild(capabilityBanner);
        }

        const reasons = [];
        if (micUnavailable) reasons.push('mikrofon nije dostupan — koristi se ručna procjena izgovora');
        if (ttsUnavailable) reasons.push('glasovno čitanje nije dostupno — fraze se prikazuju kao tekst');
        capabilityBanner.innerHTML = `
            <span style="flex:1"><strong>Prilagođeni način:</strong> ${escapeHtml(reasons.join('; '))}. Lekcije ostaju potpuno prohodne.</span>
            <button type="button" class="runtime-recheck" style="border:0;border-radius:8px;padding:8px 10px;cursor:pointer;font-weight:700">Provjeri opet</button>
            <button type="button" class="runtime-dismiss" aria-label="Zatvori" style="border:0;background:transparent;color:#fff;font-size:20px;cursor:pointer">×</button>`;
        capabilityBanner.querySelector('.runtime-recheck')?.addEventListener('click', async () => {
            await probeMicrophone({ requestPermission: true });
            chooseVoice();
        });
        capabilityBanner.querySelector('.runtime-dismiss')?.addEventListener('click', () => {
            capabilityBanner?.remove();
            capabilityBanner = null;
        });
    }

    function installObservers() {
        const observer = new MutationObserver(() => syncAudioControls());
        observer.observe(document.documentElement, { childList: true, subtree: true });
        window.addEventListener('online', () => safeToast('Veza je vraćena', 'Mrežne mogućnosti ponovno su dostupne.', '🌐'));
        window.addEventListener('offline', () => safeToast('Rad izvan mreže', 'Napredak se i dalje sprema na ovom računalu.', '📴'));
        navigator.mediaDevices?.addEventListener?.('devicechange', () => probeMicrophone());
    }

    patchTts();
    patchStt();
    patchSfx();
    patchPersistence();

    window.TalkTataRuntime = Object.freeze({
        getStatus,
        probeMicrophone,
        requestMicrophone: () => probeMicrophone({ requestPermission: true }),
        stopListening: () => {
            try { activeRecognition?.abort?.(); } catch (_) {}
        },
    });

    window.addEventListener('error', event => {
        reportError('window-error', event.error || new Error(event.message || 'Renderer error'));
    });
    window.addEventListener('unhandledrejection', event => {
        reportError('unhandled-rejection', event.reason || new Error('Unhandled promise rejection'));
    });

    document.addEventListener('DOMContentLoaded', () => {
        installObservers();
        syncAudioControls();
        renderCapabilityBanner();
        probeMicrophone().catch(error => reportError('microphone-probe', error));
    });
})();
