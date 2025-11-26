const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'build', 'icon.png'),
    title: 'Duetto'
  });

  // Cargar la aplicación
  if (isDev) {
    // En desarrollo, cargar desde el servidor de Vite
    mainWindow.loadURL('http://localhost:3000');
    // Abrir DevTools en desarrollo
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, cargar el archivo index.html compilado
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Opcional: Menú personalizado o sin menú
  // mainWindow.setMenu(null); // Descomentar para quitar el menú
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
