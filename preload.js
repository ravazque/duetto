const { contextBridge, ipcRenderer } = require('electron');

// Exponer funcionalidades de Electron a la aplicación React de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
  // Pantalla completa
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  onFullscreenChange: (callback) => ipcRenderer.on('fullscreen-changed', (event, isFullscreen) => callback(isFullscreen)),

  // Cerrar aplicación
  closeApp: () => ipcRenderer.send('close-app')
});
