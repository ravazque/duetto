const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { WINDOW_CONFIG, WEB_PREFERENCES, DEV_CONFIG, PATHS } = require('./electron.config');
const isDev = process.env.NODE_ENV === 'development';

// Deshabilitar sandbox en Linux para evitar problemas de permisos
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch('disable-setuid-sandbox');
  app.commandLine.appendSwitch('disable-dev-shm-usage');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    ...WINDOW_CONFIG,
    webPreferences: {
      ...WEB_PREFERENCES,
      preload: path.join(__dirname, PATHS.preload)
    },
    icon: path.join(__dirname, PATHS.icon),
    title: 'Duetto'
  });

  // Cargar la aplicación
  if (isDev) {
    // En desarrollo, cargar desde el servidor de Vite
    mainWindow.loadURL(DEV_CONFIG.devServerURL);
    // Abrir DevTools en desarrollo
    if (DEV_CONFIG.openDevTools) {
      mainWindow.webContents.openDevTools();
    }
  } else {
    // En producción, cargar el archivo index.html compilado
    mainWindow.loadFile(path.join(__dirname, PATHS.distIndex));
  }

  // Opcional: Menú personalizado o sin menú
  // mainWindow.setMenu(null); // Descomentar para quitar el menú

  // Configurar handlers IPC
  setupIpcHandlers(mainWindow);

  return mainWindow;
}

// Configurar los handlers de IPC
function setupIpcHandlers(mainWindow) {
  // Toggle fullscreen
  ipcMain.on('toggle-fullscreen', () => {
    const isFullscreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullscreen);
    mainWindow.webContents.send('fullscreen-changed', !isFullscreen);
  });

  // Maximizar ventana
  ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  // Minimizar ventana
  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });

  // Cerrar aplicación
  ipcMain.on('close-app', () => {
    mainWindow.close();
  });
}

// Crear ventana cuando Electron esté listo
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // En macOS, recrear ventana cuando se hace clic en el dock
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
