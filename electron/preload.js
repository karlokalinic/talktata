const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronUpdater', {
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (_e, info) => callback(info)),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (_e, info) => callback(info)),
    installUpdate: () => ipcRenderer.send('install-update'),
});
