# 📘 Documentación Técnica - Duetto v1.3.1

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

```
Frontend:       React 18.2.0 + Vite 5.0.8
Desktop:        Electron 39.2.3
Build:          electron-builder 26.0.12
Empaquetado:    Vite (ES modules)
Estado:         React Hooks (useState, useEffect, useRef)
Persistencia:   localStorage (navegador) + electron-store
Estilos:        CSS3 puro (sin preprocesadores)
```

### Estructura de Directorios

```
duetto/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Card.jsx        # Componente individual de carta
│   │   ├── Card.css
│   │   ├── Deck.jsx        # Contenedor de mazos
│   │   ├── Deck.css
│   │   ├── ControlPanel.jsx # Panel de control
│   │   ├── ControlPanel.css
│   │   ├── DeckConfig.jsx  # Configurador de mazos
│   │   └── DeckConfig.css
│   ├── data/
│   │   └── cardsData.js    # Datos iniciales de cartas
│   ├── App.jsx             # Componente raíz
│   ├── App.css
│   ├── main.jsx            # Entrada React
│   └── index.css           # Estilos globales
├── public/                  # Recursos públicos
├── release/                 # Ejecutables compilados
├── electron.js             # Proceso principal Electron
├── vite.config.js          # Configuración Vite
├── package.json            # Dependencias y scripts
└── README.md               # Documentación usuario
```

---

## 🔧 Compilación de Ejecutables

### Requisitos Previos

#### Para Linux (Compilación Nativa)
```bash
# Node.js 18+
node --version  # v18.0.0 o superior

# npm 9+
npm --version   # 9.0.0 o superior

# Dependencias del sistema (Ubuntu/Debian)
sudo apt install -y build-essential fakeroot rpm

# Dependencias del sistema (Fedora/RHEL)
sudo dnf install -y @development-tools rpm-build

# Dependencias del sistema (Arch Linux)
sudo pacman -S base-devel fakeroot rpm-tools
```

#### Para Windows (Compilación Nativa)
```powershell
# Node.js 18+ (Descargar desde nodejs.org)
node --version

# npm viene incluido con Node.js
npm --version

# Windows Build Tools (opcional pero recomendado)
npm install --global windows-build-tools
```

#### Para Windows (Compilación desde Linux con Wine)
```bash
# Instalar Wine
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install wine wine32 wine64

# Verificar Wine
wine --version
```

---

## 🚀 Proceso de Compilación

### 1. Instalación de Dependencias

```bash
cd /ruta/a/duetto
npm install
```

### 2. Compilar para Linux (AppImage)

```bash
# Compilar ejecutable para Linux
npm run electron:build:linux

# Resultado esperado:
# release/Duetto-1.3.1.AppImage
```

**Características del AppImage:**
- Formato universal para Linux
- No requiere instalación
- Funciona en Ubuntu, Fedora, Debian, Arch, OpenSUSE, etc.
- Tamaño aproximado: 120-150 MB
- Incluye todas las dependencias

**Ejecutar el AppImage:**
```bash
chmod +x release/Duetto-1.3.1.AppImage
./release/Duetto-1.3.1.AppImage
```

### 3. Compilar para Windows (EXE)

#### Desde Linux (con Wine):
```bash
# Configurar Wine (primera vez)
export WINE=wine
export WINEARCH=win64

# Compilar
npm run electron:build:win

# Resultado esperado:
# release/Duetto Setup 1.3.1.exe
```

#### Desde Windows nativo:
```powershell
# Compilar
npm run electron:build:win

# Resultado esperado:
# release\Duetto Setup 1.3.1.exe
```

**Características del EXE:**
- Instalador NSIS con asistente gráfico
- Se instala en `C:\Users\[Usuario]\AppData\Local\Duetto`
- Crea acceso directo en escritorio y menú inicio
- Tamaño aproximado: 100-130 MB
- Actualización automática (si está configurada)

### 4. Compilar para macOS (DMG)

```bash
# Solo desde macOS
npm run electron:build:mac

# Resultado esperado:
# release/Duetto-1.3.1.dmg
```

**Nota:** La compilación para macOS solo funciona desde un sistema macOS debido a restricciones de firma de código de Apple.

---

## ⚙️ Configuración de electron-builder

El archivo `package.json` contiene la configuración de electron-builder:

```json
{
  "build": {
    "appId": "com.duetto.app",
    "productName": "Duetto",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron.js",
      "package.json"
    ],
    "linux": {
      "target": ["AppImage"],
      "category": "Education",
      "icon": "public/icon.png"
    },
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "public/icon.icns",
      "category": "public.app-category.education"
    }
  }
}
```

### Formatos de Iconos

- **Linux**: PNG de 512x512 (`public/icon.png`)
- **Windows**: ICO multi-resolución (`public/icon.ico`)
- **macOS**: ICNS con resoluciones 16x16 a 512x512 (`public/icon.icns`)

Para convertir PNG a los formatos necesarios:

```bash
# PNG → ICO (Windows)
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# PNG → ICNS (macOS)
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
```

---

## 💾 Sistema de Persistencia

### Almacenamiento Local

**Ubicación de datos por plataforma:**

```
Linux:   ~/.config/duetto/
Windows: C:\Users\[Usuario]\AppData\Roaming\duetto\
macOS:   ~/Library/Application Support/duetto/
```

**Datos almacenados:**

```javascript
// localStorage keys
wordCards      // Array de 44 cartas de palabras
imageCards     // Array de 44 cartas de imágenes
darkMode       // Boolean para modo oscuro
```

**Estructura de datos de cartas:**

```javascript
{
  id: "word-1",           // ID único
  type: "word",           // "word" o "image"
  content: "AMOR",        // Contenido (palabra o emoji)
  imageData: null,        // Base64 de imagen (solo para type="image")
  state: "faceDown"       // Estado: faceDown | selected | flipped | resetting
}
```

### Limpieza de Datos

Para resetear la aplicación a valores por defecto:

```bash
# Linux
rm -rf ~/.config/duetto/

# Windows (PowerShell)
Remove-Item "$env:APPDATA\duetto" -Recurse -Force

# macOS
rm -rf ~/Library/Application\ Support/duetto/
```

---

## 🎨 Sistema de Estados de Cartas

### Máquina de Estados

```
┌──────────┐   click   ┌──────────┐   reveal   ┌──────────┐
│ faceDown │ ────────> │ selected │ ─────────> │ flipped  │
└──────────┘           └──────────┘            └──────────┘
     ↑                                               │
     │                  reset/save                   │
     └───────────────────────────────────────────────┘
                    (con animación)
```

**Estados posibles:**
- `faceDown`: Carta boca abajo, no seleccionada
- `selected`: Carta seleccionada (max 1 por mazo)
- `ready-to-flip`: Estado transitorio antes de voltear
- `flipped`: Carta volteada mostrando contenido
- `resetting`: En proceso de animación de volteo hacia abajo

**Flags adicionales:**
- `previouslyFlipped`: Marca cartas que ya fueron reveladas anteriormente
- `canFlipCards`: Flag global que controla cuándo se ejecutan animaciones
- `isShuffling`: Bloquea selección durante mezcla

---

## 🎭 Sistema de Animaciones

### Animaciones CSS

**Revelar carta (faceDown → flipped):**
```css
@keyframes instantFlip {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}
/* Duración: 0.6s ease-in-out */
```

**Resetear carta (flipped → faceDown):**
```css
@keyframes flipToBack {
  0%   { transform: rotateY(180deg); }
  100% { transform: rotateY(0deg); }
}
/* Duración: 0.6s ease-in-out */
```

**Reordenamiento de cartas:**
```css
.deck-grid > * {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Secuencia de Revelación

1. Usuario selecciona carta → estado `selected`
2. Usuario presiona "Revelar"
3. Slider se mueve al inicio (smooth scroll)
4. Cartas se reordenan (transición CSS)
5. Carta cambia a estado `ready-to-flip`
6. Se activa flag `canFlipCards`
7. Animación `instantFlip` ejecuta
8. Estado final: `flipped`

---

## 🎯 Modo Oscuro

### Implementación

```javascript
// Estado React
const [darkMode, setDarkMode] = useState(false);

// Aplicar clase al body
useEffect(() => {
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [darkMode]);
```

### Estilos CSS

Los estilos de modo oscuro se aplican mediante selectores `.dark-mode`:

```css
/* Modo claro (default) */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Modo oscuro */
body.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
```

---

## 🔐 Seguridad

### Sandboxing de Electron

```javascript
// electron.js
webPreferences: {
  nodeIntegration: false,    // No exponer Node.js al renderer
  contextIsolation: true,    // Aislar contextos
  sandbox: true              // Activar sandbox
}
```

### Content Security Policy

```javascript
// Futuro: Implementar CSP
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:;">
```

### Datos del Usuario

- **No se recolectan datos**: 100% offline
- **No hay telemetría**: Sin analytics ni tracking
- **No hay cuentas**: Sin autenticación ni servidores
- **Datos locales**: Todo en el equipo del usuario

---

## 📊 Rendimiento

### Métricas Clave

- **Tiempo de inicio**: ~1-2 segundos
- **Consumo de RAM**: 80-150 MB
- **Tamaño ejecutable**: 100-150 MB (incluye Chromium + Node.js)
- **FPS de animaciones**: 60 fps (usando CSS transform 3D)
- **Tiempo de compilación**: 30-60 segundos

### Optimizaciones Aplicadas

1. **CSS 3D transforms**: Hardware-accelerated
2. **Virtual scrolling**: NO necesario (44 cartas es manejable)
3. **Lazy loading**: NO necesario (app pequeña)
4. **Code splitting**: NO aplicado (bundle pequeño)
5. **localStorage**: Sincronización eficiente con React

---

## 🧪 Testing

### Testing Manual

```bash
# Modo desarrollo con hot-reload
npm run electron

# Verificar que funcionen:
# ✓ Selección de cartas (máx 1 por mazo)
# ✓ Revelar cartas con animación
# ✓ Resetear mazos con mezcla
# ✓ Configurar cartas personalizadas
# ✓ Modo oscuro
# ✓ Persistencia (cerrar y reabrir)
# ✓ Imágenes personalizadas
```

### Testing de Producción

```bash
# Compilar y probar ejecutable
npm run electron:build:linux
chmod +x release/Duetto-1.3.1.AppImage
./release/Duetto-1.3.1.AppImage
```

---

## 🐛 Debugging

### Herramientas de Desarrollo

```javascript
// Abrir DevTools en desarrollo
if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools();
}
```

### Logs

```bash
# Ver logs de Electron (Linux)
tail -f ~/.config/duetto/logs/main.log

# Ver logs de consola
# Abrir DevTools (F12) en la aplicación
```

### Problemas Comunes

**AppImage no ejecuta:**
```bash
# Verificar permisos
chmod +x Duetto-1.3.1.AppImage

# Verificar FUSE
sudo apt install fuse libfuse2
```

**Compilación falla en Linux:**
```bash
# Instalar dependencias faltantes
sudo apt install -y build-essential fakeroot rpm
npm install
```

**Error de Wine al compilar Windows desde Linux:**
```bash
# Reinstalar Wine
sudo apt remove --purge wine*
sudo apt install wine wine32 wine64
```

---

## 📦 Versionado

### Esquema Semántico (SemVer)

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └─── Bug fixes (1.2.0 → 1.2.1)
  │     └───────── Nuevas features (1.1.0 → 1.2.0)
  └─────────────── Cambios incompatibles (1.0.0 → 2.0.0)
```

### Historial de Versiones

- **v1.3.1** - Mejoras UX: Límite 1 carta por mazo, animaciones mejoradas, modo oscuro refinado
- **v1.2.0** - Mejoras UX y animaciones suaves
- **v1.1.0** - Soporte para imágenes personalizadas
- **v1.0.0** - Release inicial

---

## 🚀 Despliegue en GitHub Releases

### Proceso Automático

```bash
# 1. Compilar ejecutable
npm run electron:build:linux

# 2. Crear tag de versión
git tag v1.3.1

# 3. Push del tag
git push origin v1.3.1

# 4. Crear release con gh CLI
gh release create v1.3.1 \
  --title "Duetto v1.3.1" \
  --notes "Release notes aquí" \
  release/Duetto-1.3.1.AppImage
```

### Proceso Manual (GitHub Web)

1. Ir a `https://github.com/ravazque/duetto/releases/new`
2. Crear tag: `v1.3.1`
3. Release title: `Duetto v1.3.1`
4. Descripción de cambios
5. Adjuntar archivo: `Duetto-1.3.1.AppImage`
6. Publicar release

---

## 🔄 Actualización de Dependencias

```bash
# Verificar versiones desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (con cuidado)
npm install react@latest react-dom@latest
npm install electron@latest --save-dev
npm install electron-builder@latest --save-dev

# Verificar que todo funcione
npm run electron
```

---

## 📝 Notas de Desarrollo

### Convenciones de Código

- **Componentes**: PascalCase (`Card.jsx`, `DeckConfig.jsx`)
- **Funciones**: camelCase (`handleCardSelect`, `markResetting`)
- **CSS Classes**: kebab-case (`card-inner`, `deck-grid`)
- **Estados**: camelCase (`isShuffling`, `canFlipCards`)

### Git Workflow

```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad

# Commits descriptivos
git commit -m "feat: Añadir límite de 1 carta por mazo"
git commit -m "fix: Corregir animación de reseteo"
git commit -m "docs: Actualizar documentación técnica"

# Merge a main
git checkout main
git merge feature/nueva-funcionalidad

# Tag y release
git tag v1.3.1
git push origin main --tags
```

---
