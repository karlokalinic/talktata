'use strict';

const { app, BrowserWindow, Menu, shell, ipcMain, dialog, session } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_TITLE = 'TalkTata';
const APP_REPOSITORY_URL = 'https://github.com/karlokalinic/talktata';
const RUNTIME_SCRIPT = 'js/runtime-compat.js';

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
    app.quit();
    process.exit(0);
}

let mainWindow = null;
let updaterReady = false;

function isTrustedRenderer(webContents, candidateUrl = '') {
    if (!mainWindow || webContents !== mainWindow.webContents) return false;
    try {
        const parsed = new URL(candidateUrl || webContents.getURL());
        return parsed.protocol === 'file:';
    } catch (_) {
        return false;
    }
}

function configureMediaPermissions() {
    const defaultSession = session.defaultSession;

    defaultSession.setPermissionCheckHandler((webContents, permission, requestingOrigin, details = {}) => {
        if (permission !== 'media') return false;
        if (!isTrustedRenderer(webContents, details.requestingUrl || requestingOrigin || '')) return false;
        return !details.mediaType || details.mediaType === 'audio' || details.mediaType === 'unknown';
    });

    defaultSession.setPermissionRequestHandler((webContents, permission, callback, details = {}) => {
        if (permission !== 'media' || !isTrustedRenderer(webContents, details.requestingUrl || '')) {
            callback(false);
            return;
        }

        const requestedTypes = Array.isArray(details.mediaTypes) ? details.mediaTypes : [];
        const requestsVideo = requestedTypes.includes('video');
        const requestsAudio = requestedTypes.length === 0 || requestedTypes.includes('audio');
        callback(requestsAudio && !requestsVideo);
    });
}

function buildRuntimeHtml() {
    const appDirectory = path.join(__dirname, '..', 'engleski');
    const sourcePath = path.join(appDirectory, 'index.html');
    const runtimePath = path.join(appDirectory, RUNTIME_SCRIPT);

    if (!fs.existsSync(sourcePath)) throw new Error(`Missing renderer entry: ${sourcePath}`);
    if (!fs.existsSync(runtimePath)) throw new Error(`Missing compatibility layer: ${runtimePath}`);

    const source = fs.readFileSync(sourcePath, 'utf8');
    const appScriptTag = '<script src="js/app.js"></script>';
    if (!source.includes(appScriptTag)) {
        throw new Error('Cannot inject runtime compatibility layer: app.js script tag was not found.');
    }

    const baseHref = pathToFileURL(`${appDirectory}${path.sep}`).href;
    const cacheKey = encodeURIComponent(app.getVersion());
    const withBase = source.replace('<head>', `<head>\n    <base href="${baseHref}">`);
    const withRuntime = withBase.replace(
        appScriptTag,
        `${appScriptTag}\n    <script src="${RUNTIME_SCRIPT}?v=${cacheKey}"></script>`,
    );

    const runtimeDirectory = path.join(app.getPath('userData'), 'runtime');
    fs.mkdirSync(runtimeDirectory, { recursive: true });
    const runtimeEntry = path.join(runtimeDirectory, 'index.html');
    fs.writeFileSync(runtimeEntry, withRuntime, 'utf8');
    return runtimeEntry;
}

function sendToRenderer(channel, payload) {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    mainWindow.webContents.send(channel, payload);
}

function configureUpdater() {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.allowPrerelease = false;

    autoUpdater.on('checking-for-update', () => {
        sendToRenderer('update-status', { state: 'checking' });
    });

    autoUpdater.on('update-available', info => {
        sendToRenderer('update-available', {
            version: info.version,
            releaseNotes: info.releaseNotes || '',
        });
    });

    autoUpdater.on('update-not-available', info => {
        sendToRenderer('update-status', {
            state: 'current',
            version: info?.version || app.getVersion(),
        });
    });

    autoUpdater.on('download-progress', progress => {
        sendToRenderer('update-status', {
            state: 'downloading',
            percent: Math.round(progress.percent || 0),
        });
    });

    autoUpdater.on('update-downloaded', info => {
        sendToRenderer('update-downloaded', { version: info.version });
    });

    autoUpdater.on('error', error => {
        const message = error?.message || String(error);
        console.warn('Auto-updater error:', message);
        sendToRenderer('update-error', { message });
    });

    updaterReady = true;
}

async function checkForUpdates() {
    if (!app.isPackaged || !updaterReady) return;
    try {
        await autoUpdater.checkForUpdatesAndNotify();
    } catch (error) {
        console.warn('Update check failed:', error?.message || error);
    }
}

async function loadRenderer() {
    if (!mainWindow) return;
    try {
        const runtimeEntry = buildRuntimeHtml();
        await mainWindow.loadFile(runtimeEntry);
    } catch (error) {
        console.error('Renderer load failed:', error);
        await dialog.showMessageBox({
            type: 'error',
            title: 'TalkTata se ne može pokrenuti',
            message: 'Datoteke aplikacije nisu ispravne ili nisu potpuno instalirane.',
            detail: error?.message || String(error),
            buttons: ['Zatvori'],
        });
        app.quit();
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 420,
        minHeight: 560,
        title: APP_TITLE,
        show: false,
        backgroundColor: '#f5f0e8',
        autoHideMenuBar: true,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            spellcheck: false,
            backgroundThrottling: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.once('ready-to-show', () => {
        if (!mainWindow || mainWindow.isDestroyed()) return;
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        try {
            const parsed = new URL(url);
            if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
                void shell.openExternal(parsed.toString());
            }
        } catch (_) {}
        return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url.startsWith('file:')) return;
        event.preventDefault();
        try {
            const parsed = new URL(url);
            if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
                void shell.openExternal(parsed.toString());
            }
        } catch (_) {}
    });

    mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedUrl, isMainFrame) => {
        if (!isMainFrame || errorCode === -3) return;
        console.error('Renderer failed to load:', { errorCode, errorDescription, validatedUrl });
    });

    mainWindow.webContents.on('render-process-gone', async (_event, details) => {
        console.error('Renderer process ended:', details);
        if (!mainWindow || mainWindow.isDestroyed()) return;
        const result = await dialog.showMessageBox(mainWindow, {
            type: 'error',
            title: 'TalkTata se neočekivano zaustavio',
            message: 'Sučelje aplikacije prestalo je raditi.',
            detail: `Razlog: ${details.reason}. Napredak spremljen prije kvara ostaje sačuvan.`,
            buttons: ['Ponovno učitaj', 'Zatvori'],
            defaultId: 0,
            cancelId: 1,
        });
        if (result.response === 0) await loadRenderer();
        else app.quit();
    });

    mainWindow.on('unresponsive', async () => {
        if (!mainWindow || mainWindow.isDestroyed()) return;
        const result = await dialog.showMessageBox(mainWindow, {
            type: 'warning',
            title: 'TalkTata ne odgovara',
            message: 'Aplikacija trenutačno ne odgovara.',
            buttons: ['Pričekaj', 'Ponovno učitaj'],
            defaultId: 0,
            cancelId: 0,
        });
        if (result.response === 1) await loadRenderer();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    void loadRenderer();
}

function buildMenu() {
    const template = [
        {
            label: 'TalkTata',
            submenu: [
                {
                    label: 'O aplikaciji',
                    click: () => dialog.showMessageBox(mainWindow, {
                        type: 'info',
                        title: `TalkTata ${app.getVersion()}`,
                        message: `TalkTata ${app.getVersion()}`,
                        detail: 'Interaktivni tečaj engleskog jezika. Mikrofon i zvuk su opcionalni.',
                        buttons: ['U redu'],
                    }),
                },
                { type: 'separator' },
                {
                    label: 'Resetiraj napredak',
                    click: () => {
                        if (!mainWindow) return;
                        void mainWindow.webContents.executeJavaScript(
                            'if (confirm("Obrisati sav napredak?")) Storage.reset();',
                            true,
                        ).catch(error => console.warn('Reset command failed:', error.message));
                    },
                },
                { type: 'separator' },
                { label: 'Zatvori', role: 'quit' },
            ],
        },
        {
            label: 'Prikaz',
            submenu: [
                { label: 'Povećaj', role: 'zoomIn' },
                { label: 'Smanji', role: 'zoomOut' },
                { label: 'Normalna veličina', role: 'resetZoom' },
                { type: 'separator' },
                { label: 'Cijeli ekran', role: 'togglefullscreen' },
            ],
        },
        {
            label: 'Pomoć',
            submenu: [
                { label: 'Otvori projekt', click: () => void shell.openExternal(APP_REPOSITORY_URL) },
                ...(app.isPackaged ? [] : [{ type: 'separator' }, { label: 'Razvojni alati', role: 'toggleDevTools' }]),
            ],
        },
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

ipcMain.handle('get-app-info', () => ({
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
    packaged: app.isPackaged,
}));

ipcMain.on('renderer-error', (_event, payload = {}) => {
    console.error('[Renderer]', payload.scope || 'unknown', payload.message || '', payload.stack || '');
});

ipcMain.on('install-update', () => {
    if (!app.isPackaged || !updaterReady) return;
    autoUpdater.quitAndInstall(false, true);
});

app.whenReady().then(() => {
    if (process.platform === 'win32') app.setAppUserModelId('com.karlolegend.talktata');
    configureUpdater();
    configureMediaPermissions();
    createWindow();
    buildMenu();

    setTimeout(() => void checkForUpdates(), 8000);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
