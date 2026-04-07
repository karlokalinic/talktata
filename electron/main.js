const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// Prevent multiple instances
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); process.exit(0); }

let mainWindow;

// ─── Auto-Updater Setup ────────────────────────────────────────────────────
autoUpdater.autoDownload = true;        // Download in background
autoUpdater.autoInstallOnAppQuit = true; // Install when user quits

autoUpdater.on('update-available', (info) => {
    if (mainWindow) {
        mainWindow.webContents.send('update-available', {
            version: info.version,
            releaseNotes: info.releaseNotes || '',
        });
    }
});

autoUpdater.on('update-downloaded', (info) => {
    if (mainWindow) {
        mainWindow.webContents.send('update-downloaded', {
            version: info.version,
        });
    }
});

autoUpdater.on('error', (err) => {
    // Fail silently — user is offline or no releases exist yet
    console.log('Auto-updater error:', err.message);
});

// When renderer asks to install now
ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall(false, true);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 400,
        minHeight: 600,
        title: 'TalkTata — KarloLegend',
        icon: path.join(__dirname, '..', 'engleski', 'icons', 'icon-256.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false,
        backgroundColor: '#f5f0e8',
        autoHideMenuBar: true,
    });

    // Load the app
    mainWindow.loadFile(path.join(__dirname, '..', 'engleski', 'index.html'));

    // Show window when ready (avoids white flash)
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Open external links in system browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http:') || url.startsWith('https:')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Simple menu bar
const menuTemplate = [
    {
        label: 'TalkTata',
        submenu: [
            { label: 'O aplikaciji', role: 'about' },
            { type: 'separator' },
            {
                label: 'Resetiraj napredak',
                click: () => {
                    if (mainWindow) {
                        mainWindow.webContents.executeJavaScript('if (confirm("Obrisati sav napredak?")) Storage.reset();');
                    }
                }
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
            {
                label: 'Otvori GitHub',
                click: () => shell.openExternal('https://github.com/KarloLegend/karlolegend'),
            },
            { type: 'separator' },
            { label: 'DevTools', role: 'toggleDevTools' },
        ],
    },
];

app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    createWindow();

    // Check for updates 5 seconds after launch (silent if offline / no releases)
    setTimeout(() => autoUpdater.checkForUpdatesAndNotify(), 5000);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
