/**
 * TALKTATA — Main Application
 * =====================================
 * Interaktivni tečaj engleskog za početnike.
 * Vanilla JS, bez frameworka, bez vanjskih ovisnosti.
 *
 * Organizacija:
 * 1.  STATE       — Globalni state aplikacije
 * 2.  STORAGE     — localStorage wrapper
 * 3.  TTS         — Text-to-Speech (Web Speech API, ugrađen u browser)
 * 4.  STT         — Speech Recognition (Web Speech API, opcionalno)
 * 5.  BOOT        — Boot sekvenca ("knjiga oživljava")
 * 6.  ROUTER      — Prebacivanje između pogleda (views)
 * 7.  SIDEBAR     — Sidebar navigacija
 * 8.  DASHBOARD   — Početni ekran
 * 9.  LESSONS     — Prikaz lekcije (fraze)
 * 10. EXERCISES   — Vježbe (4 tipa)
 * 11. RESULTS     — Ekran rezultata
 * 12. REVIEW      — Ponavljanje (SRS — Spaced Repetition)
 * 13. ACHIEVEMENTS_VIEW — Prikaz postignuća
 * 14. GAMIFICATION — XP, razine, achievements, streaks
 * 15. TOAST       — Obavijesti (toast notifications)
 * 16. MODAL       — Achievement popup
 * 17. CONFETTI    — Čestice za slavlje
 * 18. INIT        — Inicijalizacija svega
 */


// =============================================================================
// 1. STATE
// =============================================================================

const state = {
    currentView: 'dashboard',
    currentLessonId: null,
    currentPhraseIdx: 0,
    currentExerciseSetIdx: 0,
    currentQuestionIdx: 0,
    exerciseFlatIdx: 0,
    exerciseCorrect: 0,
    exerciseTotal: 0,
    matchSelected: null,    // { side: 'en'|'hr', index }
    micUseCount: 0,
    isPracticeMode: false,  // true when re-doing a completed lesson (no coins)

    // Persisted (loaded from localStorage)
    xp: 0,
    level: 1,
    streak: 0,
    lastPracticeDate: null,
    completedLessons: [],   // lesson IDs that are fully done
    phrasesHeard: [],       // phrase IDs the user has listened to
    phrasesLearned: [],     // phrase IDs the user got correct in exercises
    unlockedAchievements: [],
    // SRS boxes: { phraseId: { box: 1-5, nextReview: timestamp } }
    srsData: {},
    lessonProgress: {},     // { lessonId: { exercisesDone: n, exercisesCorrect: n, bestScore: n, completed: bool } }
    coins: 0,               // Currency for marketplace
    purchasedItems: [],     // IDs of purchased marketplace items
    dailyXpEarned: 0,       // XP earned today
    dailyXpGoal: 50,        // Daily XP goal
    micDisabled: false,     // User explicitly disabled mic
    memoryMatchDone: 0,     // Count of completed memory-match exercises
    totalCorrectAnswers: 0, // Lifetime correct answers
};

const STATE_DEFAULTS = JSON.parse(JSON.stringify(state));

function resetState() {
    Object.keys(STATE_DEFAULTS).forEach(k => {
        state[k] = typeof STATE_DEFAULTS[k] === 'object' ? JSON.parse(JSON.stringify(STATE_DEFAULTS[k])) : STATE_DEFAULTS[k];
    });
}


// =============================================================================
// 1b. PROFILE MANAGER — 3 independent save slots
// =============================================================================

const ProfileManager = (() => {
    const META_KEY = 'talktata_profiles';
    const MAX_PROFILES = 3;

    function getMeta() {
        try {
            const raw = localStorage.getItem(META_KEY);
            return raw ? JSON.parse(raw) : { profiles: [], activeId: null };
        } catch { return { profiles: [], activeId: null }; }
    }

    function saveMeta(meta) {
        localStorage.setItem(META_KEY, JSON.stringify(meta));
    }

    function getActiveProfileKey() {
        const meta = getMeta();
        if (!meta.activeId) return null;
        return `talktata_save_${meta.activeId}`;
    }

    function getProfiles() {
        return getMeta().profiles; // [{ id, name, avatar, created }]
    }

    function getActiveId() {
        return getMeta().activeId;
    }

    function create(name, avatar) {
        const meta = getMeta();
        if (meta.profiles.length >= MAX_PROFILES) return null;
        const id = Date.now().toString(36);
        const profile = { id, name: name.slice(0, 20), avatar, created: Date.now() };
        meta.profiles.push(profile);
        meta.activeId = id;
        saveMeta(meta);
        return profile;
    }

    function select(id) {
        const meta = getMeta();
        const found = meta.profiles.find(p => p.id === id);
        if (!found) return false;
        meta.activeId = id;
        saveMeta(meta);
        return true;
    }

    function remove(id) {
        const meta = getMeta();
        meta.profiles = meta.profiles.filter(p => p.id !== id);
        localStorage.removeItem(`talktata_save_${id}`);
        if (meta.activeId === id) meta.activeId = meta.profiles[0]?.id || null;
        saveMeta(meta);
    }

    // Migrate old single-profile data
    function migrateOldData() {
        const meta = getMeta();
        if (meta.profiles.length > 0) return; // Already has profiles
        const oldData = localStorage.getItem('engleski_za_tatu_v1');
        if (oldData) {
            const profile = create('Tata', '👨');
            if (profile) {
                localStorage.setItem(`talktata_save_${profile.id}`, oldData);
                localStorage.removeItem('engleski_za_tatu_v1');
            }
        }
    }

    return { getMeta, getActiveProfileKey, getProfiles, getActiveId, create, select, remove, migrateOldData, MAX_PROFILES };
})();


// =============================================================================
// 2. STORAGE — localStorage persistence (profile-aware)
// =============================================================================

const Storage = (() => {
    function getKey() {
        return ProfileManager.getActiveProfileKey() || 'talktata_save_default';
    }

    function save() {
        const data = {
            xp: state.xp,
            level: state.level,
            streak: state.streak,
            lastPracticeDate: state.lastPracticeDate,
            completedLessons: state.completedLessons,
            phrasesHeard: state.phrasesHeard,
            phrasesLearned: state.phrasesLearned,
            unlockedAchievements: state.unlockedAchievements,
            srsData: state.srsData,
            micUseCount: state.micUseCount,
            currentLessonId: state.currentLessonId,
            currentPhraseIdx: state.currentPhraseIdx,
            currentView: state.currentView,
            exerciseFlatIdx: state.exerciseFlatIdx,
            exerciseCorrect: state.exerciseCorrect,
            exerciseTotal: state.exerciseTotal,
            coins: state.coins,
            purchasedItems: state.purchasedItems,
            lessonProgress: state.lessonProgress,
            dailyXpEarned: state.dailyXpEarned,
            dailyXpGoal: state.dailyXpGoal,
            micDisabled: state.micDisabled,
            memoryMatchDone: state.memoryMatchDone,
            totalCorrectAnswers: state.totalCorrectAnswers,
        };
        try {
            localStorage.setItem(getKey(), JSON.stringify(data));
        } catch (e) { /* quota exceeded */ }
    }

    function load() {
        try {
            const raw = localStorage.getItem(getKey());
            if (!raw) return;
            const data = JSON.parse(raw);
            Object.keys(data).forEach(k => {
                if (k in state) state[k] = data[k];
            });
        } catch (e) { /* corrupted */ }
    }

    function reset() {
        localStorage.removeItem(getKey());
        location.reload();
    }

    return { save, load, reset };
})();


// =============================================================================
// 3. TTS — Text-to-Speech (browser built-in, zero dependencies)
// =============================================================================

const TTS = (() => {
    let voice = null;
    let ready = false;

    function init() {
        if (!('speechSynthesis' in window)) return;
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    function loadVoices() {
        const voices = speechSynthesis.getVoices();
        // Prefer American English
        voice = voices.find(v => v.lang === 'en-US' && v.localService)
             || voices.find(v => v.lang === 'en-US')
             || voices.find(v => v.lang.startsWith('en-'))
             || voices[0];
        ready = !!voice;
    }

    function speak(text, rate = 0.9, onEnd) {
        if (!ready) return null;
        const speedMul = (typeof Settings !== 'undefined' && Settings.getTtsSpeed) ? Settings.getTtsSpeed() : 1.0;
        speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.voice = voice;
        utt.rate = rate * speedMul;
        utt.pitch = 1.0;
        utt.volume = 1.0;
        utt.lang = 'en-US';
        if (onEnd) utt.onend = onEnd;
        speechSynthesis.speak(utt);
        return utt;
    }

    function speakSlow(text, onEnd) {
        return speak(text, 0.6, onEnd);
    }

    function stop() {
        if ('speechSynthesis' in window) speechSynthesis.cancel();
    }

    return { init, speak, speakSlow, stop, isReady: () => ready };
})();


// =============================================================================
// 4. STT — Speech Recognition (optional, Chrome/Edge)
// =============================================================================

const STT = (() => {
    let recognition = null;
    let available = false;

    function init() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;
        recognition = new SR();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 5;
        available = true;
    }

    // Levenshtein distance for fuzzy matching
    function levenshtein(a, b) {
        const m = a.length, n = b.length;
        const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) d[i][0] = i;
        for (let j = 0; j <= n; j++) d[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                d[i][j] = a[i-1] === b[j-1]
                    ? d[i-1][j-1]
                    : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
            }
        }
        return d[m][n];
    }

    function normalize(text) {
        return text.toLowerCase()
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

    function similarity(a, b) {
        const na = normalize(a), nb = normalize(b);
        if (na === nb) return 1;
        const maxLen = Math.max(na.length, nb.length);
        if (maxLen === 0) return 1;
        return 1 - levenshtein(na, nb) / maxLen;
    }

    function listen(targetText, callback) {
        if (!available || !recognition) {
            callback({ success: false, heard: '', score: 0, error: 'not-available' });
            return;
        }
        recognition.onresult = (event) => {
            const results = event.results[0];
            let bestHeard = '';
            let bestScore = 0;

            for (let i = 0; i < results.length; i++) {
                const heard = results[i].transcript;
                const score = similarity(heard, targetText);
                if (score > bestScore) {
                    bestScore = score;
                    bestHeard = heard;
                }
            }

            // Threshold: 0.70 = pass (allows contractions, minor word swaps, accent artifacts)
            // 0.85+ = excellent
            const success = bestScore >= 0.70;
            callback({ success, heard: bestHeard, score: bestScore, error: null });
        };
        recognition.onerror = (e) => {
            callback({ success: false, heard: '', score: 0, error: e.error });
        };
        recognition.onend = () => {};
        recognition.start();
    }

    // Exposed for Sentence Dictation exercise
    function listenFreeform(callback) {
        if (!available || !recognition) {
            callback({ heard: '', error: 'not-available' });
            return;
        }
        recognition.onresult = (event) => {
            const heard = event.results[0][0].transcript;
            callback({ heard, error: null });
        };
        recognition.onerror = (e) => {
            callback({ heard: '', error: e.error });
        };
        recognition.onend = () => {};
        recognition.start();
    }

    return { init, listen, listenFreeform, stop, isAvailable: () => available, similarity, normalize };
})();


// =============================================================================
// 5. BOOT — "Book Coming to Life" sequence
// =============================================================================

const Boot = (() => {
    const LINES = [
        { text: 'TalkTata v1.0 — KarloLegend', cls: 'ok', delay: 500 },
        { text: 'Pripremam vaše putovanje...', cls: 'loading', delay: 500 },
        { text: 'Učitavam rječnik... 2,847 fraza ✓', cls: 'ok', delay: 350 },
        { text: 'Postavljam američki izgovor... en-US ✓', cls: 'ok', delay: 250 },
        { text: 'Provjeravam napredak... ', cls: 'loading', delay: 250 },
        { text: 'Sve je spremno! ✓', cls: 'ok', delay: 200 },
    ];

    let particles = [];
    let animFrame = null;

    function initParticles() {
        const canvas = document.getElementById('boot-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                a: Math.random() * 0.3 + 0.05,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,168,76,${p.a})`;
                ctx.fill();
            }
            animFrame = requestAnimationFrame(draw);
        }
        draw();
    }

    function stopParticles() {
        if (animFrame) cancelAnimationFrame(animFrame);
        particles = [];
    }

    function letterByLetter(el, text, baseDelay) {
        return new Promise(resolve => {
            const chars = text.split('');
            chars.forEach((ch, i) => {
                const span = document.createElement('span');
                span.className = 'letter' + (i >= 4 ? ' gold' : ''); // "Talk" white, "Tata" gold
                span.textContent = ch;
                span.style.animationDelay = `${baseDelay + i * 80}ms`;
                el.appendChild(span);
                setTimeout(() => span.classList.add('lit'), baseDelay + i * 80);
            });
            setTimeout(resolve, baseDelay + chars.length * 80 + 200);
        });
    }

    const AVATARS = ['👨', '👩', '👦', '👧', '🧔', '👴', '👵', '🧑'];

    function renderProfileSlots() {
        const container = document.getElementById('profile-slots');
        if (!container) return;
        const profiles = ProfileManager.getProfiles();
        const activeId = ProfileManager.getActiveId();

        container.innerHTML = '';

        // Render existing profiles
        profiles.forEach(p => {
            const slot = document.createElement('div');
            slot.className = 'profile-slot' + (p.id === activeId ? ' active' : '');

            // Read XP for display
            let xp = 0;
            try {
                const raw = localStorage.getItem(`talktata_save_${p.id}`);
                if (raw) xp = JSON.parse(raw).xp || 0;
            } catch {}

            slot.innerHTML = `
                <span class="profile-avatar">${p.avatar}</span>
                <span class="profile-name">${escapeHTML(p.name)}</span>
                <span class="profile-xp">${xp} XP</span>
                <button class="profile-delete" title="Obriši profil">✕</button>
            `;

            slot.addEventListener('click', (e) => {
                if (e.target.closest('.profile-delete')) return;
                ProfileManager.select(p.id);
                renderProfileSlots();
            });

            slot.querySelector('.profile-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Obrisati profil "${p.name}"? Sav napredak će biti izgubljen.`)) {
                    ProfileManager.remove(p.id);
                    renderProfileSlots();
                }
            });

            container.appendChild(slot);
        });

        // Empty slots
        const remaining = ProfileManager.MAX_PROFILES - profiles.length;
        for (let i = 0; i < remaining; i++) {
            const slot = document.createElement('div');
            slot.className = 'profile-slot empty';
            slot.innerHTML = `
                <span class="profile-add-icon">+</span>
                <span class="profile-name" style="color: var(--gold); opacity: 0.7;">Novi profil</span>
            `;
            slot.addEventListener('click', () => showCreateProfile());
            container.appendChild(slot);
        }
    }

    function showCreateProfile() {
        // Remove any existing modal
        document.querySelector('.profile-create-modal')?.remove();

        const modal = document.createElement('div');
        modal.className = 'profile-create-modal';
        modal.innerHTML = `
            <h3>Novi profil</h3>
            <input type="text" id="profile-name-input" placeholder="Ime (npr. Tata)" maxlength="20" autocomplete="off">
            <div class="avatar-picker" id="avatar-picker">
                ${AVATARS.map((a, i) => `<div class="avatar-option${i === 0 ? ' selected' : ''}" data-avatar="${a}">${a}</div>`).join('')}
            </div>
            <div class="profile-create-btns">
                <button class="btn-profile-cancel">Odustani</button>
                <button class="btn-profile-create">Stvori</button>
            </div>
        `;

        const bootMain = document.getElementById('boot-main');
        bootMain.appendChild(modal);

        let selectedAvatar = AVATARS[0];

        modal.querySelectorAll('.avatar-option').forEach(opt => {
            opt.addEventListener('click', () => {
                modal.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedAvatar = opt.dataset.avatar;
            });
        });

        modal.querySelector('.btn-profile-cancel').addEventListener('click', () => modal.remove());

        modal.querySelector('.btn-profile-create').addEventListener('click', () => {
            const nameInput = document.getElementById('profile-name-input');
            const name = (nameInput.value || '').trim() || 'Profil';
            ProfileManager.create(name, selectedAvatar);
            modal.remove();
            renderProfileSlots();
        });

        // Focus name input
        setTimeout(() => document.getElementById('profile-name-input')?.focus(), 100);
    }

    async function run() {
        const bootScreen = document.getElementById('boot-screen');
        const terminal = document.getElementById('boot-terminal');
        const mainEl = document.getElementById('boot-main');
        const startEl = document.getElementById('boot-start');
        const titleEl = document.getElementById('boot-title');
        if (!bootScreen) { postBoot(); return; }

        initParticles();

        // Update progress check line dynamically
        const sessions = state.completedLessons.length;
        LINES[4].text = sessions > 0
            ? `Provjeravam napredak... ${sessions} lekcija završeno ✓`
            : 'Provjeravam napredak... nova sesija ✓';

        // Phase 1: terminal lines (low opacity)
        terminal.classList.add('active');

        for (const line of LINES) {
            await sleep(line.delay);
            const div = document.createElement('div');
            div.innerHTML = `<span class="${line.cls}">${escapeHTML(line.text)}</span>`;
            terminal.appendChild(div);
        }

        await sleep(400);

        // Phase 2: fade terminal, show logo + letter-by-letter title
        terminal.style.transition = 'opacity 0.6s';
        terminal.style.opacity = '0.15';

        mainEl.classList.remove('hidden');
        await letterByLetter(titleEl, 'TalkTata', 300);

        // Render profile selector
        renderProfileSlots();

        await sleep(300);

        // If no profile exists, auto-open the create dialog
        if (ProfileManager.getProfiles().length === 0) {
            showCreateProfile();
        }

        startEl.classList.add('visible');

        // Click / key to proceed
        const dismiss = () => {
            if (bootScreen.classList.contains('dismissed')) return;
            // Require a profile to be selected
            if (!ProfileManager.getActiveId()) {
                showCreateProfile();
                return;
            }
            state._bootDismissedByClick = true;
            bootScreen.classList.add('dismissed');
            stopParticles();
            // Load the selected profile's data
            resetState();
            Storage.load();
            setTimeout(postBoot, 800);
        };
        startEl.addEventListener('click', dismiss);
        document.addEventListener('keydown', (e) => {
            if (startEl.classList.contains('visible') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                dismiss();
            }
        }, { once: true });
    }

    function postBoot() {
        const app = document.getElementById('app');
        const boot = document.getElementById('boot-screen');
        if (boot) boot.style.display = 'none';
        if (app) app.classList.remove('hidden');

        // Unlock lessons for the loaded profile
        CURRICULUM.lessons.forEach(l => {
            l.locked = !isLessonUnlocked(l.id);
        });

        Dashboard.render();
        Sidebar.render();
        Gamification.updateUI();
        Gamification.checkStreak();

        // Check mic availability
        if (!state.micDisabled && typeof STT !== 'undefined' && STT.isAvailable()) {
            // Mic is available, all good
        } else if (state.micDisabled) {
            document.querySelectorAll('.btn-record').forEach(b => b.style.display = 'none');
        }

        // Start tutorial for first-time users (only after explicit boot dismissal)
        if (state._bootDismissedByClick) {
            setTimeout(() => Tutorial.show(), 1200);
        }
        state._bootDismissedByClick = false;
    }

    return { run };
})();


// =============================================================================
// 6. ROUTER — View switching
// =============================================================================

const Router = (() => {
    const views = ['dashboard', 'lesson', 'exercise', 'results', 'review', 'achievements', 'watching-guide', 'help', 'activity-log', 'settings', 'about', 'resources', 'marketplace'];

    function go(viewName) {
        state.currentView = viewName;
        // Clear mid-lesson state when leaving lesson/exercise views
        if (viewName === 'dashboard') {
            state.currentLessonId = null;
            state.currentPhraseIdx = 0;
            state.exerciseFlatIdx = 0;
            state.exerciseCorrect = 0;
            state.exerciseTotal = 0;
            Storage.save();
        }
        views.forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) el.classList.toggle('hidden', v !== viewName);
        });
        // Scroll main to top
        const main = document.getElementById('main-content');
        if (main) main.scrollTop = 0;
        // Update sidebar active
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });
        // Update breadcrumbs
        Breadcrumbs.update(viewName);
        // Log navigation
        ActivityLog.log('nav', viewName);
    }

    return { go };
})();


// =============================================================================
// 7. SIDEBAR
// =============================================================================

const Sidebar = (() => {
    function render() {
        // Sidebar lesson list removed — lessons are on Početna
        // This function now only updates the XP bar in the sidebar footer
        Gamification.updateUI();
    }

    function toggleSidebar(forceOpen) {
        const sb = document.getElementById('sidebar');
        if (forceOpen === undefined) sb.classList.toggle('open');
        else sb.classList.toggle('open', forceOpen);
    }

    function init() {
        const toggle = document.getElementById('sidebar-toggle');
        if (toggle) toggle.addEventListener('click', () => toggleSidebar());

        // Close sidebar when clicking outside on mobile
        document.getElementById('main-content')?.addEventListener('click', () => {
            if (window.innerWidth < 900) toggleSidebar(false);
        });
    }

    return { render, toggleSidebar, init };
})();


// =============================================================================
// 8. DASHBOARD
// =============================================================================

const Dashboard = (() => {
    function render() {
        Router.go('dashboard');
        renderLessonCards();
        renderMyModules();
        renderWelcome();
        renderTip();
        renderDailyGoal();
    }

    function renderLessonCards() {
        const grid = document.getElementById('dashboard-lessons');
        if (!grid) return;
        grid.innerHTML = '';

        CURRICULUM.lessons.forEach((lesson, idx) => {
            const isCompleted = state.completedLessons.includes(lesson.id);
            const isLocked = lesson.locked && !isLessonUnlocked(lesson.id);

            // Count progress based on exercise completion, not just viewing phrases
            const lp = state.lessonProgress[lesson.id];
            const totalExercises = lesson.exercises ? lesson.exercises.reduce((sum, ex) => {
                if (ex.type === 'match-pairs' || ex.type === 'memory-match') return sum + 1;
                return sum + (ex.questions ? ex.questions.length : 0);
            }, 0) : 0;
            const exercisesDone = lp && lp.completed ? totalExercises : (lp ? (lp.exercisesDone || 0) : 0);
            const progress = totalExercises > 0 ? Math.round((exercisesDone / totalExercises) * 100) : 0;
            const inProgress = progress > 0 && !isCompleted;

            const card = document.createElement('div');
            card.className = 'lesson-card' + (isCompleted ? ' completed' : '') + (isLocked ? ' locked' : '') + (inProgress ? ' in-progress' : '');
            card.innerHTML = `
                <div class="lesson-card-icon">${lesson.icon}</div>
                <div class="lesson-card-title">${lesson.title}</div>
                <div class="lesson-card-desc">${lesson.subtitle}</div>
                <div class="lesson-card-num">Lekcija ${idx + 1}</div>
                ${isCompleted ? '<span class="lesson-card-badge completed-badge">✓ Završeno</span>' :
                  inProgress ? `<span class="lesson-card-badge progress-badge">${progress}% odrađeno</span>` :
                  isLocked ? '<span class="lesson-card-badge locked-badge">🔒</span>' :
                  `<span class="lesson-card-badge ready-badge">Lekcija ${idx + 1}</span>`}
                ${(inProgress || isCompleted) ? `<div class="lesson-card-progress"><div class="lesson-card-progress-fill" style="width:${isCompleted ? 100 : progress}%"></div></div>` : ''}
            `;
            if (!isLocked) {
                card.addEventListener('click', () => {
                    // If mid-exercise, offer to resume
                    if (state.currentLessonId === lesson.id && state.currentView === 'exercise' && state.exerciseFlatIdx > 0) {
                        if (confirm('Imate nedovršene vježbe za ovu lekciju. Nastaviti gdje ste stali?')) {
                            Exercises.resume(lesson.id, state.exerciseFlatIdx, state.exerciseCorrect);
                            return;
                        }
                    }
                    Lessons.start(lesson.id);
                });
            }
            grid.appendChild(card);
        });
    }

    function renderWelcome() {
        const el = document.getElementById('welcome-text');
        if (!el) return;
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) greeting = 'Dobro jutro! ☀️';
        else if (hour < 18) greeting = 'Dobar dan! 🌤️';
        else greeting = 'Dobra večer! 🌙';

        const totalPhrases = CURRICULUM.lessons.reduce((sum, l) => sum + (l.phrases ? l.phrases.length : 0), 0);

        if (state.completedLessons.length === 0) {
            el.textContent = `${greeting} Spremni za svoju prvu lekciju? Imate ${CURRICULUM.lessons.length} lekcija i ${totalPhrases}+ fraza za naučiti!`;
        } else if (state.completedLessons.length < 5) {
            el.textContent = `${greeting} Završili ste ${state.completedLessons.length} od ${CURRICULUM.lessons.length} lekcija. Naučili ste ${state.phrasesLearned.length} fraza. Samo naprijed!`;
        } else {
            el.textContent = `${greeting} Impresivno! ${state.completedLessons.length} lekcija, ${state.phrasesLearned.length} fraza, razina ${state.level}. Vi ste pravi učenik!`;
        }
    }

    function renderTip() {
        const el = document.getElementById('tip-text');
        if (!el) return;
        const tips = CURRICULUM.tips;
        el.textContent = tips[Math.floor(Math.random() * tips.length)];
    }

    function renderDailyGoal() {
        const fill = document.getElementById('daily-progress-fill');
        if (!fill) return;
        const pct = Math.min(100, ((state.dailyXpEarned || 0) / (state.dailyXpGoal || 50)) * 100);
        fill.style.width = pct + '%';
    }

    function renderMyModules() {
        const section = document.getElementById('my-modules-section');
        if (!section) return;
        const purchased = state.purchasedItems || [];
        if (purchased.length === 0) {
            section.classList.add('hidden');
            return;
        }
        section.classList.remove('hidden');
        const grid = section.querySelector('.my-modules-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const scores = JSON.parse(localStorage.getItem('engleski_drill_scores') || '{}');
        purchased.forEach(itemId => {
            // Find the item in Marketplace — use a global getter
            const score = scores[itemId];
            const card = document.createElement('div');
            card.className = 'my-module-card' + (score === 100 ? ' mastered' : '');
            card.innerHTML = `
                <div class="my-module-icon">${getModuleIcon(itemId)}</div>
                <div class="my-module-name">${getModuleName(itemId)}</div>
                ${score !== undefined && score !== null ? `<div class="my-module-score">${score}%</div>` : '<div class="my-module-score new-module">Započni!</div>'}
                ${score === 100 ? '<div class="my-module-badge">🏆</div>' : ''}
            `;
            card.addEventListener('click', () => {
                // Navigate to marketplace and start drill
                Router.go('marketplace');
                Marketplace.render();
                // Short delay then auto-start the drill
                setTimeout(() => {
                    const btn = document.querySelector(`.marketplace-start-drill[data-item-id="${itemId}"]`);
                    if (btn) btn.click();
                }, 100);
            });
            grid.appendChild(card);
        });
    }

    // Helper to get module info from item ID
    function getModuleIcon(id) {
        const map = { M1:'🧠', M2:'🔄', M3:'🎯', M4:'💡', M5:'🗣️', M6:'🧩', M7:'🌍', M8:'📊', M9:'🔊', M10:'✈️', M11:'🧠', M12:'🎮' };
        return map[id] || '📦';
    }
    function getModuleName(id) {
        const map = { M1:'Chunking', M2:'Etimologija', M3:'Speed Recall', M4:'Vizualna', M5:'Izgovor', M6:'Word Families', M7:'Slang', M8:'80/20', M9:'Minimal Pairs', M10:'Survival', M11:'Morfologija', M12:'Idiomi' };
        return map[id] || 'Modul';
    }

    return { render };
})();


// =============================================================================
// 9. LESSONS — Phrase display and navigation
// =============================================================================

const Lessons = (() => {
    function start(lessonId, resumeIdx) {
        const lesson = CURRICULUM.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        state.currentLessonId = lessonId;
        state.currentPhraseIdx = resumeIdx || 0;
        Storage.save();
        ActivityLog.log('lesson', 'Started: ' + lesson.title);

        Router.go('lesson');

        // Context
        const ctxEl = document.getElementById('lesson-context');
        if (ctxEl) ctxEl.textContent = lesson.context;

        renderPhrase();
    }

    function renderPhrase() {
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        if (!lesson) return;

        const phrase = lesson.phrases[state.currentPhraseIdx];
        const total = lesson.phrases.length;
        const idx = state.currentPhraseIdx;

        // Progress
        const fill = document.getElementById('lesson-progress-fill');
        const counter = document.getElementById('lesson-counter');
        if (fill) fill.style.width = ((idx + 1) / total * 100) + '%';
        if (counter) counter.textContent = `${idx + 1} / ${total}`;

        // Phrase card
        setText('phrase-en', phrase.en);
        setText('phrase-hr', phrase.hr);
        setText('phrase-phonetic', phrase.phonetic);
        setText('phrase-tip', phrase.phoneticHr + (phrase.tip ? '\n\n💡 ' + phrase.tip : ''));

        // Hide feedback
        const fb = document.getElementById('phrase-feedback');
        if (fb) { fb.classList.add('hidden'); fb.className = 'phrase-feedback hidden'; }

        // Track that phrase was heard
        if (!state.phrasesHeard.includes(phrase.id)) {
            state.phrasesHeard.push(phrase.id);
            Storage.save();
            Gamification.checkAchievements();
        }

        // Nav buttons
        const prevBtn = document.getElementById('btn-prev-phrase');
        const nextBtn = document.getElementById('btn-next-phrase');
        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) {
            if (idx === total - 1) {
                nextBtn.textContent = 'Započni vježbe →';
            } else {
                nextBtn.textContent = 'Sljedeća →';
            }
        }
    }

    function nextPhrase() {
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        if (!lesson) return;

        if (state.currentPhraseIdx < lesson.phrases.length - 1) {
            state.currentPhraseIdx++;
            Storage.save();
            renderPhrase();
        } else {
            // All phrases seen → start exercises
            Exercises.start(state.currentLessonId);
        }
    }

    function prevPhrase() {
        if (state.currentPhraseIdx > 0) {
            state.currentPhraseIdx--;
            Storage.save();
            renderPhrase();
        }
    }

    function playCurrentPhrase() {
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        if (!lesson) return;
        const phrase = lesson.phrases[state.currentPhraseIdx];
        TTS.speak(phrase.en);
    }

    function playCurrentPhraseSlow() {
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        if (!lesson) return;
        const phrase = lesson.phrases[state.currentPhraseIdx];
        TTS.speakSlow(phrase.en);
    }

    function recordCurrentPhrase() {
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        if (!lesson) return;
        const phrase = lesson.phrases[state.currentPhraseIdx];
        const fb = document.getElementById('phrase-feedback');
        const btn = document.getElementById('btn-record');

        if (!STT.isAvailable()) {
            // Fallback: self-assessment
            if (fb) {
                fb.classList.remove('hidden');
                fb.className = 'phrase-feedback retry';
                fb.innerHTML = `
                    <p>Vaš preglednik ne podržava snimanje glasa.</p>
                    <p><strong>Izgovorite naglas:</strong> "${phrase.en}"</p>
                    <p>Koristite fonetski vodič: <strong>${phrase.phonetic}</strong></p>
                    <div style="margin-top:12px; display:flex; gap:8px; justify-content:center;">
                        <button class="btn btn-success" onclick="Lessons._selfAssess(true)">👍 Zvučalo je dobro</button>
                        <button class="btn btn-secondary" onclick="Lessons._selfAssess(false)">🔄 Pokušat ću ponovo</button>
                    </div>
                `;
            }
            state.micUseCount++;
            Storage.save();
            Gamification.checkAchievements();
            return;
        }

        // Real STT
        if (btn) { btn.classList.add('recording'); btn.textContent = '🎤 Slušam...'; }

        STT.listen(phrase.en, (result) => {
            if (btn) { btn.classList.remove('recording'); btn.textContent = '🎤 Pokušaj izgovoriti'; }
            state.micUseCount++;

            const pct = Math.round((result.score || 0) * 100);
            if (result.success) {
                if (fb) {
                    fb.classList.remove('hidden');
                    fb.className = 'phrase-feedback good';
                    const rating = pct >= 90 ? 'Savršeno! 🌟' : pct >= 80 ? 'Odlično! ✅' : 'Dobro! 👍';
                    fb.innerHTML = `${rating} (${pct}% podudaranje)<br>Prepoznao sam: "<strong>${escapeHTML(result.heard)}</strong>"`;
                }
                Gamification.addXP(pct >= 90 ? 8 : 5);
                Toast.show('xp', '⭐', `+${pct >= 90 ? 8 : 5} XP`, 'Dobar izgovor!');
                SFX.play('correct');
            } else {
                if (fb) {
                    fb.classList.remove('hidden');
                    fb.className = 'phrase-feedback retry';
                    const heardText = result.heard ? ` Čuo sam: "<strong>${escapeHTML(result.heard)}</strong>" (${pct}%)` : '';
                    fb.innerHTML = `🔄 Pokušajte ponovo.${heardText}<br>Cilj: "<strong>${phrase.en}</strong>" (${phrase.phonetic})<br><span style="color:var(--text-dim);font-size:var(--fs-sm);">Trebate 70%+ podudaranja. Govorite jasno i glasno.</span>`;
                }
                SFX.play('wrong');
            }
            Storage.save();
            Gamification.checkAchievements();
        });
    }

    function _selfAssess(good) {
        const fb = document.getElementById('phrase-feedback');
        if (good) {
            if (fb) {
                fb.className = 'phrase-feedback good';
                fb.innerHTML = '✅ Svaka čast! Nastavite vježbati.';
            }
            Gamification.addXP(3);
            Toast.show('xp', '⭐', '+3 XP', 'Vježba čini majstora!');
        } else {
            if (fb) {
                fb.className = 'phrase-feedback retry';
                fb.innerHTML = '🔄 Nema problema! Slušajte ponovo i pokušajte. Polako, nema žurbe.';
            }
        }
    }

    return { start, renderPhrase, nextPhrase, prevPhrase, playCurrentPhrase, playCurrentPhraseSlow, recordCurrentPhrase, _selfAssess };
})();


// =============================================================================
// 10. EXERCISES — 4 types of exercises
// =============================================================================

const Exercises = (() => {
    let allQuestions = []; // flattened list of { setIdx, qIdx, type, data }
    let currentFlatIdx = 0;

    function start(lessonId) {
        const lesson = CURRICULUM.lessons.find(l => l.id === lessonId);
        if (!lesson || !lesson.exercises || lesson.exercises.length === 0) {
            Results.show(lessonId, 0, 0);
            return;
        }

        // If lesson was already completed, this is practice mode (no coins)
        state.isPracticeMode = state.completedLessons.includes(lessonId);

        state.currentLessonId = lessonId;
        state.exerciseCorrect = 0;
        state.exerciseTotal = 0;
        state.exerciseFlatIdx = 0;
        currentFlatIdx = 0;
        AdaptiveEngine.reset();

        // Flatten all exercise sets into a sequence of individual questions
        allQuestions = [];
        lesson.exercises.forEach((exSet, sIdx) => {
            if (exSet.type === 'match-pairs' || exSet.type === 'memory-match') {
                // Match pairs and memory match are one "question"
                allQuestions.push({ setIdx: sIdx, qIdx: 0, type: exSet.type, data: exSet });
            } else if (exSet.questions) {
                exSet.questions.forEach((q, qIdx) => {
                    allQuestions.push({ setIdx: sIdx, qIdx, type: exSet.type, data: { ...exSet, question: q } });
                });
            }
        });

        state.exerciseTotal = allQuestions.length;
        Storage.save();
        Router.go('exercise');
        renderQuestion();
    }

    function renderQuestion() {
        if (currentFlatIdx >= allQuestions.length) {
            // Done!
            Results.show(state.currentLessonId, state.exerciseCorrect, state.exerciseTotal);
            return;
        }

        const q = allQuestions[currentFlatIdx];
        const total = allQuestions.length;

        // Progress
        const fill = document.getElementById('exercise-progress-fill');
        const counter = document.getElementById('exercise-counter');
        if (fill) fill.style.width = ((currentFlatIdx + 1) / total * 100) + '%';
        if (counter) counter.textContent = `${currentFlatIdx + 1} / ${total}`;

        // Instruction
        setText('exercise-instruction', q.data.instruction || '');

        // Hide feedback & next button
        const fb = document.getElementById('exercise-feedback');
        const nextBtn = document.getElementById('btn-next-exercise');
        if (fb) { fb.classList.add('hidden'); fb.className = 'exercise-feedback hidden'; }
        if (nextBtn) nextBtn.classList.add('hidden');

        const body = document.getElementById('exercise-body');
        if (!body) return;
        body.innerHTML = '';

        switch (q.type) {
            case 'listen-choose': renderListenChoose(body, q); break;
            case 'match-pairs':   renderMatchPairs(body, q);   break;
            case 'situation':     renderSituation(body, q);    break;
            case 'spell':         renderSpell(body, q);        break;
            case 'fill-blank':    renderFillBlank(body, q);    break;
            case 'error-fix':     renderErrorFix(body, q);     break;
            case 'reorder':       renderReorder(body, q);      break;
            case 'true-false':    renderTrueFalse(body, q);    break;
            case 'pronunciation-trap': renderPronunciationTrap(body, q); break;
            case 'image-choose':  renderImageChoose(body, q);  break;
            case 'video-comprehension': renderVideoComprehension(body, q); break;
            case 'dialogue':          renderDialogue(body, q);          break;
            case 'dictation':         renderDictation(body, q);         break;
            case 'context-guess':     renderContextGuess(body, q);      break;
            case 'minimal-pairs':     renderMinimalPairs(body, q);      break;
            case 'story-sequence':    renderStorySequence(body, q);     break;
            case 'role-play':         renderRolePlay(body, q);          break;
            case 'error-detect':      renderErrorDetect(body, q);       break;
            case 'shadowing':         renderShadowing(body, q);         break;
            case 'memory-match':      renderMemoryMatch(body, q);       break;
        }

        // Smart skip banner for mastered exercise types
        if (AdaptiveEngine.shouldOfferSkip(q.type)) {
            const skipBanner = document.createElement('div');
            skipBanner.className = 'skip-banner';
            skipBanner.innerHTML = '<span>🌟 Ovu vrstu zadatka savladavate!</span> <button class="btn btn-small skip-banner-btn">Preskoči →</button>';
            body.parentElement.insertBefore(skipBanner, body);
            skipBanner.querySelector('.skip-banner-btn').addEventListener('click', () => {
                skipBanner.remove();
                // Skip counts as done but NOT correct — you must earn it
                nextQuestion();
            });
        }
    }

    // ─── Listen & Choose ───
    function renderListenChoose(body, q) {
        const question = q.data.question;
        const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
        const phrase = lesson?.phrases.find(p => p.id === question.phraseId);
        if (!phrase) return;

        // Play button
        const playBtn = document.createElement('button');
        playBtn.className = 'exercise-play-btn';
        playBtn.innerHTML = '🔊 Slušaj frazu';
        playBtn.addEventListener('click', () => TTS.speak(phrase.en));
        body.appendChild(playBtn);

        // Auto-play
        setTimeout(() => TTS.speak(phrase.en), 300);

        // Options grid
        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOptionClick(btn, grid, i, question.correct));
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }

    // ─── Situation ───
    function renderSituation(body, q) {
        const question = q.data.question;

        const sitEl = document.createElement('div');
        sitEl.className = 'situation-text';
        sitEl.textContent = question.situation;
        body.appendChild(sitEl);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOptionClick(btn, grid, i, question.correct));
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }

    // Shared handler for listen-choose and situation
    function handleOptionClick(clickedBtn, grid, chosenIdx, correctIdx) {
        const question = allQuestions[currentFlatIdx];
        const type = question ? question.type : 'unknown';

        // Disable all
        grid.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.classList.add('disabled');
            if (i === correctIdx) btn.classList.add('reveal-correct');
        });

        const correctText = grid.querySelectorAll('.option-btn')[correctIdx]?.textContent || '';
        const wrongText = clickedBtn.textContent || '';
        const isCorrect = chosenIdx === correctIdx;

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            state.exerciseCorrect++;
            AdaptiveEngine.recordCorrect(type);
            showExerciseFeedback(true, AdaptiveEngine.getMotivationalFeedback());
            Gamification.addXP(10);
            Toast.show('xp', '⭐', '+10 XP', Toast.getCorrectMessage());
        } else {
            clickedBtn.classList.add('incorrect');
            AdaptiveEngine.recordWrong(type);
            showExerciseFeedback(false, AdaptiveEngine.getStrictFeedback(wrongText, correctText));
            if (AdaptiveEngine.shouldShowHint(type)) {
                setTimeout(() => showAdaptiveHintPopup(type), 600);
            }
        }
        showNextButton();
    }

    // ─── Match Pairs ───
    function renderMatchPairs(body, q) {
        const pairs = q.data.pairs;
        state.matchSelected = null;
        let matchedCount = 0;
        const totalPairs = pairs.length;

        const container = document.createElement('div');
        container.className = 'match-container';

        // Shuffle both sides independently
        const enItems = pairs.map((p, i) => ({ text: p.en, originalIdx: i }));
        const hrItems = pairs.map((p, i) => ({ text: p.hr, originalIdx: i }));
        shuffle(enItems);
        shuffle(hrItems);

        // English column
        const enCol = document.createElement('div');
        enCol.className = 'match-column';
        enCol.innerHTML = '<div class="match-column-title">English</div>';
        enItems.forEach((item, i) => {
            const el = document.createElement('div');
            el.className = 'match-item';
            el.textContent = item.text;
            el.dataset.side = 'en';
            el.dataset.index = i;
            el.dataset.original = item.originalIdx;
            el.addEventListener('click', () => handleMatchClick(el, container, totalPairs, () => matchedCount++, () => matchedCount));
            enCol.appendChild(el);
        });

        // Croatian column
        const hrCol = document.createElement('div');
        hrCol.className = 'match-column';
        hrCol.innerHTML = '<div class="match-column-title">Hrvatski</div>';
        hrItems.forEach((item, i) => {
            const el = document.createElement('div');
            el.className = 'match-item';
            el.textContent = item.text;
            el.dataset.side = 'hr';
            el.dataset.index = i;
            el.dataset.original = item.originalIdx;
            el.addEventListener('click', () => handleMatchClick(el, container, totalPairs, () => matchedCount++, () => matchedCount));
            hrCol.appendChild(el);
        });

        container.appendChild(enCol);
        container.appendChild(hrCol);
        body.appendChild(container);
    }

    function handleMatchClick(el, container, totalPairs, incMatched, getMatched) {
        if (el.classList.contains('matched')) return;

        const side = el.dataset.side;
        const original = el.dataset.original;

        // Deselect previous same-side selection
        container.querySelectorAll(`.match-item.selected[data-side="${side}"]`).forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');

        // Check if we have one from each side
        const enSel = container.querySelector('.match-item.selected[data-side="en"]');
        const hrSel = container.querySelector('.match-item.selected[data-side="hr"]');

        if (enSel && hrSel) {
            const enOrig = enSel.dataset.original;
            const hrOrig = hrSel.dataset.original;

            if (enOrig === hrOrig) {
                // Correct match!
                enSel.classList.remove('selected');
                hrSel.classList.remove('selected');
                enSel.classList.add('matched');
                hrSel.classList.add('matched');
                incMatched();
                state.exerciseCorrect++;
                Toast.show('success', '✅', 'Točno!', '');

                // Check if all matched
                const matched = getMatched();
                if (matched >= totalPairs) {
                    showExerciseFeedback(true, `Sve parove ste spojili! 🎉`);
                    Gamification.addXP(10 * totalPairs);
                    Toast.show('xp', '⭐', `+${10 * totalPairs} XP`, 'Svi parovi spojeni!');
                    showNextButton();
                }
            } else {
                // Wrong match
                enSel.classList.add('wrong');
                hrSel.classList.add('wrong');
                setTimeout(() => {
                    enSel.classList.remove('selected', 'wrong');
                    hrSel.classList.remove('selected', 'wrong');
                }, 600);
            }
        }
    }

    // ─── Spell ───
    function renderSpell(body, q) {
        const question = q.data.question;
        let attempts = 0;

        const container = document.createElement('div');
        container.className = 'spell-container';

        const prompt = document.createElement('div');
        prompt.className = 'spell-prompt';
        prompt.textContent = question.hr;
        container.appendChild(prompt);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'spell-input';
        input.placeholder = 'Napišite engleski prijevod...';
        input.autocomplete = 'off';
        input.spellcheck = false;
        container.appendChild(input);

        const hintEl = document.createElement('div');
        hintEl.className = 'spell-hint hidden';
        hintEl.textContent = 'Pomoć: ' + question.hint;
        container.appendChild(hintEl);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary spell-submit';
        submitBtn.textContent = 'Provjeri ✓';
        container.appendChild(submitBtn);

        const check = () => {
            const val = input.value.trim().toLowerCase();
            const accepted = question.accept.map(a => a.toLowerCase());

            if (accepted.includes(val)) {
                input.classList.add('correct');
                input.disabled = true;
                submitBtn.disabled = true;
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('spell');
                showExerciseFeedback(true, AdaptiveEngine.getMotivationalFeedback() + ` "${question.answer}"`);
                Gamification.addXP(15);
                Toast.show('xp', '⭐', '+15 XP', 'Točno napisano!');
                showNextButton();
            } else {
                attempts++;
                AdaptiveEngine.recordWrong('spell');
                input.classList.add('incorrect');
                setTimeout(() => input.classList.remove('incorrect'), 400);
                if (attempts === 1) {
                    showExerciseFeedback(false, `❌ KRIVO! "${val}" nije ispravan odgovor. Pokušajte ponovo. Engleski se NE piše kao što zvuči!`);
                }
                if (attempts >= 2) {
                    hintEl.classList.remove('hidden');
                    showExerciseFeedback(false, `⛔ Opet krivo! Koristite pomoć iznad. Pažljivo razmislite.`);
                    if (AdaptiveEngine.shouldShowHint('spell')) {
                        setTimeout(() => showAdaptiveHintPopup('spell'), 600);
                    }
                }
                if (attempts >= 3) {
                    showExerciseFeedback(false, `🚫 Tri pokušaja. Točan odgovor: "${question.answer}"\nZAPAMTITE ovo — ponovit će se!`);
                    input.value = question.answer;
                    input.classList.add('correct');
                    input.disabled = true;
                    submitBtn.disabled = true;
                    showNextButton();
                }
            }
        };

        submitBtn.addEventListener('click', check);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') check();
        });

        body.appendChild(container);
        setTimeout(() => input.focus(), 100);
    }

    // ─── Fill in the Blank ───
    function renderFillBlank(body, q) {
        const question = q.data.question;
        let attempts = 0;

        const container = document.createElement('div');
        container.className = 'spell-container';

        const prompt = document.createElement('div');
        prompt.className = 'spell-prompt';
        prompt.innerHTML = escapeHTML(question.sentence).replace('___', '<span class="blank-slot">______</span>');
        container.appendChild(prompt);

        if (question.context) {
            const ctx = document.createElement('div');
            ctx.className = 'situation-text';
            ctx.textContent = question.context;
            container.appendChild(ctx);
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'spell-input';
        input.placeholder = 'Upišite riječ koja nedostaje...';
        input.autocomplete = 'off';
        input.spellcheck = false;
        container.appendChild(input);

        const hintEl = document.createElement('div');
        hintEl.className = 'spell-hint hidden';
        hintEl.textContent = 'Pomoć: ' + question.hint;
        container.appendChild(hintEl);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary spell-submit';
        submitBtn.textContent = 'Provjeri ✓';
        container.appendChild(submitBtn);

        const check = () => {
            const val = input.value.trim().toLowerCase();
            const accepted = question.accept.map(a => a.toLowerCase());
            if (accepted.includes(val)) {
                input.classList.add('correct'); input.disabled = true; submitBtn.disabled = true;
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('fill-blank');
                showExerciseFeedback(true, AdaptiveEngine.getMotivationalFeedback() + ` "${question.answer}"`);
                Gamification.addXP(12);
                Toast.show('xp', '⭐', '+12 XP', 'Popunjena praznina!');
                showNextButton();
            } else {
                attempts++;
                AdaptiveEngine.recordWrong('fill-blank');
                input.classList.add('incorrect');
                setTimeout(() => input.classList.remove('incorrect'), 400);
                if (attempts === 1) {
                    showExerciseFeedback(false, `❌ KRIVO! "${val}" ne ide tu. Razmislite o kontekstu rečenice.`);
                }
                if (attempts >= 2) {
                    hintEl.classList.remove('hidden');
                    showExerciseFeedback(false, `⛔ Opet krivo! Pogledajte pomoć. Točan odgovor je samo JEDNA riječ.`);
                }
                if (attempts >= 3) {
                    showExerciseFeedback(false, `🚫 Tri pokušaja. Točan odgovor: "${question.answer}"\nOvo MORATE zapamtiti!`);
                    input.value = question.answer; input.classList.add('correct');
                    input.disabled = true; submitBtn.disabled = true;
                    showNextButton();
                }
            }
        };

        submitBtn.addEventListener('click', check);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        body.appendChild(container);
        setTimeout(() => input.focus(), 100);
    }

    // ─── Error Fix (Croatian interference) ───
    function renderErrorFix(body, q) {
        const question = q.data.question;

        const container = document.createElement('div');
        container.className = 'spell-container';

        const desc = document.createElement('div');
        desc.className = 'situation-text';
        desc.textContent = '🔍 Pronađite i ispravite grešku u rečenici:';
        container.appendChild(desc);

        const wrong = document.createElement('div');
        wrong.className = 'error-sentence';
        wrong.textContent = '"' + question.wrong + '"';
        container.appendChild(wrong);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleOptionClick(btn, grid, i, question.correct));
            grid.appendChild(btn);
        });
        body.appendChild(container);
        body.appendChild(grid);
    }

    // ─── Reorder (word-order exercise) ───
    function renderReorder(body, q) {
        const question = q.data.question;

        const container = document.createElement('div');
        container.className = 'spell-container';

        if (question.context) {
            const ctx = document.createElement('div');
            ctx.className = 'situation-text';
            ctx.textContent = question.context;
            container.appendChild(ctx);
        }

        const promptEl = document.createElement('div');
        promptEl.className = 'spell-prompt';
        promptEl.textContent = 'Poredajte riječi u ispravan redoslijed:';
        container.appendChild(promptEl);

        const placed = [];
        const bankWords = shuffle([...question.words]);

        const dropZone = document.createElement('div');
        dropZone.className = 'reorder-drop';
        dropZone.innerHTML = '<span class="reorder-placeholder">Kliknite riječi ispod ⬇️</span>';
        container.appendChild(dropZone);

        const bank = document.createElement('div');
        bank.className = 'reorder-bank';
        bankWords.forEach((word) => {
            const chip = document.createElement('button');
            chip.className = 'reorder-chip';
            chip.textContent = word;
            chip.addEventListener('click', () => {
                if (chip.classList.contains('used')) {
                    // Return word to bank
                    chip.classList.remove('used');
                    const idx = placed.indexOf(word);
                    if (idx > -1) placed.splice(idx, 1);
                } else {
                    chip.classList.add('used');
                    placed.push(word);
                }
                renderDropZone();
            });
            bank.appendChild(chip);
        });
        container.appendChild(bank);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary spell-submit';
        submitBtn.textContent = 'Provjeri ✓';
        container.appendChild(submitBtn);

        function renderDropZone() {
            if (placed.length === 0) {
                dropZone.innerHTML = '<span class="reorder-placeholder">Kliknite riječi ispod ⬇️</span>';
            } else {
                dropZone.innerHTML = '';
                placed.forEach((w, i) => {
                    const tag = document.createElement('span');
                    tag.className = 'reorder-placed';
                    tag.textContent = w;
                    tag.addEventListener('click', () => {
                        placed.splice(i, 1);
                        bank.querySelectorAll('.reorder-chip').forEach(c => {
                            if (c.textContent === w && c.classList.contains('used')) {
                                c.classList.remove('used');
                            }
                        });
                        renderDropZone();
                    });
                    dropZone.appendChild(tag);
                });
            }
        }

        submitBtn.addEventListener('click', () => {
            const attempt = placed.join(' ').toLowerCase();
            const accepted = question.accept.map(a => a.toLowerCase());
            if (accepted.includes(attempt)) {
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('reorder');
                showExerciseFeedback(true, AdaptiveEngine.getMotivationalFeedback() + ` "${question.answer}"`);
                Gamification.addXP(15);
                Toast.show('xp', '⭐', '+15 XP', 'Ispravan redoslijed!');
                submitBtn.disabled = true;
                bank.querySelectorAll('.reorder-chip').forEach(c => c.disabled = true);
                showNextButton();
            } else {
                AdaptiveEngine.recordWrong('reorder');
                dropZone.classList.add('incorrect');
                setTimeout(() => dropZone.classList.remove('incorrect'), 600);
                if (placed.length === question.words.length) {
                    showExerciseFeedback(false, `🚫 POGREŠAN REDOSLIJED! Vaš pokušaj: "${placed.join(' ')}"\nTočan redoslijed: "${question.answer}"\n\n⚠️ Engleski: SUBJEKT + GLAGOL + OBJEKT. Zapamtite!`);
                    submitBtn.disabled = true;
                    showNextButton();
                    if (AdaptiveEngine.shouldShowHint('reorder')) {
                        setTimeout(() => showAdaptiveHintPopup('reorder'), 600);
                    }
                }
            }
        });

        body.appendChild(container);
    }

    // ─── True/False ───
    function renderTrueFalse(body, q) {
        const question = q.data.question;

        const statement = document.createElement('div');
        statement.className = 'true-false-statement';
        statement.textContent = question.statement;
        body.appendChild(statement);

        const grid = document.createElement('div');
        grid.className = 'option-grid true-false-grid';

        const trueBtn = document.createElement('button');
        trueBtn.className = 'option-btn true-false-btn tf-true';
        trueBtn.textContent = '✅ TOČNO';

        const falseBtn = document.createElement('button');
        falseBtn.className = 'option-btn true-false-btn tf-false';
        falseBtn.textContent = '❌ NETOČNO';

        function handleTF(userAnswer) {
            trueBtn.classList.add('disabled');
            falseBtn.classList.add('disabled');
            const isCorrect = userAnswer === question.correct;
            const clickedBtn = userAnswer ? trueBtn : falseBtn;

            if (isCorrect) {
                clickedBtn.classList.add('correct');
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('true-false');
                showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + ' ' + question.explanation);
                Gamification.addXP(10);
                Toast.show('xp', '⭐', '+10 XP', Toast.getCorrectMessage());
            } else {
                clickedBtn.classList.add('incorrect');
                (userAnswer ? falseBtn : trueBtn).classList.add('reveal-correct');
                AdaptiveEngine.recordWrong('true-false');
                showExerciseFeedback(false, `❌ KRIVO! ${question.explanation}\n\n⚠️ Čitajte PAŽLJIVO! Male razlike u prijevodu potpuno mijenjaju značenje.`);
                if (AdaptiveEngine.shouldShowHint('true-false')) {
                    setTimeout(() => showAdaptiveHintPopup('true-false'), 600);
                }
            }
            showNextButton();
        }

        trueBtn.addEventListener('click', () => handleTF(true));
        falseBtn.addEventListener('click', () => handleTF(false));
        grid.appendChild(trueBtn);
        grid.appendChild(falseBtn);
        body.appendChild(grid);
    }

    // ─── Pronunciation Trap ───
    function renderPronunciationTrap(body, q) {
        const question = q.data.question;

        const wordEl = document.createElement('div');
        wordEl.className = 'pronunciation-word';
        wordEl.innerHTML = `Kako se <strong>ispravno</strong> izgovara: <span class="pronunciation-target">"${escapeHTML(question.word)}"</span>`;
        body.appendChild(wordEl);

        const playBtn = document.createElement('button');
        playBtn.className = 'exercise-play-btn';
        playBtn.innerHTML = '🔊 Slušaj ispravan izgovor';
        playBtn.addEventListener('click', () => TTS.speak(question.word));
        body.appendChild(playBtn);

        // Auto-play
        setTimeout(() => TTS.speak(question.word), 300);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn pronunciation-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('pronunciation-trap');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + ' ' + question.explanation);
                    Gamification.addXP(12);
                    Toast.show('xp', '⭐', '+12 XP', 'Dobar izgovor!');
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('pronunciation-trap');
                    showExerciseFeedback(false, `❌ KRIVO! ${question.explanation}\n\n⚠️ Izgovor je KLJUČAN — jedan krivi zvuk i Amerikanci vas NEĆE razumjeti!`);
                    if (AdaptiveEngine.shouldShowHint('pronunciation-trap')) {
                        setTimeout(() => showAdaptiveHintPopup('pronunciation-trap'), 600);
                    }
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── IMAGE-CHOOSE: Visual vocabulary exercise ───
    function renderImageChoose(body, q) {
        const question = q.data.question;

        const prompt = document.createElement('div');
        prompt.className = 'image-choose-prompt';
        prompt.innerHTML = `<div class="image-choose-emoji">${question.image}</div><p>${escapeHTML(question.prompt)}</p>`;
        body.appendChild(prompt);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('image-choose');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback());
                    SFX.play('correct');
                    Gamification.addXP(10);
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('image-choose');
                    const wrongText = opt;
                    const correctText = question.options[question.correct];
                    showExerciseFeedback(false, AdaptiveEngine.getStrictFeedback(wrongText, correctText));
                    SFX.play('wrong');
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── VIDEO-COMPREHENSION: Watch & answer exercise ───
    function renderVideoComprehension(body, q) {
        const question = q.data.question;

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-exercise-container';
        videoContainer.innerHTML = `
            <div class="video-instruction">
                <p>🎬 ${escapeHTML(question.instruction || 'Pogledajte video i odgovorite na pitanje:')}</p>
            </div>
            <div class="video-embed">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(question.videoId)}?rel=0&cc_load_policy=1"
                    allowfullscreen
                    loading="lazy"
                    title="Video vježba"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>
            </div>
            <div class="video-question-text">${escapeHTML(question.questionText)}</div>
        `;
        body.appendChild(videoContainer);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('video-comprehension');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + (question.explanation ? ' ' + question.explanation : ''));
                    SFX.play('correct');
                    Gamification.addXP(20);
                    Toast.show('xp', '⭐', '+20 XP', 'Video vježba!');
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('video-comprehension');
                    const wrongText = opt;
                    const correctText = question.options[question.correct];
                    showExerciseFeedback(false, AdaptiveEngine.getStrictFeedback(wrongText, correctText) + (question.explanation ? '\n\n💡 ' + question.explanation : ''));
                    SFX.play('wrong');
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── DIALOGUE COMPLETION: Fill missing reply in a conversation ───
    function renderDialogue(body, q) {
        const question = q.data.question;
        const container = document.createElement('div');
        container.className = 'dialogue-container';

        question.lines.forEach(line => {
            const div = document.createElement('div');
            div.className = 'dialogue-line ' + (line.speaker === 'A' ? 'speaker-a' : 'speaker-b');
            if (line.blank) {
                div.innerHTML = `<span class="dialogue-speaker">${line.speaker === 'A' ? '🧑' : '👤'}</span><span class="dialogue-text dialogue-blank">???</span>`;
            } else {
                div.innerHTML = `<span class="dialogue-speaker">${line.speaker === 'A' ? '🧑' : '👤'}</span><span class="dialogue-text">${escapeHTML(line.text)}</span>`;
            }
            container.appendChild(div);
        });
        body.appendChild(container);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                // Fill in the blank
                const blank = container.querySelector('.dialogue-blank');
                if (blank) { blank.textContent = question.options[question.correct]; blank.classList.add('filled'); }

                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('dialogue');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + (question.explanation ? ' ' + question.explanation : ''));
                    Gamification.addXP(12);
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('dialogue');
                    showExerciseFeedback(false, AdaptiveEngine.getStrictFeedback(opt, question.options[question.correct]) + (question.explanation ? '\n\n💡 ' + question.explanation : ''));
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── SENTENCE DICTATION: Listen and type entire sentence ───
    function renderDictation(body, q) {
        const question = q.data.question;

        const prompt = document.createElement('div');
        prompt.className = 'dictation-prompt';
        prompt.innerHTML = `<p>🎧 Slušajte rečenicu i upišite što čujete na engleskom.</p>`;
        body.appendChild(prompt);

        const playBtn = document.createElement('button');
        playBtn.className = 'exercise-play-btn';
        playBtn.innerHTML = '🔊 Slušaj rečenicu';
        playBtn.addEventListener('click', () => TTS.speak(question.sentence));
        body.appendChild(playBtn);

        const slowBtn = document.createElement('button');
        slowBtn.className = 'exercise-play-btn';
        slowBtn.style.marginLeft = '8px';
        slowBtn.innerHTML = '🐢 Sporije';
        slowBtn.addEventListener('click', () => TTS.speakSlow(question.sentence));
        body.appendChild(slowBtn);

        // Auto-play
        setTimeout(() => TTS.speak(question.sentence), 400);

        const inputArea = document.createElement('div');
        inputArea.className = 'dictation-input-area';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'dictation-input';
        input.placeholder = 'Upišite rečenicu ovdje...';
        input.autocomplete = 'off';
        input.spellcheck = false;
        inputArea.appendChild(input);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'btn btn-primary';
        checkBtn.textContent = '✓ Provjeri';
        checkBtn.addEventListener('click', () => {
            const userAnswer = input.value.trim();
            if (!userAnswer) return;
            checkBtn.disabled = true;
            input.disabled = true;

            const score = STT.similarity(userAnswer, question.sentence);
            const pct = Math.round(score * 100);
            const pass = score >= 0.75;

            if (pass) {
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('dictation');
                input.classList.add('dictation-correct');
                showExerciseFeedback(true, `✅ ${pct}% točno! ` + AdaptiveEngine.getMotivationalFeedback());
                Gamification.addXP(15);
            } else {
                AdaptiveEngine.recordWrong('dictation');
                input.classList.add('dictation-wrong');
                showExerciseFeedback(false, `❌ ${pct}% podudaranje — premalo!\n\nTočna rečenica: "${question.sentence}"\n\n⚠️ Slušajte PAŽLJIVO svaku riječ!`);
            }

            // Show correct answer
            const reveal = document.createElement('div');
            reveal.className = 'dictation-reveal';
            reveal.innerHTML = `<strong>Točno:</strong> ${escapeHTML(question.sentence)}`;
            inputArea.appendChild(reveal);
            showNextButton();
        });
        inputArea.appendChild(checkBtn);
        body.appendChild(inputArea);

        // Submit on Enter
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkBtn.click(); });
    }


    // ─── CONTEXT GUESSING: Guess word meaning from context ───
    function renderContextGuess(body, q) {
        const question = q.data.question;

        const sentenceEl = document.createElement('div');
        sentenceEl.className = 'context-guess-sentence';
        // Highlight the target word
        const highlighted = escapeHTML(question.sentence).replace(
            new RegExp('\\b' + escapeHTML(question.targetWord).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i'),
            `<span class="context-target-word">${escapeHTML(question.targetWord)}</span>`
        );
        sentenceEl.innerHTML = `<p>${highlighted}</p><p class="context-guess-hint">Što znači označena riječ?</p>`;
        body.appendChild(sentenceEl);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('context-guess');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + ` "${question.targetWord}" = ${question.options[question.correct]}`);
                    Gamification.addXP(12);
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('context-guess');
                    showExerciseFeedback(false, `❌ KRIVO! "${question.targetWord}" znači "${question.options[question.correct]}". Razmislite logički — što ima smisla u toj rečenici?`);
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── MINIMAL PAIRS: Distinguish similar sounds ───
    function renderMinimalPairs(body, q) {
        const question = q.data.question;

        const prompt = document.createElement('div');
        prompt.className = 'minimal-pairs-prompt';
        prompt.innerHTML = `<p>🎧 Slušajte PAŽLJIVO. Koja je riječ izgovorena?</p>
            <div class="minimal-pairs-words">${question.words.map(w => `<span class="mp-word">${escapeHTML(w)}</span>`).join(' <span class="mp-vs">ili</span> ')}</div>`;
        body.appendChild(prompt);

        const playBtn = document.createElement('button');
        playBtn.className = 'exercise-play-btn';
        playBtn.innerHTML = '🔊 Slušaj';
        playBtn.addEventListener('click', () => TTS.speak(question.words[question.correct]));
        body.appendChild(playBtn);

        setTimeout(() => TTS.speak(question.words[question.correct]), 400);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.words.forEach((word, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn mp-option';
            btn.innerHTML = `<strong>${escapeHTML(word)}</strong><br><span style="font-size:var(--fs-sm);color:var(--text-dim);">${escapeHTML(question.phonetics[i])}</span>`;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('minimal-pairs');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + ' ' + question.explanation);
                    Gamification.addXP(15);
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('minimal-pairs');
                    showExerciseFeedback(false, `❌ KRIVO! Izgovorena riječ: "${question.words[question.correct]}". ${question.explanation}\n\n⚠️ Ova razlika je KLJUČNA — krivo čujete = krivo odgovarate u realnom životu!`);
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── STORY SEQUENCING: Order sentences into correct story ───
    function renderStorySequence(body, q) {
        const question = q.data.question;
        const shuffled = question.sentences.map((s, i) => ({ text: s, origIdx: i }));
        shuffle(shuffled);

        const container = document.createElement('div');
        container.className = 'story-sequence-container';
        container.innerHTML = `<p class="story-sequence-title">${escapeHTML(question.title || 'Poredajte rečenice u ispravan kronološki redoslijed:')}</p>`;

        const list = document.createElement('div');
        list.className = 'story-sequence-list';

        shuffled.forEach(item => {
            const el = document.createElement('div');
            el.className = 'story-sentence';
            el.textContent = item.text;
            el.dataset.origIdx = item.origIdx;
            el.draggable = true;

            // Click to select/move (works on mobile too)
            el.addEventListener('click', () => {
                const selected = list.querySelector('.story-selected');
                if (selected && selected !== el) {
                    // Swap
                    const parent = list;
                    const items = [...parent.children];
                    const idx1 = items.indexOf(selected);
                    const idx2 = items.indexOf(el);
                    if (idx1 < idx2) { parent.insertBefore(el, selected); parent.insertBefore(selected, items[idx2 + 1] || null); }
                    else { parent.insertBefore(selected, el); parent.insertBefore(el, items[idx1 + 1] || null); }
                    selected.classList.remove('story-selected');
                    SFX.play('click');
                } else {
                    list.querySelectorAll('.story-selected').forEach(s => s.classList.remove('story-selected'));
                    el.classList.toggle('story-selected');
                }
            });
            list.appendChild(el);
        });
        container.appendChild(list);

        const checkBtn = document.createElement('button');
        checkBtn.className = 'btn btn-primary';
        checkBtn.style.marginTop = '1rem';
        checkBtn.textContent = '✓ Provjeri redoslijed';
        checkBtn.addEventListener('click', () => {
            checkBtn.disabled = true;
            const current = [...list.children].map(el => parseInt(el.dataset.origIdx));
            const correct = question.sentences.map((_, i) => i);
            const isCorrect = JSON.stringify(current) === JSON.stringify(correct);

            list.querySelectorAll('.story-sentence').forEach((el, i) => {
                const origIdx = parseInt(el.dataset.origIdx);
                el.classList.add(origIdx === i ? 'story-correct' : 'story-wrong');
                el.prepend(document.createTextNode((origIdx + 1) + '. '));
            });

            if (isCorrect) {
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('story-sequence');
                showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + ' Kronologija je ispravna!');
                Gamification.addXP(20);
            } else {
                AdaptiveEngine.recordWrong('story-sequence');
                showExerciseFeedback(false, '❌ KRIVI REDOSLIJED! Razmislite logički — što se dešava PRVO, a što nakon toga?');
            }
            showNextButton();
        });
        container.appendChild(checkBtn);
        body.appendChild(container);
    }


    // ─── ROLE PLAY: What would you say in this situation? ───
    function renderRolePlay(body, q) {
        const question = q.data.question;

        const scenario = document.createElement('div');
        scenario.className = 'role-play-scenario';
        scenario.innerHTML = `<div class="role-play-icon">${question.icon || '🎭'}</div><p class="role-play-situation">${escapeHTML(question.situation)}</p>`;
        body.appendChild(scenario);

        const grid = document.createElement('div');
        grid.className = 'option-grid';
        question.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                grid.querySelectorAll('.option-btn').forEach((b, j) => {
                    b.classList.add('disabled');
                    if (j === question.correct) b.classList.add('reveal-correct');
                });
                const isCorrect = i === question.correct;
                if (isCorrect) {
                    btn.classList.add('correct');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('role-play');
                    showExerciseFeedback(true, '✅ ' + AdaptiveEngine.getMotivationalFeedback() + (question.explanation ? ' ' + question.explanation : ''));
                    Gamification.addXP(12);
                } else {
                    btn.classList.add('incorrect');
                    AdaptiveEngine.recordWrong('role-play');
                    showExerciseFeedback(false, AdaptiveEngine.getStrictFeedback(opt, question.options[question.correct]) + (question.explanation ? '\n\n💡 ' + question.explanation : ''));
                }
                showNextButton();
            });
            grid.appendChild(btn);
        });
        body.appendChild(grid);
    }


    // ─── ERROR DETECTION: Find WHICH word is wrong ───
    function renderErrorDetect(body, q) {
        const question = q.data.question;
        const words = question.sentence.split(/\s+/);

        const prompt = document.createElement('div');
        prompt.className = 'error-detect-prompt';
        prompt.innerHTML = `<p>🔍 Kliknite na KRIVU riječ u rečenici:</p>`;
        body.appendChild(prompt);

        const sentenceEl = document.createElement('div');
        sentenceEl.className = 'error-detect-sentence';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'error-detect-word';
            span.textContent = word;
            span.addEventListener('click', () => {
                if (sentenceEl.classList.contains('answered')) return;
                sentenceEl.classList.add('answered');

                sentenceEl.querySelectorAll('.error-detect-word').forEach((w, j) => {
                    if (j === question.wrongWordIdx) w.classList.add('error-word-correct');
                });

                if (i === question.wrongWordIdx) {
                    span.classList.add('error-word-found');
                    state.exerciseCorrect++;
                    AdaptiveEngine.recordCorrect('error-detect');
                    showExerciseFeedback(true, `✅ ${AdaptiveEngine.getMotivationalFeedback()} Kriva riječ "${words[question.wrongWordIdx]}" → ispravno: "${question.correction}"`);
                    Gamification.addXP(15);
                } else {
                    span.classList.add('error-word-miss');
                    AdaptiveEngine.recordWrong('error-detect');
                    showExerciseFeedback(false, `❌ KRIVO! Pogrešna riječ je "${words[question.wrongWordIdx]}" → treba biti "${question.correction}".\n\nIspravna rečenica: "${question.correctedSentence}"`);
                }
                showNextButton();
            });
            sentenceEl.appendChild(span);
            if (i < words.length - 1) sentenceEl.appendChild(document.createTextNode(' '));
        });
        body.appendChild(sentenceEl);
    }


    // ─── SHADOWING: Listen and repeat within 1 second ───
    function renderShadowing(body, q) {
        const question = q.data.question;

        const container = document.createElement('div');
        container.className = 'shadowing-container';
        container.innerHTML = `
            <div class="shadowing-title">🗣️ Shadowing — slušaj pa ponovi!</div>
            <p class="shadowing-desc">Pritisnite play, pa ODMAH ponovite naglas. Imitirajte ton i ritam.</p>
            <div class="shadowing-phrase">"${escapeHTML(question.phrase)}"</div>
            <div class="shadowing-phonetic">${escapeHTML(question.phonetic || '')}</div>
        `;
        body.appendChild(container);

        const btnArea = document.createElement('div');
        btnArea.className = 'shadowing-btn-area';

        const playBtn = document.createElement('button');
        playBtn.className = 'exercise-play-btn';
        playBtn.innerHTML = '🔊 Slušaj';
        playBtn.addEventListener('click', () => TTS.speak(question.phrase));
        btnArea.appendChild(playBtn);

        if (STT.isAvailable()) {
            const recBtn = document.createElement('button');
            recBtn.className = 'btn btn-primary';
            recBtn.innerHTML = '🎤 Ponovi naglas';
            recBtn.addEventListener('click', () => {
                recBtn.textContent = '🎤 Slušam...';
                recBtn.disabled = true;
                STT.listen(question.phrase, (result) => {
                    recBtn.textContent = '🎤 Ponovi naglas';
                    recBtn.disabled = false;
                    const pct = Math.round((result.score || 0) * 100);
                    if (result.success) {
                        state.exerciseCorrect++;
                        AdaptiveEngine.recordCorrect('shadowing');
                        showExerciseFeedback(true, `✅ ${pct}% podudaranje! "${escapeHTML(result.heard)}" — ` + AdaptiveEngine.getMotivationalFeedback());
                        Gamification.addXP(pct >= 85 ? 15 : 10);
                        showNextButton();
                    } else {
                        AdaptiveEngine.recordWrong('shadowing');
                        const heardTxt = result.heard ? ` Čuo sam: "${escapeHTML(result.heard)}" (${pct}%)` : '';
                        showExerciseFeedback(false, `❌ Pokušajte ponovo!${heardTxt}\n\nCilj: "${question.phrase}"\nFonetski: ${question.phonetic}\n\n⚠️ Govorite GLASNO i JASNO. Imitirajte točno ono što ste čuli!`);
                    }
                });
            });
            btnArea.appendChild(recBtn);
        } else {
            // Fallback: self-assessment
            const goodBtn = document.createElement('button');
            goodBtn.className = 'btn btn-success';
            goodBtn.textContent = '👍 Ponovio sam dobro';
            goodBtn.addEventListener('click', () => {
                state.exerciseCorrect++;
                AdaptiveEngine.recordCorrect('shadowing');
                showExerciseFeedback(true, '✅ Svaka čast! Shadowing vježba gotova.');
                Gamification.addXP(8);
                showNextButton();
            });
            const retryBtn = document.createElement('button');
            retryBtn.className = 'btn btn-secondary';
            retryBtn.textContent = '🔄 Pokušat ću ponovo';
            retryBtn.addEventListener('click', () => TTS.speak(question.phrase));
            const skipBtn = document.createElement('button');
            skipBtn.className = 'btn btn-secondary';
            skipBtn.textContent = 'Dalje →';
            skipBtn.addEventListener('click', () => { showNextButton(); document.getElementById('btn-next-exercise')?.click(); });
            btnArea.appendChild(goodBtn);
            btnArea.appendChild(retryBtn);
            btnArea.appendChild(skipBtn);
        }

        body.appendChild(btnArea);
        // Auto-play first
        setTimeout(() => TTS.speak(question.phrase), 300);
    }


    // ─── Memory Match — Cognitive Card Game ───
    function renderMemoryMatch(body, q) {
        const pairs = q.data.pairs || [];
        // Create cards: each pair creates 2 cards (en + hr)
        const cards = [];
        pairs.forEach((p, i) => {
            cards.push({ id: i, lang: 'en', text: p.en, pairId: i });
            cards.push({ id: i, lang: 'hr', text: p.hr, pairId: i });
        });
        // Shuffle
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        let flipped = [];
        let matched = new Set();
        let attempts = 0;
        const perfectAttempts = pairs.length; // minimum possible

        const grid = document.createElement('div');
        grid.className = 'memory-grid';
        // Grid columns based on count
        const cols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 5;
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        cards.forEach((card, idx) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'memory-card';
            cardEl.dataset.idx = idx;
            cardEl.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">?</div>
                    <div class="memory-card-back ${card.lang}">${escapeHTML(card.text)}</div>
                </div>
            `;
            cardEl.addEventListener('click', () => {
                if (flipped.length >= 2 || matched.has(idx) || flipped.includes(idx)) return;
                cardEl.classList.add('flipped');
                flipped.push(idx);
                SFX.play('click');

                if (flipped.length === 2) {
                    attempts++;
                    const [a, b] = flipped;
                    const cardA = cards[a], cardB = cards[b];
                    if (cardA.pairId === cardB.pairId && cardA.lang !== cardB.lang) {
                        // Match!
                        matched.add(a);
                        matched.add(b);
                        setTimeout(() => {
                            grid.children[a].classList.add('matched');
                            grid.children[b].classList.add('matched');
                            SFX.play('correct');
                            flipped = [];
                            updateMatchStatus();
                            if (matched.size === cards.length) {
                                // All matched!
                                state.memoryMatchDone = (state.memoryMatchDone || 0) + 1;
                                const score = Math.max(0, Math.round((perfectAttempts / attempts) * 100));
                                if (score >= 70) state.exerciseCorrect++;
                                AdaptiveEngine.recordCorrect('memory-match');
                                showExerciseFeedback(score >= 70,
                                    score >= 90 ? `🏆 Nevjerojatno! ${attempts} pokušaja — gotovo savršeno pamćenje!` :
                                    score >= 70 ? `🎉 Odlično! ${attempts} pokušaja. Dobro pamtite parove!` :
                                    `📝 Završili ste u ${attempts} pokušaja. Vježbajte za bolji rezultat!`
                                );
                                Gamification.addXP(score >= 90 ? 15 : score >= 70 ? 10 : 5);
                                showNextButton();
                            }
                        }, 400);
                    } else {
                        // No match — flip back
                        setTimeout(() => {
                            grid.children[a].classList.remove('flipped');
                            grid.children[b].classList.remove('flipped');
                            SFX.play('wrong');
                            flipped = [];
                        }, 800);
                    }
                }
            });
            grid.appendChild(cardEl);
        });

        const status = document.createElement('div');
        status.className = 'memory-status';
        status.innerHTML = `<span id="memory-matched">0</span> / ${pairs.length} parova | Pokušaji: <span id="memory-attempts">0</span>`;

        function updateMatchStatus() {
            const m = document.getElementById('memory-matched');
            const a = document.getElementById('memory-attempts');
            if (m) m.textContent = matched.size / 2;
            if (a) a.textContent = attempts;
        }

        body.appendChild(status);
        body.appendChild(grid);
    }


    // ─── Helpers ───
    function showExerciseFeedback(correct, text) {
        const fb = document.getElementById('exercise-feedback');
        if (!fb) return;
        fb.classList.remove('hidden', 'correct', 'incorrect');
        fb.classList.add(correct ? 'correct' : 'incorrect');
        fb.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');
        if (correct) state.totalCorrectAnswers = (state.totalCorrectAnswers || 0) + 1;
        if (typeof SFX !== 'undefined') SFX[correct ? 'playCombo' : 'play'](correct ? undefined : 'wrong');
        // Persist exercise progress for mid-exercise resume
        Storage.save();
    }

    function showAdaptiveHintPopup(type) {
        const hint = AdaptiveEngine.getHintForType(type);
        const overlay = document.createElement('div');
        overlay.className = 'adaptive-hint-overlay';
        overlay.innerHTML = `
            <div class="adaptive-hint-popup">
                <div class="adaptive-hint-title">⚠️ Dodatna Pomoć — Čitajte pažljivo!</div>
                <div class="adaptive-hint-body">${escapeHTML(hint).replace(/\n/g, '<br>')}</div>
                <button class="btn btn-primary adaptive-hint-close">Razumijem, nastavljam</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.adaptive-hint-close').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }

    function showNextButton() {
        const btn = document.getElementById('btn-next-exercise');
        if (btn) btn.classList.remove('hidden');
    }

    function nextQuestion() {
        // Update per-question progress so dashboard reflects real-time progress
        const lid = state.currentLessonId;
        if (lid) {
            if (!state.lessonProgress[lid]) state.lessonProgress[lid] = {};
            state.lessonProgress[lid].exercisesDone = currentFlatIdx + 1;
            state.lessonProgress[lid].exercisesCorrect = state.exerciseCorrect;
        }
        currentFlatIdx++;
        state.exerciseFlatIdx = currentFlatIdx;
        Storage.save();
        renderQuestion();
    }

    function resume(lessonId, flatIdx, correct) {
        const lesson = CURRICULUM.lessons.find(l => l.id === lessonId);
        if (!lesson || !lesson.exercises || lesson.exercises.length === 0) return;

        state.currentLessonId = lessonId;
        AdaptiveEngine.reset();

        allQuestions = [];
        lesson.exercises.forEach((exSet, sIdx) => {
            if (exSet.type === 'match-pairs' || exSet.type === 'memory-match') {
                allQuestions.push({ setIdx: sIdx, qIdx: 0, type: exSet.type, data: exSet });
            } else if (exSet.questions) {
                exSet.questions.forEach((q, qIdx) => {
                    allQuestions.push({ setIdx: sIdx, qIdx, type: exSet.type, data: { ...exSet, question: q } });
                });
            }
        });

        state.exerciseTotal = allQuestions.length;
        state.exerciseCorrect = correct || 0;
        currentFlatIdx = Math.min(flatIdx || 0, allQuestions.length - 1);
        state.exerciseFlatIdx = currentFlatIdx;

        Router.go('exercise');
        renderQuestion();
    }

    return { start, nextQuestion, resume };
})();


// =============================================================================
// 11. RESULTS — Score screen
// =============================================================================

const Results = (() => {
    function show(lessonId, correct, total) {
        Router.go('results');

        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        const isPerfect = pct === 100;

        // Icon
        setText('results-icon', isPerfect ? '🏆' : pct >= 70 ? '🎉' : '📝');
        setText('results-title', isPerfect ? 'Savršeno!' : pct >= 70 ? 'Čestitke!' : 'Dobar pokušaj!');
        setText('results-subtitle', isPerfect
            ? 'Sve ste odgovorili točno! Nevjerojatno!'
            : pct >= 70
            ? 'Odlično napredujete. Samo nastavite!'
            : 'Ponavljanje je majka znanja. Pokušajte ponovo!');

        // Score ring animation
        const ring = document.getElementById('score-ring');
        const scoreText = document.getElementById('score-text');
        if (ring) {
            const circumference = 314;
            const offset = circumference - (circumference * pct / 100);
            ring.style.strokeDashoffset = circumference; // reset
            setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
        }
        if (scoreText) scoreText.textContent = pct + '%';

        // Stats
        const statsEl = document.getElementById('results-stats');
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="results-stat-item"><span class="results-stat-value">${correct}</span>Točnih</div>
                <div class="results-stat-item"><span class="results-stat-value">${total - correct}</span>Netočnih</div>
                <div class="results-stat-item"><span class="results-stat-value">+${correct * 10 + (isPerfect ? 50 : 0)}</span>XP</div>
            `;
        }

        // First-time completion: full XP + coins
        // Practice mode (re-doing completed lesson): reduced XP, NO coins
        const isFirstCompletion = !state.completedLessons.includes(lessonId);
        const wasPractice = state.isPracticeMode;

        if (isFirstCompletion) {
            Gamification.addXP(30);
            if (isPerfect) {
                Gamification.addXP(50);
                Toast.show('achievement', '🎯', 'Savršen rezultat!', '+50 bonus XP');
            }
        } else {
            // Practice mode: small XP reward, no coins (handled by addXP)
            state.isPracticeMode = true;
            Gamification.addXP(5);
            Toast.show('info', '🔄', 'Ponavljanje završeno', 'Vježba čini majstora! (+5 XP)');
            state.isPracticeMode = wasPractice;
        }

        // Mark lesson as completed
        if (isFirstCompletion) {
            state.completedLessons.push(lessonId);
            unlockNextLesson(lessonId);
        }

        // Update lesson progress
        if (!state.lessonProgress[lessonId]) state.lessonProgress[lessonId] = {};
        const lp = state.lessonProgress[lessonId];
        lp.exercisesDone = total;
        lp.exercisesCorrect = correct;
        lp.completed = true;
        if (!lp.bestScore || pct > lp.bestScore) lp.bestScore = pct;

        // Add phrases to SRS
        const lesson = CURRICULUM.lessons.find(l => l.id === lessonId);
        if (lesson) {
            lesson.phrases.forEach(p => {
                if (!state.srsData[p.id]) {
                    state.srsData[p.id] = { box: 1, nextReview: Date.now() };
                }
                if (!state.phrasesLearned.includes(p.id)) {
                    state.phrasesLearned.push(p.id);
                }
            });
        }

        // Mark today as practice day
        state.lastPracticeDate = new Date().toDateString();

        // Reset practice mode flag
        state.isPracticeMode = false;

        Storage.save();
        Gamification.checkAchievements();
        Sidebar.render();

        // Confetti for good scores
        if (pct >= 70) Confetti.start();
    }

    return { show };
})();


// =============================================================================
// 12. REVIEW — Spaced Repetition System (SRS)
// =============================================================================

const Review = (() => {
    const BOX_INTERVALS = {
        1: 0,             // Immediately
        2: 1 * 86400000,  // 1 day
        3: 3 * 86400000,  // 3 days
        4: 7 * 86400000,  // 7 days
        5: 14 * 86400000, // 14 days (mastered)
    };

    function render() {
        Router.go('review');
        const content = document.getElementById('review-content');
        const emptyEl = document.getElementById('review-empty');
        if (!content || !emptyEl) return;

        const dueCards = getDueCards();
        const allCards = Object.entries(state.srsData);
        const mastered = allCards.filter(([, d]) => d.box >= 5).length;

        if (dueCards.length === 0) {
            content.innerHTML = '';
            emptyEl.classList.remove('hidden');
            // Show summary even when empty
            if (allCards.length > 0) {
                const summaryEl = document.createElement('div');
                summaryEl.className = 'review-summary';
                summaryEl.innerHTML = `
                    <div class="review-summary-stat"><span class="review-num">${allCards.length}</span>Ukupno fraza</div>
                    <div class="review-summary-stat"><span class="review-num">${mastered}</span>Savladano</div>
                    <div class="review-summary-stat"><span class="review-num">${allCards.length - mastered}</span>U učenju</div>
                `;
                content.appendChild(summaryEl);
            }
            return;
        }

        emptyEl.classList.add('hidden');
        content.innerHTML = '';

        const desc = document.getElementById('review-desc');
        if (desc) desc.textContent = `Imate ${dueCards.length} fraza za ponavljanje danas.`;

        // Summary stats bar
        const summaryEl = document.createElement('div');
        summaryEl.className = 'review-summary';
        summaryEl.innerHTML = `
            <div class="review-summary-stat"><span class="review-num">${dueCards.length}</span>Za danas</div>
            <div class="review-summary-stat"><span class="review-num">${mastered}</span>Savladano</div>
            <div class="review-summary-stat"><span class="review-num">${allCards.length}</span>Ukupno</div>
        `;
        content.appendChild(summaryEl);

        // Show first due card
        showReviewCard(content, dueCards, 0);
    }

    function showReviewCard(container, cards, idx) {
        if (idx >= cards.length) {
            container.innerHTML = `
                <div class="review-card">
                    <div style="font-size:3rem; margin-bottom:16px;">🎉</div>
                    <h3>Sve ste ponovili!</h3>
                    <p style="color:var(--text-dim); margin:12px 0;">Svaka čast. Nastavite sutra!</p>
                    <button class="btn btn-primary" onclick="Dashboard.render()">← Natrag</button>
                </div>
            `;
            Gamification.addXP(20);
            Toast.show('success', '✅', 'Ponavljanje završeno!', '+20 XP');
            Storage.save();
            return;
        }

        const card = cards[idx];
        const phrase = findPhraseById(card.phraseId);
        if (!phrase) { showReviewCard(container, cards, idx + 1); return; }

        container.innerHTML = `
            <div class="review-card">
                <div class="review-phrase-en">${escapeHTML(phrase.en)}</div>
                <button class="btn btn-play" id="review-play">🔊 Slušaj</button>
                <div id="review-answer" style="margin-top:24px;">
                    <button class="btn btn-primary btn-large" id="review-reveal">Pokaži prijevod</button>
                </div>
            </div>
            <p style="text-align:center; margin-top:12px; color:var(--text-dim); font-size:var(--fs-sm);">
                ${idx + 1} / ${cards.length}
            </p>
        `;

        document.getElementById('review-play')?.addEventListener('click', () => TTS.speak(phrase.en));
        document.getElementById('review-reveal')?.addEventListener('click', () => {
            const answerDiv = document.getElementById('review-answer');
            if (!answerDiv) return;
            answerDiv.innerHTML = `
                <div class="review-phrase-hr">${escapeHTML(phrase.hr)}</div>
                <p style="color:var(--text-dim); margin-bottom:16px;">Kako vam je išlo?</p>
                <div class="review-rating">
                    <button class="btn btn-secondary" data-rating="hard">😕 Teško</button>
                    <button class="btn btn-primary" data-rating="good">🙂 Dobro</button>
                    <button class="btn btn-success" data-rating="easy">😎 Lako!</button>
                </div>
            `;
            answerDiv.querySelectorAll('[data-rating]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const rating = btn.dataset.rating;
                    updateSRS(card.phraseId, rating);
                    showReviewCard(container, cards, idx + 1);
                });
            });
        });

        // Auto-play
        setTimeout(() => TTS.speak(phrase.en), 200);
    }

    function getDueCards() {
        const now = Date.now();
        const due = [];
        Object.entries(state.srsData).forEach(([phraseId, data]) => {
            if (data.nextReview <= now && data.box < 5) {
                due.push({ phraseId, ...data });
            }
        });
        // Sort by box (lowest first = most needed)
        due.sort((a, b) => a.box - b.box);
        return due;
    }

    function updateSRS(phraseId, rating) {
        const data = state.srsData[phraseId];
        if (!data) return;

        if (rating === 'easy') {
            data.box = Math.min(5, data.box + 1);
        } else if (rating === 'good') {
            data.box = Math.min(5, data.box + 1);
        } else {
            data.box = 1; // back to start
        }

        data.nextReview = Date.now() + (BOX_INTERVALS[data.box] || 0);
        Gamification.addXP(5);
        Storage.save();
    }

    return { render, getDueCards };
})();


// =============================================================================
// 19. BACKUP & PWA SUPPORT
// =============================================================================

let __deferredInstallPrompt = null;

function exportProgress() {
    const data = {
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        lastPracticeDate: state.lastPracticeDate,
        completedLessons: state.completedLessons,
        phrasesHeard: state.phrasesHeard,
        phrasesLearned: state.phrasesLearned,
        unlockedAchievements: state.unlockedAchievements,
        srsData: state.srsData,
        micUseCount: state.micUseCount,
    };
    try {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'engleski-progress.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        Toast.show('success', '💾', 'Export...', 'Napredak je preuzet.');
    } catch (e) {
        Toast.show('error', '', 'Greška', 'Export nije uspio.');
    }
}

function importProgressFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const obj = JSON.parse(reader.result);
            if (obj && typeof obj === 'object') {
                const keys = ['xp','level','streak','lastPracticeDate','completedLessons','phrasesHeard','phrasesLearned','unlockedAchievements','srsData','micUseCount'];
                keys.forEach(k => { if (obj[k] !== undefined) state[k] = obj[k]; });
                Storage.save();
                Sidebar.render();
                Dashboard.render();
                Toast.show('success', '✅', 'Uvezeno', 'Napredak je uvezen.');
            } else {
                Toast.show('error', '', 'Pogreška', 'Nevažeći JSON');
            }
        } catch (e) {
            Toast.show('error', '', 'Pogreška', 'Nevažeći JSON');
        }
    };
    reader.readAsText(file);
}

// PWA beforeinstall prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    __deferredInstallPrompt = e;
    const btn = document.getElementById('install-app');
    if (btn) btn.classList.remove('hidden');
});

// Register service worker (if available)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service worker registered');
    }).catch(() => {});
}


// =============================================================================
// 13. ACHIEVEMENTS VIEW
// =============================================================================

const AchievementsView = (() => {
    function render() {
        Router.go('achievements');
        const grid = document.getElementById('achievement-grid');
        if (!grid) return;
        grid.innerHTML = '';

        CURRICULUM.achievements.forEach(a => {
            const unlocked = state.unlockedAchievements.includes(a.id);
            const card = document.createElement('div');
            card.className = 'achievement-card ' + (unlocked ? 'unlocked' : 'locked');
            card.innerHTML = `
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${unlocked ? a.desc : '???'}</div>
            `;
            grid.appendChild(card);
        });
    }

    return { render };
})();


// =============================================================================
// 13b. WATCHING GUIDE VIEW
// =============================================================================

const WatchingGuideView = (() => {
    function render() {
        Router.go('watching-guide');
        const container = document.getElementById('watching-guide-content');
        if (!container || !CURRICULUM.watchingGuide) return;

        const guide = CURRICULUM.watchingGuide;
        let html = `<p class="watching-tip" style="margin-bottom:1.5rem;">${escapeHTML(guide.intro)}</p>`;

        guide.phases.forEach(phase => {
            html += `<div class="watching-phase">`;
            html += `<div class="watching-phase-title">${phase.icon} ${escapeHTML(phase.title)}</div>`;
            html += `<div class="watching-phase-desc">${escapeHTML(phase.description)}</div>`;

            if (phase.tips && phase.tips.length) {
                html += `<ul style="margin:0.5rem 0 0.5rem 1.2rem;">`;
                phase.tips.forEach(tip => { html += `<li class="watching-tip">${escapeHTML(tip)}</li>`; });
                html += `</ul>`;
            }

            if (phase.recommended && phase.recommended.length) {
                html += `<div style="margin-top:0.5rem;font-weight:600;color:var(--accent);">Preporučeno:</div>`;
                html += `<ul style="margin:0.25rem 0 0 1.2rem;">`;
                phase.recommended.forEach(r => { html += `<li>${escapeHTML(r)}</li>`; });
                html += `</ul>`;
            }

            html += `</div>`;
        });

        container.innerHTML = html;
    }

    return { render };
})();


// =============================================================================
// 14. GAMIFICATION — XP, levels, achievements, streaks
// =============================================================================

const Gamification = (() => {
    function addXP(amount) {
        state.xp += amount;
        // Only award coins on first-time completion, NOT in practice mode
        if (!state.isPracticeMode) {
            state.coins += Math.ceil(amount / 2);
        }

        // Daily XP tracking
        const today = new Date().toDateString();
        if (state.lastPracticeDate !== today) {
            state.dailyXpEarned = 0;
        }
        state.dailyXpEarned = (state.dailyXpEarned || 0) + amount;
        state.lastPracticeDate = today;

        // Check level up
        const levels = CURRICULUM.levels;
        for (let i = levels.length - 1; i >= 0; i--) {
            if (state.xp >= levels[i].xpRequired) {
                if (state.level < levels[i].level) {
                    state.level = levels[i].level;
                    Toast.show('achievement', '🏆', `Razina ${state.level}!`, levels[i].title);
                    Confetti.start();
                    if (typeof SFX !== 'undefined') SFX.play('levelup');
                    ActivityLog.log('xp', 'Level up: ' + state.level);
                }
                break;
            }
        }
        Storage.save();
        updateUI();
    }

    function updateUI() {
        setText('header-xp', state.xp);
        setText('header-streak', state.streak);
        setText('header-level', state.level);
        setText('header-coins', state.coins || 0);
        setText('sidebar-level', state.level);
        setText('sidebar-xp', state.xp);

        // XP bar
        const levels = CURRICULUM.levels;
        const currentLvl = levels.find(l => l.level === state.level) || levels[0];
        const nextLvl = levels.find(l => l.level === state.level + 1);
        const xpInLevel = state.xp - currentLvl.xpRequired;
        const xpNeeded = nextLvl ? (nextLvl.xpRequired - currentLvl.xpRequired) : 1;
        const pct = nextLvl ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;

        const bar = document.getElementById('sidebar-xp-bar');
        const nextEl = document.getElementById('sidebar-xp-next');
        if (bar) bar.style.width = pct + '%';
        if (nextEl) nextEl.textContent = nextLvl ? nextLvl.xpRequired : '∞';

        // Animate XP change
        const xpEl = document.getElementById('header-xp');
        if (xpEl) { xpEl.classList.remove('xp-pop'); void xpEl.offsetWidth; xpEl.classList.add('xp-pop'); }
    }

    function checkStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (state.lastPracticeDate === today) {
            // Already practiced today — streak maintained
        } else if (state.lastPracticeDate === yesterday) {
            // Practiced yesterday — streak continues
            state.streak++;
            Storage.save();
        } else if (state.lastPracticeDate && state.lastPracticeDate !== today) {
            // Missed a day — reset streak
            state.streak = 0;
            Storage.save();
        }

        updateUI();
    }

    function checkAchievements() {
        CURRICULUM.achievements.forEach(a => {
            if (state.unlockedAchievements.includes(a.id)) return;

            let unlocked = false;
            switch (a.condition) {
                case 'firstPhrase':      unlocked = state.phrasesHeard.length >= 1; break;
                case 'firstLesson':      unlocked = state.completedLessons.length >= 1; break;
                case 'perfectExercise':  unlocked = false; /* set manually in Results */ break;
                case 'streak3':          unlocked = state.streak >= 3; break;
                case 'streak7':          unlocked = state.streak >= 7; break;
                case 'streak14':         unlocked = state.streak >= 14; break;
                case 'mic5':             unlocked = state.micUseCount >= 5; break;
                case 'phrases20':        unlocked = state.phrasesLearned.length >= 20; break;
                case 'phrases50':        unlocked = state.phrasesLearned.length >= 50; break;
                case 'lessons3':         unlocked = state.completedLessons.length >= 3; break;
                case 'lessons7':         unlocked = state.completedLessons.length >= 7; break;
                case 'lessons10':        unlocked = state.completedLessons.length >= 10; break;
                case 'lessons13':        unlocked = state.completedLessons.length >= 13; break;
                case 'lessons15':        unlocked = state.completedLessons.length >= 15; break;
                case 'lessons18':        unlocked = state.completedLessons.length >= 18; break;
                case 'lessonL2':         unlocked = state.completedLessons.includes('L2'); break;
                case 'lessonL4':         unlocked = state.completedLessons.includes('L4'); break;
                case 'lessonL5':         unlocked = state.completedLessons.includes('L5'); break;
                case 'lessonL8':         unlocked = state.completedLessons.includes('L8'); break;
                case 'lessonL10':        unlocked = state.completedLessons.includes('L10'); break;
                case 'lessonL14':        unlocked = state.completedLessons.includes('L14'); break;
                case 'lessonL15':        unlocked = state.completedLessons.includes('L15'); break;
                case 'lessonL16':        unlocked = state.completedLessons.includes('L16'); break;
                case 'lessonL17':        unlocked = state.completedLessons.includes('L17'); break;
                case 'lessonL18':        unlocked = state.completedLessons.includes('L18'); break;
                case 'phrases75':        unlocked = state.phrasesLearned.length >= 75; break;
                case 'xp500':            unlocked = state.xp >= 500; break;
                case 'xp1000':           unlocked = state.xp >= 1000; break;
                // New achievements
                case 'firstPurchase':    unlocked = (state.purchasedItems || []).length >= 1; break;
                case 'purchases6':       unlocked = (state.purchasedItems || []).length >= 6; break;
                case 'purchases12':      unlocked = (state.purchasedItems || []).length >= 12; break;
                case 'perfectDrill': {
                    const ds = JSON.parse(localStorage.getItem('engleski_drill_scores') || '{}');
                    unlocked = Object.values(ds).some(s => s === 100);
                    break;
                }
                case 'perfectDrills6': {
                    const ds2 = JSON.parse(localStorage.getItem('engleski_drill_scores') || '{}');
                    unlocked = Object.values(ds2).filter(s => s === 100).length >= 6;
                    break;
                }
                case 'firstMemoryMatch': unlocked = (state.memoryMatchDone || 0) >= 1; break;
                case 'memoryMatch5':     unlocked = (state.memoryMatchDone || 0) >= 5; break;
                case 'answers50':        unlocked = (state.totalCorrectAnswers || 0) >= 50; break;
                case 'answers200':       unlocked = (state.totalCorrectAnswers || 0) >= 200; break;
                case 'streak30':         unlocked = state.streak >= 30; break;
                case 'xp2500':           unlocked = state.xp >= 2500; break;
                case 'xp5000':           unlocked = state.xp >= 5000; break;
            }

            if (unlocked) {
                state.unlockedAchievements.push(a.id);
                addXP(a.xp);
                Storage.save();
                Modal.showAchievement(a);
            }
        });
    }

    return { addXP, updateUI, checkStreak, checkAchievements };
})();


// =============================================================================
// 14b. MARKETPLACE — Coin-based knowledge shop
// =============================================================================

const Marketplace = (() => {
    const items = [
        {
            id: 'M1', name: '🧠 Chunking Drill', cost: 50, type: 'drill',
            desc: 'Grupiranje riječi u smislene cjeline. Vježbajte prepoznavanje cijelih fraza umjesto pojedinačnih riječi.',
            tutorial: ['Chunking je tehnika grupiranja riječi u smislene blokove.', 'Umjesto "I / would / like / a / coffee" → pamtite "I would like" kao jednu cjelinu.', 'Ova vježba trenira prepoznavanje pravih engleskih fraza — ne prevodite riječ po riječ!'],
            drill: {
                instruction: 'Koja opcija je ISPRAVNA cijela fraza? (Ne prevodite riječ po riječ!)',
                questions: [
                    { q: 'Kako reći "Htio bih kavu"?', options: ['I would liking coffee', 'I would like a coffee', 'I want have coffee', 'Coffee I would like'], correct: 1 },
                    { q: 'Kako reći "Gdje je izlaz"?', options: ['Where exit is?', 'Where is the exit?', 'The exit where?', 'Is where exit?'], correct: 1 },
                    { q: 'Kako reći "Koliko košta"?', options: ['How many cost?', 'What price this?', 'How much does this cost?', 'This cost how much?'], correct: 2 },
                    { q: 'Kako reći "Imam rezervaciju"?', options: ['I am reservation', 'I have a reservation', 'Reservation I have', 'My reservation is'], correct: 1 },
                    { q: 'Kako reći "Mogu li vidjeti jelovnik"?', options: ['Can I see the menu?', 'Menu I can see?', 'Give me see menu', 'I seeing menu can?'], correct: 0 },
                ]
            }
        },
        {
            id: 'M2', name: '🔄 Etimologija Quiz', cost: 75, type: 'drill',
            desc: 'Prepoznajte engleske riječi koristeći latinske/hrvatske korijene. Jezici su povezaniji nego mislite!',
            tutorial: ['Etimologija otkriva KORIJENE riječi — latinski, grčki, germanski.', 'Mnoge engleske riječi dolaze iz istih korijena kao i hrvatske!', 'Npr. "international" = inter (među) + nation (narod) = Međunarodni. Rastavite riječ i pogodite značenje!'],
            drill: {
                instruction: 'Pogodite značenje engleske riječi na temelju korijena:',
                questions: [
                    { q: '"International" — "inter" (među) + "nation" (narod). Što znači?', options: ['Nacionalni', 'Unutarnji', 'Međunarodni', 'Prirodni'], correct: 2 },
                    { q: '"Export" — "ex" (van) + "port" (nositi). Što znači?', options: ['Uvoz', 'Izvoz', 'Transport', 'Prijevoz'], correct: 1 },
                    { q: '"Submarine" — "sub" (pod) + "marine" (morski). Što je to?', options: ['Brod', 'Podmornica', 'Pristanište', 'Plutača'], correct: 1 },
                    { q: '"Bicycle" — "bi" (dva) + "cycle" (krug/kotač). Što je to?', options: ['Automobil', 'Tricikl', 'Bicikl', 'Motocikl'], correct: 2 },
                    { q: '"Invisible" — "in" (ne) + "visible" (vidljiv). Što znači?', options: ['Vidljiv', 'Nevidljiv', 'Nestabilan', 'Nepobjediv'], correct: 1 },
                ]
            }
        },
        {
            id: 'M3', name: '🎯 Speed Recall', cost: 100, type: 'drill',
            desc: 'Brzo prisjećanje — odgovorite u 5 sekundi! Trenira automatske reakcije na engleskom.',
            tutorial: ['Speed Recall trenira AUTOMATSKE reakcije — odgovaranje bez razmišljanja.', 'Imate samo 5 sekundi po pitanju! ⏱️', 'Cilj: da vam engleski postane instinktivan, kao materinski jezik.'],
            drill: {
                instruction: '⏱️ Što znači ova fraza? Odgovorite brzo!',
                timed: true,
                questions: [
                    { q: '"Excuse me" znači...', options: ['Oprosti/Oprostite', 'Izlaz', 'Vježba', 'Primjer'], correct: 0 },
                    { q: '"Turn left" znači...', options: ['Skrenite desno', 'Idite ravno', 'Skrenite lijevo', 'Okrenite se'], correct: 2 },
                    { q: '"The check, please" znači...', options: ['Provjeri, molim', 'Račun, molim', 'Ček, molim', 'Označite, molim'], correct: 1 },
                    { q: '"I missed my train" znači...', options: ['Volim vlakove', 'Propustio sam vlak', 'Moj vlak je lijep', 'Nemam vlak'], correct: 1 },
                    { q: '"Is this seat taken?" znači...', options: ['Je li ovo sjedište skupo?', 'Je li ovo sjedalo zauzeto?', 'Je li ovo vaše mjesto?', 'Mogu li sjesti?'], correct: 1 },
                    { q: '"No sugar, thank you" znači...', options: ['Nema šećera, hvala', 'Bez šećera, hvala', 'Šećer, hvala', 'Koliko šećera?'], correct: 1 },
                ]
            }
        },
        {
            id: 'M4', name: '💡 Vizualna Asocijacija', cost: 50, type: 'drill',
            desc: 'Povežite englesku riječ sa slikom/situacijom. Vizualno pamćenje je najjače pamćenje!',
            tutorial: ['Vizualna asocijacija koristi SLIKE za pamćenje riječi.', 'Zamislite situaciju — zeleni znak iznad vrata = EXIT.', 'Ovo je dokazano najjači način pamćenja — 65% ljudi su vizualni učenici!'],
            drill: {
                instruction: 'Koja riječ najbolje odgovara opisu situacije?',
                questions: [
                    { q: '🚪 Zeleni znak iznad vrata u zgradi:', options: ['Entrance', 'Exit', 'Emergency', 'Elevator'], correct: 1 },
                    { q: '💊 Zgrada s lijekovima i tabletama:', options: ['Hospital', 'Pharmacy', 'Clinic', 'Laboratory'], correct: 1 },
                    { q: '🛂 Šalter na aerodromu prije leta:', options: ['Gate', 'Check-in counter', 'Baggage claim', 'Security'], correct: 1 },
                    { q: '🍽️ Papir koji dobijete nakon jela u restoranu:', options: ['Menu', 'Recipe', 'The check', 'Tip'], correct: 2 },
                    { q: '🚌 Mjesto gdje čekate autobus:', options: ['Bus stop', 'Bus station', 'Platform', 'Terminal'], correct: 0 },
                ]
            }
        },
        {
            id: 'M5', name: '🗣️ Izgovori Točno', cost: 75, type: 'drill',
            desc: 'Trenirajte izgovor najčešće krivo izgovorenih riječi. Strogi test — samo točan izgovor prolazi!',
            tutorial: ['Izgovor engleskog je POTPUNO drugačiji od pisanja.', '"Island" se čita AJ-lend (s je tiho!), "recipe" se čita RE-si-pi.', 'Ova vježba testira poznajete li PRAVI američki izgovor — bez kompromisa!'],
            drill: {
                instruction: 'Koji je TOČAN izgovor ove engleske riječi?',
                questions: [
                    { q: 'Kako se izgovara "three"?', options: ['FRII', 'TRII', 'SRII', 'DRII'], correct: 1 },
                    { q: 'Kako se izgovara "water"?', options: ['VA-TER', 'VOO-TER', 'WAH-ter', 'VEJ-TER'], correct: 2 },
                    { q: 'Kako se izgovara "comfortable"?', options: ['KOM-for-ta-bl', 'KAMF-ter-bl', 'KOM-FOO-ta-bl', 'KON-for-tebl'], correct: 1 },
                    { q: 'Kako se izgovara "recipe"?', options: ['RE-sajp', 'RE-si-pi', 'RI-kajp', 'RE-sip'], correct: 1 },
                    { q: 'Kako se izgovara "island"?', options: ['IS-land', 'AJ-land', 'AJ-lend', 'IZ-land'], correct: 2 },
                    { q: 'Kako se izgovara "schedule" (američki)?', options: ['SKED-jul', 'ŠED-jul', 'SKE-dul', 'ŠE-dul'], correct: 0 },
                ]
            }
        },
        {
            id: 'M6', name: '🧩 Word Families', cost: 100, type: 'drill',
            desc: 'Iz jednog korijena — 4 riječi! Naučite prepoznavati oblike iste riječi.',
            tutorial: ['Word Families pokazuju kako se iz JEDNE riječi rade ČETIRI.', 'help → helpful (koristan), helpless (bespomoćan), helper (pomagač), unhelpful (nekoristan).', 'Kad naučite obitelj — znate 4x više riječi odjednom!'],
            drill: {
                instruction: 'Koja riječ PRIPADA istoj obitelji?',
                questions: [
                    { q: 'help → helpful, helpless, helper. Što je "unhelpful"?', options: ['Jako koristan', 'Bespomoćan', 'Nekoristan', 'Pomagač'], correct: 2 },
                    { q: 'beauty → beautiful. Što je "beautifully"?', options: ['Ljepota', 'Lijep', 'Lijepo (prilog)', 'Uljepšati'], correct: 2 },
                    { q: 'care → careful, careless. Što je "carelessly"?', options: ['Pažljivo', 'Nepažljivo', 'Brižno', 'Bezbrižnost'], correct: 1 },
                    { q: 'success → successful. Što je "unsuccessfully"?', options: ['Uspješno', 'Neuspješno', 'Uspjeh', 'Uspješan'], correct: 1 },
                    { q: 'happy → happiness, unhappy. Što je "unhappiness"?', options: ['Sreća', 'Nesreća', 'Nesretno', 'Sretan'], correct: 1 },
                ]
            }
        },
        {
            id: 'M7', name: '🌍 Američki Slang Test', cost: 150, type: 'drill',
            desc: '20 pravih slengovskih fraza. Test je strog — morate znati točno značenje!',
            tutorial: ['Američki sleng se NE uči iz udžbenika — uči se iz života!', '"Grab a bite" = pojesti nešto, "Hit the road" = krenuti na put.', 'Bez slenga NE možete razumjeti prave Amerikance. Ovo je pravi test!'],
            drill: {
                instruction: 'Što znači ovaj američki sleng?',
                questions: [
                    { q: '"I\'m gonna grab a bite" znači:', options: ['Uhvatit ću ugriz', 'Idem nešto pojesti', 'Idem u trgovinu', 'Idem na spavanje'], correct: 1 },
                    { q: '"That\'s a piece of cake" znači:', options: ['To je torta', 'To je lako', 'To je skupo', 'To je ukusno'], correct: 1 },
                    { q: '"Let\'s hit the road" znači:', options: ['Udarimo cestu', 'Krenimo na put', 'Popravimo cestu', 'Prijeđimo cestu'], correct: 1 },
                    { q: '"Break a leg!" znači:', options: ['Pazi da ne padneš', 'Slomi nogu', 'Sretno!', 'Budi oprezan'], correct: 2 },
                    { q: '"It costs an arm and a leg" znači:', options: ['Skupo je', 'Boli', 'Besplatno je', 'Fizički je teško'], correct: 0 },
                    { q: '"I\'m feeling under the weather" znači:', options: ['Hladno mi je', 'Loše se osjećam', 'Volim kišu', 'Umoran sam od posla'], correct: 1 },
                    { q: '"No worries" znači:', options: ['Imam briga', 'Nemoj brinuti/Nema na čemu', 'Ne znam', 'Problem!'], correct: 1 },
                    { q: '"Wanna hang out?" znači:', options: ['Hoćeš objesiti?', 'Hoćeš li se družiti?', 'Jesi li vani?', 'Ideš van?'], correct: 1 },
                ]
            }
        },
        {
            id: 'M8', name: '📊 80/20 Brzi Test', cost: 50, type: 'drill',
            desc: '800 najčešćih engleskih riječi pokriva 75% govora. Znate li najvažnije?',
            tutorial: ['Pareto princip: 20% riječi pokriva 80% razgovora!', 'Riječi poput "because", "between", "enough" su KLJUČNE.', 'Ovaj test provjerava poznajete li najbitnije engleske riječi.'],
            drill: {
                instruction: 'Prevedite ovu KLJUČNU englesku riječ:',
                questions: [
                    { q: '"Because" znači:', options: ['Prije', 'Jer/Zato što', 'Ali', 'Osim'], correct: 1 },
                    { q: '"Between" znači:', options: ['Iza', 'Iznad', 'Između', 'Ispod'], correct: 2 },
                    { q: '"Already" znači:', options: ['Uvijek', 'Već', 'Gotovo', 'Skoro'], correct: 1 },
                    { q: '"Enough" znači:', options: ['Mnogo', 'Malo', 'Dovoljno', 'Previše'], correct: 2 },
                    { q: '"Although" znači:', options: ['Također', 'Iako/Premda', 'Uvijek', 'Čak'], correct: 1 },
                ]
            }
        },
        {
            id: 'M9', name: '🔊 Minimal Pairs', cost: 100, type: 'drill',
            desc: 'Parovi riječi koje zvuče slično ali imaju potpuno različito značenje. Morate ih razlikovati!',
            tutorial: ['Minimal Pairs su riječi koje zvuče GOTOVO isto ali imaju POTPUNO različito značenje.', '"ship" (brod) vs "sheep" (ovca) — razlika je u jednom zvuku!', 'Ovo je kritično za razumijevanje — jedan krivi zvuk = totalno krivo značenje.'],
            drill: {
                instruction: 'Koja riječ ima DRUGAČIJE značenje? Pažljivo čitajte!',
                questions: [
                    { q: '"ship" vs "sheep" — Što je "ship"?', options: ['Ovca', 'Brod', 'Oblik', 'Dućan'], correct: 1 },
                    { q: '"bit" vs "beat" — Što je "beat"?', options: ['Komadić', 'Udariti/Pobijediti', 'Gorko', 'Mali'], correct: 1 },
                    { q: '"pull" vs "pool" — Što je "pool"?', options: ['Vući', 'Bazen', 'Stup', 'Pravilo'], correct: 1 },
                    { q: '"three" vs "tree" — Što je "tree"?', options: ['Tri', 'Stablo', 'Besplatno', 'Probati'], correct: 1 },
                    { q: '"think" vs "sink" — Što je "sink"?', options: ['Misliti', 'Sudoper/Potonuti', 'Smrditi', 'Pjevati'], correct: 1 },
                    { q: '"beach" vs "bitch" — Što je "beach"?', options: ['Plaža', 'Klupa', 'Grana', 'Breza'], correct: 0 },
                ]
            }
        },
        {
            id: 'M10', name: '✈️ Survival Phrases', cost: 200, type: 'drill',
            desc: 'Kritične fraze za preživljavanje u SAD-u. Strogi test — morate 100% znati svaku!',
            tutorial: ['Survival Phrases su fraze koje MORATE znati za sigurnost u Americi.', '911 = hitna pomoć. "I am allergic to..." = Alergičan sam na...', 'Ove fraze mogu spasiti život. Morate ih znati NAPAMET — 100% bez greške!'],
            drill: {
                instruction: 'Prevedite ovu frazu za preživljavanje u Americi:',
                questions: [
                    { q: 'Kako reći "Zovite hitnu pomoć"?', options: ['Call the police', 'Call 911', 'Call the hospital', 'Call an ambulance'], correct: 1 },
                    { q: 'Kako reći "Alergičan sam na kikiriki"?', options: ['I don\'t like peanuts', 'I am allergic to peanuts', 'Peanuts make me sick', 'No peanuts'], correct: 1 },
                    { q: 'Kako reći "Gdje je najbliža bolnica"?', options: ['Where is the nearest hospital?', 'Hospital where near?', 'I need hospital near', 'How far is hospital?'], correct: 0 },
                    { q: 'Kako reći "Izgubio sam putovnicu"?', options: ['My passport is gone', 'I lost my passport', 'Passport I don\'t have', 'Where is my passport?'], correct: 1 },
                    { q: 'U drive-through: "Želim veliku kolu bez leda"', options: ['Big cola no ice', 'A large Coke, no ice, please', 'Cola large without ice', 'I want big cola ice no'], correct: 1 },
                    { q: 'Kako reći "Ne razumijem, možete li ponoviti?"', options: ['I don\'t understand. Can you repeat that?', 'No understand. Repeat!', 'What you say?', 'Again please talk'], correct: 0 },
                    { q: 'Kako reći "Trebam odvjetnika"?', options: ['I need a judge', 'I want the police', 'I need a lawyer', 'I need help legal'], correct: 2 },
                ]
            }
        },
        {
            id: 'M11', name: '🧠 Morfološka Mapa', cost: 75, type: 'drill',
            desc: 'Prefiks + korijen + sufiks = nova riječ. Rastavite riječ i pogodite značenje!',
            tutorial: ['Morfologija = znanost o oblicima riječi. Pre + fiks + sufiks.', 'un- (ne) + comfort (udobnost) + -able (mogući) = uncomfortable (neudoban).', 'Kad naučite 10 prefiksa i 10 sufiksa — možete pogoditi tisuće novih riječi!'],
            drill: {
                instruction: 'Rastavljanje riječi na dijelove — pogodite značenje:',
                questions: [
                    { q: '"un-" znači "ne". Što je "uncomfortable"?', options: ['Udoban', 'Neudoban', 'Normalan', 'Kompliciran'], correct: 1 },
                    { q: '"-ful" znači "pun". Što je "wonderful"?', options: ['Čudan', 'Prekrasan/Divan', 'Užasan', 'Zabavan'], correct: 1 },
                    { q: '"re-" znači "ponovo". Što je "rebuild"?', options: ['Srušiti', 'Ponovno sagraditi', 'Graditi', 'Planirati'], correct: 1 },
                    { q: '"dis-" znači "ne/suprotno". Što je "disagree"?', options: ['Složiti se', 'Ne složiti se', 'Raspraviti', 'Pokajati se'], correct: 1 },
                    { q: '"-less" znači "bez". Što je "homeless"?', options: ['Kućni', 'Bez kuće/Beskućnik', 'Domaći', 'Bezopasan'], correct: 1 },
                ]
            }
        },
        {
            id: 'M12', name: '🎮 Idiomi Challenge', cost: 200, type: 'drill',
            desc: 'Najteži test! Američki idiomi koji nemaju doslovan prijevod. Možete li ih savladati?',
            tutorial: ['Idiomi su fraze čije značenje NE MOŽETE pogoditi iz pojedinačnih riječi.', '"Raining cats and dogs" NE znači da padaju mačke! Znači: jako kiši.', 'Ovo je NAJTEŽJI test — samo pravi poznavatelji engleskog prolaze!'],
            drill: {
                instruction: 'Što znači ovaj američki idiom? Razmislite pažljivo!',
                questions: [
                    { q: '"It\'s raining cats and dogs" znači:', options: ['Životinje padaju', 'Jako kiši/Lije kao iz kabla', 'Mačke i psi se svađaju', 'Čudno vrijeme'], correct: 1 },
                    { q: '"Bite the bullet" znači:', options: ['Pojesti metak', 'Hrabro se suočiti s nečim teškim', 'Pucati', 'Prestati jesti'], correct: 1 },
                    { q: '"Spill the beans" znači:', options: ['Prosuti grah', 'Otkriti tajnu', 'Napraviti nered', 'Kuhati'], correct: 1 },
                    { q: '"Under the table" (sleng) znači:', options: ['Ispod stola', 'Na crno/Neslužbeno', 'Skriveno', 'Jeftino'], correct: 1 },
                    { q: '"Call it a day" znači:', options: ['Nazvati dan', 'Završiti s radom za danas', 'Dobar dan!', 'Telefonirati'], correct: 1 },
                    { q: '"The ball is in your court" znači:', options: ['Lopta je kod vas', 'Sada je vaš red/Na vama je', 'Igrajmo tenis', 'Idemo na sud'], correct: 1 },
                    { q: '"Once in a blue moon" znači:', options: ['Kad je plavi mjesec', 'Vrlo rijetko', 'Jednom mjesečno', 'Noću'], correct: 1 },
                    { q: '"Pull someone\'s leg" znači:', options: ['Povući nekome nogu', 'Šaliti se s nekim', 'Ometati nekoga', 'Pomoći nekome'], correct: 1 },
                ]
            }
        },
    ];

    function render() {
        Router.go('marketplace');
        const container = document.getElementById('marketplace-content');
        if (!container) return;

        let html = '<div class="marketplace-grid">';
        items.forEach(item => {
            const purchased = (state.purchasedItems || []).includes(item.id);
            const drillScore = purchased ? getdrillScore(item.id) : null;
            const canAfford = state.coins >= item.cost;
            html += `
                <div class="marketplace-item ${purchased ? 'purchased' : ''} ${!canAfford && !purchased ? 'cant-afford' : ''}">
                    <div class="marketplace-item-header">
                        <span class="marketplace-item-name">${item.name}</span>
                        ${purchased ? '<span class="marketplace-owned">✅ Kupljeno</span>' : `<span class="marketplace-cost">🪙 ${item.cost}</span>`}
                    </div>
                    <p class="marketplace-item-desc ${purchased ? 'expanded' : 'collapsed'}">${item.desc}</p>
                    ${purchased && drillScore !== null ? `<div class="marketplace-drill-score">Najbolji rezultat: <strong>${drillScore}%</strong></div>` : ''}
                    ${purchased ? `<button class="btn btn-primary marketplace-start-drill" data-item-id="${item.id}">▶ Započni vježbu</button>` : ''}
                    ${!purchased ? `<button class="marketplace-expand-btn" data-item-id="${item.id}">Prikaži više ▼</button>` : ''}
                    ${!purchased ? `<button class="btn btn-primary marketplace-buy-btn" data-item-id="${item.id}" data-cost="${item.cost}" ${!canAfford ? 'disabled' : ''}>
                        ${canAfford ? '🪙 Kupi' : '🔒 Nedovoljno novčića'}
                    </button>` : ''}
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;

        // Wire buy buttons
        container.querySelectorAll('.marketplace-buy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.itemId;
                const item = items.find(i => i.id === itemId);
                const cost = parseInt(btn.dataset.cost);
                if (state.coins >= cost) {
                    state.coins -= cost;
                    if (!state.purchasedItems) state.purchasedItems = [];
                    state.purchasedItems.push(itemId);
                    Storage.save();
                    Gamification.updateUI();
                    SFX.play('levelup');
                    Confetti.start();
                    showPurchaseTutorial(item);
                }
            });
        });

        // Wire expand/collapse buttons
        container.querySelectorAll('.marketplace-expand-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.marketplace-item');
                const desc = card.querySelector('.marketplace-item-desc');
                if (desc.classList.contains('collapsed')) {
                    desc.classList.remove('collapsed');
                    desc.classList.add('expanded');
                    btn.textContent = 'Prikaži manje ▲';
                } else {
                    desc.classList.remove('expanded');
                    desc.classList.add('collapsed');
                    btn.textContent = 'Prikaži više ▼';
                }
                SFX.play('click');
            });
        });

        // Wire drill start buttons
        container.querySelectorAll('.marketplace-start-drill').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = items.find(i => i.id === btn.dataset.itemId);
                if (item && item.drill) startDrill(item);
                SFX.play('click');
            });
        });
    }

    function getdrillScore(itemId) {
        const scores = JSON.parse(localStorage.getItem('engleski_drill_scores') || '{}');
        return scores[itemId] !== undefined ? scores[itemId] : null;
    }

    function saveDrillScore(itemId, pct) {
        const scores = JSON.parse(localStorage.getItem('engleski_drill_scores') || '{}');
        if (!scores[itemId] || pct > scores[itemId]) {
            scores[itemId] = pct;
            localStorage.setItem('engleski_drill_scores', JSON.stringify(scores));
        }
    }

    function showPurchaseTutorial(item) {
        const steps = item.tutorial || ['Novi modul je otključan!'];
        let step = 0;

        const overlay = document.createElement('div');
        overlay.className = 'purchase-tutorial-overlay';

        function renderStep() {
            overlay.innerHTML = `
                <div class="purchase-tutorial-modal">
                    <div class="purchase-tutorial-header">
                        <div class="purchase-unlock-icon">🎉</div>
                        <h2>Otključano: ${item.name}</h2>
                    </div>
                    <div class="purchase-tutorial-body">
                        <div class="purchase-tutorial-step-indicator">
                            ${steps.map((_, i) => `<span class="step-dot ${i === step ? 'active' : i < step ? 'done' : ''}"></span>`).join('')}
                        </div>
                        <p class="purchase-tutorial-text">${steps[step]}</p>
                    </div>
                    <div class="purchase-tutorial-actions">
                        ${step < steps.length - 1
                            ? '<button class="btn btn-primary purchase-tutorial-next">Dalje →</button>'
                            : '<button class="btn btn-primary purchase-tutorial-start">▶ Započni vježbu!</button><button class="btn btn-secondary purchase-tutorial-close">Kasnije</button>'
                        }
                    </div>
                </div>
            `;

            overlay.querySelector('.purchase-tutorial-next')?.addEventListener('click', () => {
                step++;
                renderStep();
                SFX.play('click');
            });
            overlay.querySelector('.purchase-tutorial-start')?.addEventListener('click', () => {
                overlay.remove();
                if (item.drill) startDrill(item);
            });
            overlay.querySelector('.purchase-tutorial-close')?.addEventListener('click', () => {
                overlay.remove();
                render();
            });
        }

        document.body.appendChild(overlay);
        renderStep();
    }

    function startDrill(item) {
        const drill = item.drill;
        const questions = [...drill.questions];
        let qIdx = 0, correct = 0;
        let timerInterval = null;

        const container = document.getElementById('marketplace-content');
        if (!container) return;

        function renderDrillQuestion() {
            if (qIdx >= questions.length) {
                finishDrill();
                return;
            }
            const q = questions[qIdx];
            const total = questions.length;

            let timerHtml = '';
            if (drill.timed) {
                timerHtml = '<div class="drill-timer" id="drill-timer">⏱️ <span id="drill-timer-count">5</span>s</div>';
            }

            container.innerHTML = `
                <div class="drill-container">
                    <div class="drill-header">
                        <span class="drill-name">${item.name}</span>
                        <span class="drill-progress">${qIdx + 1} / ${total}</span>
                    </div>
                    <div class="drill-progress-bar"><div class="drill-progress-fill" style="width:${((qIdx) / total) * 100}%"></div></div>
                    ${timerHtml}
                    <p class="drill-instruction">${drill.instruction}</p>
                    <h3 class="drill-question">${q.q}</h3>
                    <div class="drill-options"></div>
                    <div class="drill-feedback hidden" id="drill-feedback"></div>
                </div>
            `;

            const optContainer = container.querySelector('.drill-options');
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleDrillAnswer(i, q.correct, optContainer, btn));
                optContainer.appendChild(btn);
            });

            // Timer for timed drills
            if (drill.timed) {
                let seconds = 5;
                const countEl = container.querySelector('#drill-timer-count');
                if (timerInterval) clearInterval(timerInterval);
                timerInterval = setInterval(() => {
                    seconds--;
                    if (countEl) countEl.textContent = seconds;
                    if (seconds <= 0) {
                        clearInterval(timerInterval);
                        // Time's up — mark wrong
                        optContainer.querySelectorAll('.option-btn').forEach((btn, i) => {
                            btn.classList.add('disabled');
                            if (i === q.correct) btn.classList.add('reveal-correct');
                        });
                        const fb = container.querySelector('#drill-feedback');
                        if (fb) { fb.classList.remove('hidden'); fb.className = 'drill-feedback incorrect'; fb.textContent = '⏱️ Vrijeme je isteklo! Točan odgovor: ' + q.options[q.correct]; }
                        SFX.play('wrong');
                        setTimeout(() => { qIdx++; renderDrillQuestion(); }, 2000);
                    }
                }, 1000);
            }
        }

        function handleDrillAnswer(chosen, correctIdx, optContainer, clickedBtn) {
            if (timerInterval) clearInterval(timerInterval);

            // Disable all options
            optContainer.querySelectorAll('.option-btn').forEach((btn, i) => {
                btn.classList.add('disabled');
                if (i === correctIdx) btn.classList.add('reveal-correct');
            });

            const fb = container.querySelector('#drill-feedback');
            const isCorrect = chosen === correctIdx;

            if (isCorrect) {
                clickedBtn.classList.add('correct');
                correct++;
                if (fb) { fb.classList.remove('hidden'); fb.className = 'drill-feedback correct'; fb.textContent = '✅ Točno!'; }
                SFX.play('correct');
            } else {
                clickedBtn.classList.add('incorrect');
                if (fb) { fb.classList.remove('hidden'); fb.className = 'drill-feedback incorrect'; fb.textContent = '❌ Netočno! Točan odgovor: ' + questions[qIdx].options[correctIdx]; }
                SFX.play('wrong');
            }

            setTimeout(() => { qIdx++; renderDrillQuestion(); }, 1500);
        }

        function finishDrill() {
            if (timerInterval) clearInterval(timerInterval);
            const total = questions.length;
            const pct = Math.round((correct / total) * 100);
            saveDrillScore(item.id, pct);

            // Award XP based on score (but no coins — these are practice drills)
            const xpEarned = Math.round(pct / 10);
            if (xpEarned > 0) {
                state.isPracticeMode = true;
                Gamification.addXP(xpEarned);
                state.isPracticeMode = false;
            }

            container.innerHTML = `
                <div class="drill-results">
                    <div class="drill-results-icon">${pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '📝'}</div>
                    <h2 class="drill-results-title">${pct === 100 ? 'Savršeno!' : pct >= 70 ? 'Dobro!' : 'Pokušajte ponovo!'}</h2>
                    <div class="drill-results-score">${pct}%</div>
                    <p>${correct} od ${total} točnih</p>
                    <p class="drill-results-xp">+${xpEarned} XP</p>
                    ${pct < 100 ? '<p style="color:var(--rose);font-weight:600;">Vježbajte dok ne bude 100%!</p>' : '<p style="color:var(--green);font-weight:600;">Savladali ste ovu vježbu!</p>'}
                    <div class="drill-results-actions">
                        <button class="btn btn-primary" id="drill-retry">🔄 Ponovi</button>
                        <button class="btn btn-secondary" id="drill-back">← Natrag u trgovinu</button>
                    </div>
                </div>
            `;

            container.querySelector('#drill-retry')?.addEventListener('click', () => {
                qIdx = 0; correct = 0;
                renderDrillQuestion();
            });
            container.querySelector('#drill-back')?.addEventListener('click', () => render());

            if (pct >= 70) Confetti.start();
            ActivityLog.log('drill', `${item.name}: ${pct}% (${correct}/${total})`);
        }

        renderDrillQuestion();
    }

    return { render };
})();


// =============================================================================
// 15. TOAST — Notification system
// =============================================================================

const Toast = (() => {
    const correctMessages = [
        'Točan odgovor!', 'Bravo!', 'Savršeno!', 'Odličan posao!',
        'Na pravom ste putu!', 'Sjajno!', 'Fantastično!', 'Svaka čast!',
        'Nastavi tako!', 'Izvrsno!', 'Moćno!', 'Impresivno!',
        'Nema stajanja!', 'Oštro! 🔥', 'Maestralno!', 'Unstoppable!',
        'Genijalno!', 'Čista desetka!', 'Pogodak! 🎯', 'Kao profesionalac!',
        'Tata zna! 💪', 'Top forma!', 'Nečuveno dobro!', 'Bez greške!',
    ];
    let lastMsgIdx = -1;
    function getCorrectMessage() {
        let idx;
        do { idx = Math.floor(Math.random() * correctMessages.length); } while (idx === lastMsgIdx);
        lastMsgIdx = idx;
        return correctMessages[idx];
    }

    function show(type, icon, title, text, duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-text"><strong>${escapeHTML(title)}</strong>${text ? ' ' + escapeHTML(text) : ''}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('leaving');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    return { show, getCorrectMessage };
})();


// =============================================================================
// 16. MODAL — Achievement popup
// =============================================================================

const Modal = (() => {
    function showAchievement(achievement) {
        const overlay = document.getElementById('achievement-modal');
        if (!overlay) return;

        setText('modal-badge', achievement.icon);
        setText('modal-title', achievement.name);
        setText('modal-desc', achievement.desc);
        setText('modal-xp', '+' + achievement.xp + ' XP');

        overlay.classList.remove('hidden');
        Confetti.start();

        const closeBtn = document.getElementById('modal-close');
        const close = () => {
            overlay.classList.add('hidden');
            closeBtn.removeEventListener('click', close);
        };
        closeBtn.addEventListener('click', close);

        // Also close on Escape
        const escHandler = (e) => {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
        };
        document.addEventListener('keydown', escHandler);
    }

    return { showAchievement };
})();


// =============================================================================
// 17. CONFETTI — Celebration particles (canvas)
// =============================================================================

const Confetti = (() => {
    let canvas, ctx, particles, animId;
    const COLORS = ['#c9a84c', '#c17b4a', '#6d8b63', '#5b7fa5', '#b56576', '#e0c76e', '#d4956b'];

    function start() {
        canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.classList.add('active');

        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 200,
                w: 6 + Math.random() * 8,
                h: 4 + Math.random() * 6,
                vx: (Math.random() - 0.5) * 4,
                vy: 2 + Math.random() * 4,
                rot: Math.random() * 360,
                rotV: (Math.random() - 0.5) * 10,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
        }

        if (animId) cancelAnimationFrame(animId);
        animate();

        // Auto-stop after 3 seconds
        setTimeout(stop, 3000);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.rotV;
            p.vy += 0.1; // gravity

            if (p.y < canvas.height + 50) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            }
        });

        if (alive) {
            animId = requestAnimationFrame(animate);
        } else {
            stop();
        }
    }

    function stop() {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
        if (canvas) { canvas.classList.remove('active'); }
    }

    return { start };
})();


// =============================================================================
// HELPERS
// =============================================================================

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
}

function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function findPhraseById(phraseId) {
    for (const lesson of CURRICULUM.lessons) {
        const found = lesson.phrases.find(p => p.id === phraseId);
        if (found) return found;
    }
    return null;
}

function isLessonUnlocked(/* lessonId */) {
    // All lessons are now unlocked — user has full control
    return true;
}

function unlockNextLesson(completedId) {
    const idx = CURRICULUM.lessons.findIndex(l => l.id === completedId);
    if (idx < 0 || idx >= CURRICULUM.lessons.length - 1) return;
    const nextLesson = CURRICULUM.lessons[idx + 1];
    if (nextLesson.locked) {
        nextLesson.locked = false;
        Toast.show('info', '🔓', 'Nova lekcija!', `"${nextLesson.title}" je otključana!`);
    }
}


// =============================================================================
// ADAPTIVE ENGINE — Strict feedback, hints, smart skip
// =============================================================================

const AdaptiveEngine = (() => {
    let wrongByType = {};
    let correctStreakByType = {};
    let totalWrongSession = 0;

    function reset() {
        wrongByType = {};
        correctStreakByType = {};
        totalWrongSession = 0;
    }

    function recordCorrect(type) {
        if (!correctStreakByType[type]) correctStreakByType[type] = 0;
        correctStreakByType[type]++;
    }

    function recordWrong(type) {
        if (!wrongByType[type]) wrongByType[type] = 0;
        wrongByType[type]++;
        correctStreakByType[type] = 0;
        totalWrongSession++;
    }

    function shouldShowHint(type) {
        return (wrongByType[type] || 0) >= 2;
    }

    function shouldOfferSkip(type) {
        return (correctStreakByType[type] || 0) >= 3;
    }

    function getHintForType(type) {
        const hints = {
            'listen-choose': '🎧 SAVJET: Fokusirajte se na ZVUK, ne na slova. Slušajte frazu više puta pritiskom na play gumb. Obratite pažnju na naglasak i ritam — engleski ima drugačiju melodiju od hrvatskog.',
            'match-pairs': '🔗 SAVJET: Krenite od parova kojih ste SIGURNI. Tražite ključne riječi koje zvuče slično — "taxi" = "taksi", "hotel" = "hotel". Eliminacijom ćete naći ostale.',
            'situation': '🎭 SAVJET: ZAMISLITE SE u toj situaciji. Što bi LOGIČNO rekli? Razmislite o kontekstu — ne trebate razumjeti svaku riječ.',
            'spell': '✍️ SAVJET: Engleski se NE PIŠE kao što zvuči! To je normalno i teško. Koristite hint (pomoć). Najčešće greške: "th" (jezik između zuba), tiho "e" na kraju, udvojeni suglasnici.',
            'fill-blank': '📝 SAVJET: Pročitajte cijelu rečenicu NAGLAS. Članovi (a/the) su česti odgovori. "A" = jedan/neki, "the" = taj/određeni. Glagoli i prijedlozi su isto česti.',
            'error-fix': '🔍 SAVJET: Greške su često u ČLANOVIMA (a/the), REDU RIJEČI (engleski: subjekt + glagol + objekt) ili izostavljenim riječima. Usporedite s frazama iz lekcije.',
            'reorder': '🔀 SAVJET: Engleski redoslijed je UVIJEK: SUBJEKT + GLAGOL + OBJEKT. Primjer: "I would like coffee" — ne "I coffee like would". Počnite sa subjektom!',
            'true-false': '✅ SAVJET: Čitajte svaku riječ PAŽLJIVO! Male razlike u prijevodu potpuno mijenjaju značenje. "Hello" ≠ "Help". Usporedite sa lekcijom.',
            'pronunciation-trap': '🗣️ SAVJET: Najčešće greške Hrvata:\n• "W" NIJE isto kao naše "V" — zaoblite usne!\n• "TH" — jezik MORA biti između zuba\n• "R" je blaže, ne vibrirajuće kao naše "r"\n• Naglasak je ključan — krivi naglasak = nerazumijevanje',
            'image-choose': '🖼️ SAVJET: Pogledajte sliku pažljivo. Povežite vizualni prikaz s engleskim riječima koje ste naučili. Ako ne znate — isključite prijevod i razmislite o kontekstu.',
            'video-comprehension': '🎬 SAVJET: Pogledajte video VIŠE PUTA ako treba. Fokusirajte se na ključne riječi — ne morate razumjeti SVAKU riječ. Kontekst i ton glasa vam pomažu!',
            'dialogue': '💬 SAVJET: Zamislite razgovor U GLAVI. Što bi logičan odgovor bio? Razmislite o kontekstu — tko pita, o čemu. Eliminirajte nelogične odgovore.',
            'dictation': '🎧 SAVJET: Slušajte VIŠE PUTA. Krenite od riječi koje SIGURNO prepoznajete. Ne brinite za pravopis — fokus je na razumijevanje. Koristite "Sporije" gumb!',
            'context-guess': '🧠 SAVJET: Pročitajte CIJELU rečenicu, ne samo označenu riječ. Kontekst = ključ! Koja opcija ima SMISLA u toj situaciji? Eliminirajte nelogične odgovore.',
            'minimal-pairs': '🎧 SAVJET: Fokusirajte se na PRVI zvuk riječi. Pustite zvuk VIŠE PUTA. TH vs T, R vs L, W vs V — ovo su kritične razlike za Hrvate!',
            'story-sequence': '📖 SAVJET: Tražite logičan slijed — što se MORA dogoditi PRIJE nečeg drugog? "Enter" > "Order" > "Eat" > "Pay". Koristite zdrav razum!',
            'role-play': '🎭 SAVJET: Zamislite se DOSLOVNO u toj situaciji. Što bi PRISTOJNO i LOGIČNO rekli? Eliminirajte nebitne odgovore.',
            'error-detect': '🔍 SAVJET: Čitajte riječ po riječ NAGLAS. Kad čujete grešku, kliknite na nju. Najčešće greške: krivi oblik glagola, krivi član (a/the), krivi red riječi.',
            'shadowing': '🗣️ SAVJET: NE pokušavajte biti savršeni! Cilj je RITAM i MELODIJA. Slušajte → odmah ponavljajte. Brzina dolazi s praksom.',
        };
        return hints[type] || '💡 SAVJET: Polako pročitajte pitanje. Greške su normalne, ali ih NE PONAVLJAJTE. Vratite se na lekciju ako niste sigurni.';
    }

    function getStrictFeedback(wrongText, correctText) {
        const messages = [
            `❌ KRIVO! Vaš odgovor "${wrongText}" je POGREŠAN. Točan odgovor: "${correctText}".`,
            `⛔ NETOČNO! Zapamtite: "${correctText}" je ispravan odgovor. U pravom razgovoru ovo bi bio nesporazum!`,
            `🚫 POGREŠNO! "${wrongText}" je krivo. Ispravan odgovor: "${correctText}". Obratite pažnju!`,
            `❌ NE! Nemojte ovo miješati. "${correctText}" je jedini ispravan odgovor.`,
            `⛔ GREŠKA! "${wrongText}" ≠ "${correctText}". Zapamtite razliku — ovo MORATE znati!`,
        ];
        let base = messages[Math.floor(Math.random() * messages.length)];
        if (totalWrongSession >= 4) {
            base += '\n\n⚠️ Više puta ste pogriješili. USPORITE. Pažljivo pročitajte pitanje PRIJE nego kliknete.';
        }
        return base;
    }

    function getMotivationalFeedback() {
        const msgs = [
            'Točno! 🎉 Svaka čast!',
            'BRAVO! 🌟 Odlično pamtite!',
            'Savršeno! 💪 Nastavi tako!',
            'Da! 🎯 Točan odgovor!',
            'Točno! 🏆 Sve bolje i bolje!',
            'SUPER! ✅ Zapamtili ste!',
            'Bravo! 🌟 Ovo znate!',
            'Odlično! 💪 Na pravom ste putu!',
        ];
        return msgs[Math.floor(Math.random() * msgs.length)];
    }

    return { reset, recordCorrect, recordWrong, shouldShowHint, shouldOfferSkip, getHintForType, getStrictFeedback, getMotivationalFeedback };
})();


// =============================================================================
// SETTINGS — Dark mode, font size, TTS speed, high contrast
// =============================================================================

const Settings = (() => {
    const SETTINGS_KEY = 'engleski_settings_v1';

    const defaults = {
        darkMode: false,
        fontScale: 'medium',
        highContrast: false,
        ttsSpeed: 1.0,
    };

    let settings = { ...defaults };

    function load() {
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                Object.keys(defaults).forEach(k => {
                    if (k in saved) settings[k] = saved[k];
                });
            }
        } catch (e) { /* corrupted — use defaults */ }
        apply();
    }

    function save() {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (e) { /* quota exceeded */ }
    }

    function apply() {
        const html = document.documentElement;
        // Dark mode
        html.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.content = settings.darkMode ? '#1a1a2e' : '#f5f0e8';

        // Font scale
        html.setAttribute('data-fontscale', settings.fontScale);

        // High contrast
        if (settings.highContrast) {
            html.setAttribute('data-contrast', 'high');
        } else {
            html.removeAttribute('data-contrast');
        }

        // SFX
        if (typeof SFX !== 'undefined') SFX.toggle(settings.sfxEnabled !== false);

        // Particles
        const canvas = document.getElementById('particle-canvas');
        if (canvas) canvas.style.display = (settings.particlesEnabled !== false) ? '' : 'none';
    }

    function render() {
        Router.go('settings');

        // Dark mode toggle
        const darkToggle = document.getElementById('setting-dark-mode');
        if (darkToggle) {
            darkToggle.checked = settings.darkMode;
            darkToggle.onchange = () => {
                settings.darkMode = darkToggle.checked;
                apply();
                save();
            };
        }

        // High contrast toggle
        const contrastToggle = document.getElementById('setting-high-contrast');
        if (contrastToggle) {
            contrastToggle.checked = settings.highContrast;
            contrastToggle.onchange = () => {
                settings.highContrast = contrastToggle.checked;
                apply();
                save();
            };
        }

        // Font size buttons
        document.querySelectorAll('.font-size-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === settings.fontScale);
            btn.onclick = () => {
                settings.fontScale = btn.dataset.size;
                document.querySelectorAll('.font-size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                apply();
                save();
            };
        });

        // TTS speed slider
        const speedSlider = document.getElementById('setting-tts-speed');
        const speedValue = document.getElementById('tts-speed-value');
        if (speedSlider) {
            speedSlider.value = settings.ttsSpeed;
            if (speedValue) speedValue.textContent = settings.ttsSpeed.toFixed(1) + '×';
            speedSlider.oninput = () => {
                settings.ttsSpeed = parseFloat(speedSlider.value);
                if (speedValue) speedValue.textContent = settings.ttsSpeed.toFixed(1) + '×';
                save();
            };
        }

        // SFX toggle
        const sfxToggle = document.getElementById('setting-sfx');
        if (sfxToggle) {
            sfxToggle.checked = settings.sfxEnabled !== false;
            sfxToggle.onchange = () => {
                settings.sfxEnabled = sfxToggle.checked;
                SFX.toggle(sfxToggle.checked);
                save();
            };
        }

        // Particles toggle
        const particlesToggle = document.getElementById('setting-particles');
        if (particlesToggle) {
            particlesToggle.checked = settings.particlesEnabled !== false;
            particlesToggle.onchange = () => {
                settings.particlesEnabled = particlesToggle.checked;
                if (particlesToggle.checked) Particles.start();
                else Particles.stop();
                const canvas = document.getElementById('particle-canvas');
                if (canvas) canvas.style.display = particlesToggle.checked ? '' : 'none';
                save();
            };
        }

        // Mic toggle
        const micToggle = document.getElementById('setting-mic');
        if (micToggle) {
            micToggle.checked = !state.micDisabled;
            micToggle.onchange = () => {
                state.micDisabled = !micToggle.checked;
                Storage.save();
                document.querySelectorAll('.btn-record').forEach(b => {
                    b.style.display = state.micDisabled ? 'none' : '';
                });
                if (!state.micDisabled) {
                    Toast.show('success', '🎤', 'Mikrofon uključen', 'Možete koristiti snimanje izgovora.');
                } else {
                    Toast.show('success', '🔇', 'Mikrofon isključen', 'Gumb za snimanje je skriven.');
                }
            };
        }

        // Export button
        const expBtn = document.getElementById('settings-export');
        if (expBtn) expBtn.onclick = exportProgress;

        // Import button
        const impBtn = document.getElementById('settings-import');
        const impFile = document.getElementById('settings-import-file');
        if (impBtn && impFile) {
            impBtn.onclick = () => impFile.click();
            impFile.onchange = (e) => {
                const f = e.target.files[0];
                if (f) importProgressFile(f);
            };
        }

        // Reset button
        const resetBtn = document.getElementById('settings-reset');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (confirm('Jeste li sigurni? Sav napredak će biti obrisan!')) {
                    Storage.reset();
                }
            };
        }

        // Reset current lesson button
        const resetLessonBtn = document.getElementById('settings-reset-lesson');
        if (resetLessonBtn) {
            resetLessonBtn.onclick = () => {
                state.currentLessonId = null;
                state.currentPhraseIdx = 0;
                state.currentView = 'dashboard';
                state.exerciseFlatIdx = 0;
                state.exerciseCorrect = 0;
                state.exerciseTotal = 0;
                Storage.save();
                Toast.show('success', '✅', 'Resetirano', 'Napredak unutar lekcije je obrisan.');
            };
        }
    }

    function getTtsSpeed() {
        return settings.ttsSpeed;
    }

    return { load, render, getTtsSpeed };
})();


// =============================================================================
// 19. SOUND EFFECTS — UI audio feedback (Web Audio API)
// =============================================================================

const SFX = (() => {
    let ctx = null;
    let enabled = true;
    let comboCount = 0;
    let lastCorrectTime = 0;

    function init() {
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }

    function resume() {
        if (ctx && ctx.state === 'suspended') ctx.resume();
    }

    function play(type) {
        if (!ctx || !enabled) return;
        resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.08;
        const t = ctx.currentTime;

        switch (type) {
            case 'click':
                osc.frequency.setValueAtTime(800, t);
                osc.frequency.exponentialRampToValueAtTime(600, t + 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                osc.start(t); osc.stop(t + 0.08);
                break;
            case 'correct':
                osc.frequency.setValueAtTime(523, t);
                osc.frequency.setValueAtTime(659, t + 0.1);
                osc.frequency.setValueAtTime(784, t + 0.2);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
                osc.start(t); osc.stop(t + 0.35);
                break;
            case 'wrong':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, t);
                osc.frequency.exponentialRampToValueAtTime(150, t + 0.25);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
                break;
            case 'levelup':
                osc.frequency.setValueAtTime(440, t);
                osc.frequency.setValueAtTime(554, t + 0.12);
                osc.frequency.setValueAtTime(659, t + 0.24);
                osc.frequency.setValueAtTime(880, t + 0.36);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
                osc.start(t); osc.stop(t + 0.55);
                break;
            case 'nav':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, t);
                osc.frequency.exponentialRampToValueAtTime(520, t + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
                osc.start(t); osc.stop(t + 0.07);
                break;
            default:
                osc.frequency.setValueAtTime(600, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
                osc.start(t); osc.stop(t + 0.06);
        }
    }

    function toggle(on) { enabled = on; }

    function playCombo() {
        if (!ctx || !enabled) return;
        resume();
        const now = Date.now();
        if (now - lastCorrectTime < 5000) {
            comboCount++;
        } else {
            comboCount = 1;
        }
        lastCorrectTime = now;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.08;
        const t = ctx.currentTime;
        const baseFreq = 523 + (comboCount * 40);

        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.setValueAtTime(baseFreq * 1.25, t + 0.08);
        osc.frequency.setValueAtTime(baseFreq * 1.5, t + 0.16);
        if (comboCount >= 3) {
            osc.frequency.setValueAtTime(baseFreq * 2, t + 0.24);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.start(t); osc.stop(t + 0.4);
        } else {
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            osc.start(t); osc.stop(t + 0.3);
        }
    }

    return { init, play, toggle, resume, playCombo };
})();


// =============================================================================
// 20. CANVAS PARTICLES — Ambient floating background
// =============================================================================

const Particles = (() => {
    let canvas, c, particles = [], raf = null, running = false;

    function init() {
        canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        c = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        spawn();
        running = true;
        animate();
    }

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function spawn() {
        particles = [];
        const count = Math.min(35, Math.floor(window.innerWidth / 40));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 3 + 1,
                dx: (Math.random() - 0.5) * 0.3,
                dy: -(Math.random() * 0.3 + 0.1),
                alpha: Math.random() * 0.3 + 0.1,
                emoji: ['✨','📖','⭐','🌟','💡','🎓','✏️','📝','🔤','🌍','📚','🗣️'][Math.floor(Math.random() * 12)],
                size: Math.random() * 10 + 10,
            });
        }
    }

    function animate() {
        if (!running) return;
        c.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;
            c.globalAlpha = p.alpha;
            c.font = p.size + 'px sans-serif';
            c.fillText(p.emoji, p.x, p.y);
        });
        c.globalAlpha = 1;
        raf = requestAnimationFrame(animate);
    }

    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
    function start() { if (!running) { running = true; animate(); } }

    return { init, stop, start };
})();


// =============================================================================
// 21. ACTIVITY LOGGER — Event viewer for the project
// =============================================================================

const ActivityLog = (() => {
    const LOG_KEY = 'engleski_activity_log';
    const MAX = 500;

    function log(type, detail) {
        const entries = getAll();
        entries.push({
            t: new Date().toISOString(),
            type: type,
            detail: detail,
        });
        if (entries.length > MAX) entries.splice(0, entries.length - MAX);
        try { localStorage.setItem(LOG_KEY, JSON.stringify(entries)); } catch(e) {}
    }

    function getAll() {
        try {
            return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
        } catch(e) { return []; }
    }

    function exportLog() {
        const data = JSON.stringify(getAll(), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'engleski_activity_log_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function clear() {
        localStorage.removeItem(LOG_KEY);
    }

    return { log, getAll, exportLog, clear };
})();


// =============================================================================
// 22. TUTORIAL — First-visit interactive onboarding
// =============================================================================

const Tutorial = (() => {
    const STORAGE_KEY = 'engleski_tutorial_done';
    const steps = [
        { target: '#sidebar', text: 'Ovo je vaš izbornik. Ovdje birate lekcije, ponavljanje i postignuća. Možete ga smanjiti klikom na strelicu.', pos: 'right' },
        { target: '#dashboard-lessons', text: 'Ovdje su sve vaše lekcije. Kliknite na bilo koju da počnete učiti — sve su vam odmah dostupne!', pos: 'top' },
        { target: '.header-right', text: 'Ovdje vidite svoje bodove (XP), dane zaredom i razinu. Učenje donosi nagrade!', pos: 'bottom' },
        { target: '#cultural-tip', text: 'Kulturni savjeti vam pomažu razumjeti američku kulturu. Novi savjet svaki put!', pos: 'top' },
    ];

    function shouldShow() {
        return !localStorage.getItem(STORAGE_KEY);
    }

    function show() {
        if (!shouldShow()) return;
        let idx = 0;

        function renderStep() {
            removeOverlay();
            if (idx >= steps.length) { finish(); return; }

            const step = steps[idx];
            const targetEl = document.querySelector(step.target);

            // Scroll main content to show the target element
            if (targetEl) {
                const main = document.getElementById('main-content');
                if (main && main.contains(targetEl)) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            // Overlay
            const overlay = document.createElement('div');
            overlay.id = 'tutorial-overlay';
            overlay.innerHTML = `
                <div class="tutorial-backdrop"></div>
                <div class="tutorial-popup tutorial-${step.pos}">
                    <div class="tutorial-step-indicator">${idx + 1} / ${steps.length}</div>
                    <p class="tutorial-text">${step.text}</p>
                    <div class="tutorial-actions">
                        ${idx > 0 ? '<button class="btn btn-secondary tutorial-prev">← Natrag</button>' : ''}
                        <button class="btn btn-primary tutorial-next">${idx < steps.length - 1 ? 'Dalje →' : 'Razumijem! ✓'}</button>
                        <button class="btn btn-secondary tutorial-skip">Preskoči</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Highlight target and position popup
            if (targetEl) {
                targetEl.classList.add('tutorial-highlight');
            }

            // Position popup safely — always visible on screen 
            const popup = overlay.querySelector('.tutorial-popup');
            popup.style.position = 'fixed';
            popup.style.zIndex = '10003';

            // Use requestAnimationFrame to ensure layout is settled
            requestAnimationFrame(() => {
                const isMobile = window.innerWidth < 700;
                if (isMobile) {
                    popup.style.left = '5%';
                    popup.style.right = '5%';
                    popup.style.bottom = '20px';
                    popup.style.top = 'auto';
                    popup.style.maxWidth = '90%';
                } else if (targetEl) {
                    const rect = targetEl.getBoundingClientRect();
                    const popupRect = popup.getBoundingClientRect();
                    const popupW = popupRect.width || 340;
                    const popupH = popupRect.height || 200;
                    const pad = 16;

                    // Try to place to the right of the target
                    let left = rect.right + pad;
                    let top = Math.max(rect.top, 80);

                    // If it overflows right, place to the left
                    if (left + popupW > window.innerWidth - pad) {
                        left = Math.max(pad, rect.left - popupW - pad);
                    }

                    // If it overflows bottom, move up
                    if (top + popupH > window.innerHeight - pad) {
                        top = Math.max(80, window.innerHeight - popupH - pad);
                    }

                    // Final fallback: center on screen
                    if (left < pad || top < 60) {
                        left = Math.max(pad, (window.innerWidth - popupW) / 2);
                        top = Math.max(80, (window.innerHeight - popupH) / 2);
                    }

                    popup.style.left = left + 'px';
                    popup.style.top = top + 'px';
                } else {
                    // No target — center on screen
                    popup.style.left = '50%';
                    popup.style.top = '50%';
                    popup.style.transform = 'translate(-50%, -50%)';
                }
            });

            overlay.querySelector('.tutorial-next')?.addEventListener('click', () => { idx++; renderStep(); SFX.play('click'); });
            overlay.querySelector('.tutorial-prev')?.addEventListener('click', () => { idx--; renderStep(); SFX.play('click'); });
            overlay.querySelector('.tutorial-skip')?.addEventListener('click', () => { finish(); SFX.play('nav'); });

            // Also allow clicking backdrop to dismiss
            overlay.querySelector('.tutorial-backdrop')?.addEventListener('click', () => { finish(); });
        }

        function removeOverlay() {
            const old = document.getElementById('tutorial-overlay');
            if (old) old.remove();
            document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
        }

        function finish() {
            removeOverlay();
            localStorage.setItem(STORAGE_KEY, '1');
            ActivityLog.log('tutorial', 'Tutorial completed');
        }

        renderStep();
    }

    function reset() {
        localStorage.removeItem(STORAGE_KEY);
    }

    return { show, shouldShow, reset };
})();


// =============================================================================
// 22b. ACTIVITY LOG RENDERER
// =============================================================================

function renderActivityLog() {
    const container = document.getElementById('activity-log-content');
    if (!container) return;
    const entries = ActivityLog.getAll().slice().reverse();
    if (entries.length === 0) {
        container.innerHTML = '<p style="color:var(--text-dim);">Još nema aktivnosti. Počnite učiti!</p>';
        return;
    }

    const typeLabels = { nav: '🧭 Navigacija', session: '🚀 Sesija', lesson: '📖 Lekcija', exercise: '📝 Vježba',
        achievement: '🏅 Postignuće', tutorial: '📋 Vodič', xp: '⭐ XP', error: '⚠️ Greška' };

    let html = '<div class="log-entries">';
    entries.forEach(e => {
        const date = new Date(e.t);
        const time = date.toLocaleString('hr-HR', { dateStyle: 'short', timeStyle: 'medium' });
        const label = typeLabels[e.type] || '📌 ' + e.type;
        html += `<div class="log-entry"><span class="log-time">${time}</span><span class="log-type">${label}</span><span class="log-detail">${escapeHTML(String(e.detail || ''))}</span></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}


// =============================================================================
// 23. BREADCRUMBS — Navigation trail
// =============================================================================

const Breadcrumbs = (() => {
    function update(viewName) {
        const el = document.getElementById('breadcrumbs');
        if (!el) return;

        const crumbs = [{ label: '🏠 Početna', view: 'dashboard' }];
        const viewLabels = {
            lesson: () => {
                const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
                return lesson ? lesson.icon + ' ' + lesson.title : 'Lekcija';
            },
            exercise: () => 'Vježbe',
            results: () => 'Rezultati',
            review: () => '🔄 Ponavljanje',
            achievements: () => '🏅 Postignuća',
            'watching-guide': () => '🎬 Filmovi',
            help: () => '❓ Pomoć',
            settings: () => '⚙️ Postavke',
            about: () => '🧠 O metodi',
            resources: () => '🔗 Resursi',
            'activity-log': () => '📊 Dnevnik',
        };

        if (viewName !== 'dashboard' && viewLabels[viewName]) {
            if ((viewName === 'exercise' || viewName === 'results') && state.currentLessonId) {
                const lesson = CURRICULUM.lessons.find(l => l.id === state.currentLessonId);
                if (lesson) crumbs.push({ label: lesson.icon + ' ' + lesson.title, view: 'lesson' });
            }
            crumbs.push({ label: viewLabels[viewName](), view: viewName });
        }

        el.innerHTML = crumbs.map((c, i) => {
            if (i === crumbs.length - 1) return `<span class="bc-current">${c.label}</span>`;
            return `<a href="#" class="bc-link" data-bc-view="${c.view}">${c.label}</a><span class="bc-sep">›</span>`;
        }).join('');

        // Wire clicks
        el.querySelectorAll('.bc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const v = link.dataset.bcView;
                if (v === 'dashboard') Dashboard.render();
                else if (v === 'lesson' && state.currentLessonId) Lessons.start(state.currentLessonId, state.currentPhraseIdx);
                SFX.play('nav');
            });
        });
    }

    return { update };
})();


// =============================================================================
// 23b. UPDATE CHECKER — Version & connectivity check
// =============================================================================

const APP_VERSION = '1.0.0';

const UpdateChecker = (() => {
    let updateReady = false;
    let pendingVersion = null;

    function showUpdatePrompt(newVersion, changelog, isDownloaded) {
        const existing = document.getElementById('update-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'update-overlay';
        overlay.innerHTML = `
            <div class="update-backdrop"></div>
            <div class="update-modal">
                <div class="update-icon">${isDownloaded ? '✅' : '🔄'}</div>
                <h2 class="update-title">${isDownloaded ? 'Ažuriranje spremno!' : 'Nova verzija dostupna!'}</h2>
                <p class="update-version">v${APP_VERSION} → v${newVersion}</p>
                ${changelog ? `<p class="update-changelog">${escapeHTML(changelog)}</p>` : ''}
                <p class="update-desc">${isDownloaded
                    ? 'Ažuriranje je preuzeto. Klikni "Instaliraj" da restartiram aplikaciju s novom verzijom.'
                    : 'Preuzimam ažuriranje u pozadini... Obavijestit ću te kad bude gotovo.'
                }</p>
                <div class="update-actions">
                    ${isDownloaded
                        ? '<button class="btn btn-primary update-now-btn">Instaliraj sada</button>'
                        : ''
                    }
                    <button class="btn btn-secondary update-later-btn">Kasnije</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        if (isDownloaded) {
            overlay.querySelector('.update-now-btn').addEventListener('click', () => {
                Storage.save();
                ActivityLog.log('update', 'User installed update v' + newVersion);
                // Electron auto-updater: quit and install
                if (window.electronUpdater) {
                    window.electronUpdater.installUpdate();
                } else {
                    // Web fallback: just reload
                    window.location.reload(true);
                }
            });
        }

        overlay.querySelector('.update-later-btn').addEventListener('click', () => {
            overlay.remove();
            SFX.play('click');
        });

        overlay.querySelector('.update-backdrop').addEventListener('click', () => {
            overlay.remove();
        });

        SFX.play('levelup');
    }

    function startPeriodicCheck() {
        // Electron mode: listen for IPC events from main process
        if (window.electronUpdater) {
            window.electronUpdater.onUpdateAvailable((info) => {
                pendingVersion = info.version;
                Toast.show('info', '🔄', 'Ažuriranje', `Preuzimam v${info.version}...`);
            });
            window.electronUpdater.onUpdateDownloaded((info) => {
                updateReady = true;
                showUpdatePrompt(info.version, '', true);
            });
            return; // Main process handles checking via autoUpdater
        }

        // Web/PWA fallback: no auto-update, just inform
        // (version.json check disabled — only Electron gets real updates)
    }

    function getVersion() {
        return APP_VERSION;
    }

    return { startPeriodicCheck, getVersion };
})();


// =============================================================================
// 24. INIT — Wire up everything
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Migrate old single-profile data to new profile system
    ProfileManager.migrateOldData();

    // Load saved progress (for active profile)
    Storage.load();
    Settings.load();

    // Unlock lessons based on progress
    CURRICULUM.lessons.forEach(l => {
        if (isLessonUnlocked(l.id)) l.locked = false;
    });

    // Init subsystems
    TTS.init();
    STT.init();
    SFX.init();
    Sidebar.init();
    Particles.init();

    // Sidebar collapse/expand
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            document.getElementById('app').classList.toggle('sidebar-collapsed');
            collapseBtn.textContent = document.getElementById('app').classList.contains('sidebar-collapsed') ? '❯' : '❮';
            SFX.play('nav');
        });
    }

    // Activity log buttons
    document.getElementById('export-activity-log')?.addEventListener('click', () => ActivityLog.exportLog());
    document.getElementById('clear-activity-log')?.addEventListener('click', () => {
        if (confirm('Obrisati sve zapise aktivnosti?')) {
            ActivityLog.clear();
            renderActivityLog();
        }
    });

    // Wire up navigation buttons
    document.querySelectorAll('.sidebar-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            SFX.play('nav');
            const view = btn.dataset.view;
            if (view === 'dashboard') Dashboard.render();
            else if (view === 'review') Review.render();
            else if (view === 'achievements') AchievementsView.render();
            else if (view === 'watching-guide') WatchingGuideView.render();
            else if (view === 'help') Router.go('help');
            else if (view === 'about') Router.go('about');
            else if (view === 'resources') Router.go('resources');
            else if (view === 'activity-log') { Router.go('activity-log'); renderActivityLog(); }
            else if (view === 'marketplace') { Marketplace.render(); setText('marketplace-coins', state.coins || 0); }
            else if (view === 'settings') Settings.render();
            if (window.innerWidth < 900) Sidebar.toggleSidebar(false);
        });
    });

    // Lesson view buttons
    // Lesson view buttons — back saves progress state for potential resume
    document.getElementById('lesson-back')?.addEventListener('click', () => { TTS.stop(); Storage.save(); Dashboard.render(); });
    document.getElementById('btn-next-phrase')?.addEventListener('click', () => Lessons.nextPhrase());
    document.getElementById('btn-prev-phrase')?.addEventListener('click', () => Lessons.prevPhrase());
    document.getElementById('btn-play')?.addEventListener('click', () => Lessons.playCurrentPhrase());
    document.getElementById('btn-play-slow')?.addEventListener('click', () => Lessons.playCurrentPhraseSlow());
    document.getElementById('btn-record')?.addEventListener('click', () => Lessons.recordCurrentPhrase());

    // Exercise view buttons
    document.getElementById('exercise-back')?.addEventListener('click', () => {
        TTS.stop();
        // Save mid-exercise progress for resume
        Storage.save();
        Dashboard.render();
    });
    document.getElementById('btn-next-exercise')?.addEventListener('click', () => Exercises.nextQuestion());

    // Results view buttons
    document.getElementById('btn-results-continue')?.addEventListener('click', () => Dashboard.render());
    document.getElementById('btn-results-retry')?.addEventListener('click', () => {
        if (state.currentLessonId) {
            state.isPracticeMode = true; // Retry = practice, no coins
            Exercises.start(state.currentLessonId);
        }
    });

    // Resume mid-lesson or mid-exercise if user closed while in progress
    const resumeLesson = state.currentLessonId && state.currentView === 'lesson';
    const resumeExercise = state.currentLessonId && state.currentView === 'exercise';
    if (resumeLesson || resumeExercise) {
        Boot.run = function() {
            const bootScreen = document.getElementById('boot-screen');
            if (bootScreen) bootScreen.style.display = 'none';
            const app = document.getElementById('app');
            if (app) app.classList.remove('hidden');
            Sidebar.render();
            Gamification.updateUI();
            Gamification.checkStreak();
            if (resumeExercise) {
                Exercises.resume(state.currentLessonId, state.exerciseFlatIdx || 0, state.exerciseCorrect || 0);
            } else {
                Lessons.start(state.currentLessonId, state.currentPhraseIdx || 0);
            }
        };
    }

    // Start boot sequence
    // Hook up backup / PWA UI
    const exportBtn = document.getElementById('export-progress');
    const importBtn = document.getElementById('import-progress-btn');
    const importInput = document.getElementById('import-progress-file');
    const installBtn = document.getElementById('install-app');

    if (exportBtn) exportBtn.addEventListener('click', exportProgress);
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', (e) => {
            const f = e.target.files[0]; if (f) importProgressFile(f);
        });
    }
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (!__deferredInstallPrompt) return;
            __deferredInstallPrompt.prompt();
            try {
                const choice = await __deferredInstallPrompt.userChoice;
                if (choice && choice.outcome === 'accepted') {
                    Toast.show('success','✅','Instalirano','Aplikacija je instalirana.');
                }
            } catch (e) {}
            __deferredInstallPrompt = null;
            installBtn.classList.add('hidden');
        });
    }

    Boot.run();

    // Check for updates (offline-safe: will just notify if no connection)
    setTimeout(() => UpdateChecker.startPeriodicCheck(), 3000);

    // SFX on all button clicks
    document.addEventListener('click', (e) => {
        SFX.resume();
        if (e.target.closest('button, .btn, .sidebar-btn, .sidebar-lesson-item, .lesson-card')) {
            if (!e.target.closest('.tutorial-actions')) SFX.play('click');
        }
    });

    // Log session start
    ActivityLog.log('session', 'App started');

    // Tutorial restart button
    document.getElementById('restart-tutorial')?.addEventListener('click', () => {
        Tutorial.reset();
        Dashboard.render();
        setTimeout(() => Tutorial.show(), 500);
    });
});
