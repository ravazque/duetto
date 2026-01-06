/**
 * Configuración de la ventana de Electron
 * Centraliza las opciones de la ventana principal
 */

export const WINDOW_CONFIG = {
  width: 1400,
  height: 900,
  minWidth: 800,
  minHeight: 600,
  frame: false  // Elimina los botones de cerrar, minimizar y agrandar por defecto
};

export const WEB_PREFERENCES = {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false
};

export const DEV_CONFIG = {
  devServerURL: 'http://localhost:3000',
  openDevTools: true
};

export const PATHS = {
  preload: 'preload.js',
  icon: 'build/icon.png',
  distIndex: 'dist/index.html'
};
