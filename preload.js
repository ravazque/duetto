const { contextBridge, ipcRenderer } = require('electron');

// Exponer funcionalidades de Electron a la aplicación React de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
  // Funcionalidades de Electron disponibles para la aplicación
});
