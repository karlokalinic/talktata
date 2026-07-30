'use strict';

const { contextBridge, ipcRenderer } = require('electron');

const ALLOWED_UPDATE_CHANNELS = new Set([
    'update-available',
    'update-downloaded',
    'update-status',
    'update-error',
]);

function subscribe(channel, callback) {
    if (!ALLOWED_UPDATE_CHANNELS.has(channel) || typeof callback !== 'function') {
        return () => {};
    }

    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on(channel, listener);
    return () => ipcRenderer.removeListener(channel, listener);
}

function sanitizeRendererError(payload = {}) {
    return {
        scope: String(payload.scope || 'renderer').slice(0, 100),
        message: String(payload.message || '').slice(0, 2000),
        stack: String(payload.stack || '').slice(0, 10000),
    };
}

contextBridge.exposeInMainWorld('electronUpdater', Object.freeze({
    onUpdateAvailable: callback => subscribe('update-available', callback),
    onUpdateDownloaded: callback => subscribe('update-downloaded', callback),
    onUpdateStatus: callback => subscribe('update-status', callback),
    onUpdateError: callback => subscribe('update-error', callback),
    installUpdate: () => ipcRenderer.send('install-update'),
}));

contextBridge.exposeInMainWorld('electronRuntime', Object.freeze({
    getAppInfo: () => ipcRenderer.invoke('get-app-info'),
    reportRendererError: payload => ipcRenderer.send('renderer-error', sanitizeRendererError(payload)),
}));
