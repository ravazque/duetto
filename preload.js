const { contextBridge, ipcRenderer } = require('electron');

// Exponer funcionalidades de Electron a la aplicación React de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
  // Pantalla completa
  toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
  onFullscreenChange: (callback) => ipcRenderer.on('fullscreen-changed', (event, isFullscreen) => callback(isFullscreen)),

  // Control de ventana
  maximize: () => ipcRenderer.send('maximize'),
  minimize: () => ipcRenderer.send('minimize'),

  // Cerrar aplicación
  closeApp: () => ipcRenderer.send('close-app')
});
