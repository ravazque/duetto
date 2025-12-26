# Duetto

Aplicación de cartas proyectivas para terapia desarrollada con Electron y React.

## Requisitos Previos

Antes de instalar Duetto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior recomendada)
- **npm** (viene incluido con Node.js)

## Instalación

### En Linux

1. **Instalar Node.js y npm**

   **Ubuntu/Debian:**
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

   **Fedora:**
   ```bash
   sudo dnf install nodejs npm
   ```

   **Arch Linux:**
   ```bash
   sudo pacman -S nodejs npm
   ```

   **Alternativa (recomendada) - Usando nvm:**
   ```bash
   # Instalar nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # Reiniciar terminal o ejecutar:
   source ~/.bashrc

   # Instalar Node.js
   nvm install 18
   nvm use 18
   ```

2. **Clonar el repositorio (si aplica)**
   ```bash
   git clone <url-del-repositorio>
   cd duetto
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

### En Windows

1. **Instalar Node.js y npm**

   - Descarga el instalador de Node.js desde [nodejs.org](https://nodejs.org/)
   - Ejecuta el instalador (.msi) y sigue las instrucciones
   - Asegúrate de marcar la opción "Add to PATH" durante la instalación
   - Reinicia tu terminal después de la instalación

   Para verificar la instalación, abre PowerShell o CMD y ejecuta:
   ```powershell
   node --version
   npm --version
   ```

2. **Clonar el repositorio (si aplica)**
   ```powershell
   git clone <url-del-repositorio>
   cd duetto
   ```

3. **Instalar dependencias**
   ```powershell
   npm install
   ```

## Uso

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo:

**Linux/macOS:**
```bash
npm run electron
```

**Windows:**
```powershell
npm run electron
```

Esto iniciará el servidor de desarrollo de Vite y abrirá la aplicación Electron automáticamente.

### Solo Frontend (sin Electron)

Si solo quieres trabajar en el frontend:

```bash
npm run dev
```

Luego abre tu navegador en `http://localhost:3000`

## Construcción de la Aplicación

Para crear un ejecutable de la aplicación:

### Linux
```bash
npm run electron:build:linux
```

Esto generará un archivo AppImage en la carpeta `release/`.

### Windows
```bash
npm run electron:build:win
```

Esto generará un instalador NSIS (.exe) en la carpeta `release/`.

### macOS
```bash
npm run electron:build:mac
```

Esto generará un archivo DMG en la carpeta `release/`.

## Estructura del Proyecto

```
duetto/
├── src/           # Código fuente de React
├── dist/          # Build de producción
├── build/         # Recursos para el builder (iconos, etc.)
├── release/       # Ejecutables generados
├── electron.js    # Proceso principal de Electron
├── index.html     # HTML principal
└── package.json   # Dependencias y scripts
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Vista previa del build de producción
- `npm run electron` - Ejecuta la aplicación en modo desarrollo
- `npm run electron:build` - Construye la aplicación para la plataforma actual
- `npm run electron:build:win` - Construye para Windows
- `npm run electron:build:mac` - Construye para macOS
- `npm run electron:build:linux` - Construye para Linux

## Solución de Problemas

### Error: "command not found: npm" o "npm no se reconoce"

- Verifica que Node.js esté instalado correctamente: `node --version`
- Asegúrate de que npm esté en el PATH del sistema
- Reinicia tu terminal o computadora

### Error durante `npm install`

- Intenta limpiar la caché de npm: `npm cache clean --force`
- Elimina la carpeta `node_modules` y el archivo `package-lock.json`, luego vuelve a ejecutar `npm install`
- Verifica tu conexión a internet

### La aplicación Electron no se inicia

- Asegúrate de que todas las dependencias estén instaladas: `npm install`
- Verifica que el puerto 3000 no esté siendo usado por otra aplicación
- Revisa la consola para mensajes de error específicos

## Licencia

[Especificar licencia]

## Autor

Duetto
