/**
 * Configuración de la ventana de Electron
 * Archivo CommonJS para ser usado en electron.js
 */

const WINDOW_CONFIG = {
  width: 1400,
  height: 900,
  minWidth: 800,
  minHeight: 600,
  frame: false  // Elimina los botones de cerrar, minimizar y agrandar por defecto
};

const WEB_PREFERENCES = {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  sandbox: false  // Deshabilitar sandbox para evitar problemas en Linux
};

const DEV_CONFIG = {
  devServerURL: 'http://localhost:3000',
  openDevTools: true
};

const PATHS = {
  preload: 'preload.js',
  icon: 'build/icon.png',
  distIndex: 'dist/index.html'
};

module.exports = {
  WINDOW_CONFIG,
  WEB_PREFERENCES,
  DEV_CONFIG,
  PATHS
};
