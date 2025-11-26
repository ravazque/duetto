# 🏗️ Guía de Compilación - Cartas Proyectivas

Esta guía explica cómo compilar ejecutables para diferentes sistemas operativos.

## ⚠️ Limitaciones Importantes de electron-builder

**electron-builder** tiene restricciones de compilación cruzada:

| Sistema Objetivo | Se puede compilar desde... |
|------------------|---------------------------|
| Windows (.exe, .nsis) | ✅ Windows, ⚠️ Linux (limitado) |
| macOS (.dmg, .app) | ✅ macOS solamente |
| Linux (.AppImage, .deb) | ✅ Cualquier sistema |

### Explicación Detallada

#### Windows
- **Desde Windows**: Funciona perfectamente
- **Desde macOS/Linux**: Posible pero complicado, requiere Wine y configuración adicional
- **Recomendación**: Compilar desde Windows nativo o máquina virtual Windows

#### macOS
- **Desde macOS**: Funciona perfectamente
- **Desde Windows/Linux**: ❌ **NO POSIBLE**
- **Razón**: Requiere herramientas específicas de Apple (Xcode, codesign)
- **Recomendación**: Compilar desde macOS nativo o usar servicio CI/CD con macOS

#### Linux
- **Desde cualquier sistema**: ✅ Funciona perfectamente
- **Formatos**: AppImage, deb, rpm, snap

## 📋 Requisitos Previos

### Para Todos los Sistemas

```bash
# Node.js 16+ requerido
node --version  # Debe mostrar v16.0.0 o superior

# Instalar dependencias
npm install
```

### Requisitos Específicos por Sistema

#### Windows
```powershell
# No requiere instalaciones adicionales
# Ejecutar desde PowerShell o CMD como Administrador
```

#### macOS
```bash
# Xcode Command Line Tools
xcode-select --install

# Verificar que esté instalado
xcode-select -p
```

#### Linux
```bash
# Dependencias del sistema (Ubuntu/Debian)
sudo apt-get install -y libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libgbm1

# Fedora/RHEL
sudo dnf install -y libXtst nss atk at-spi2-atk gtk3

# Arch Linux
sudo pacman -S libxtst nss atk at-spi2-atk gtk3
```

## 🔨 Compilar Ejecutables

### 1. Compilar para Linux (.AppImage)

```bash
# Funciona desde cualquier sistema
npm run electron:build:linux
```

**Resultado**: `release/Cartas Proyectivas-1.0.0.AppImage` (≈114 MB)

**Verificación**:
```bash
# Dar permisos
chmod +x "release/Cartas Proyectivas-1.0.0.AppImage"

# Ejecutar
./release/Cartas\ Proyectivas-1.0.0.AppImage
```

### 2. Compilar para Windows (.exe)

#### Opción A: Desde Windows (Recomendado)

```powershell
# Ejecutar desde PowerShell/CMD
npm run electron:build:win
```

**Resultado**: `release/Cartas Proyectivas Setup 1.0.0.exe`

#### Opción B: Desde Linux (Avanzado)

Requiere configuración adicional con Wine:

```bash
# Instalar Wine
sudo apt-get install wine64

# Configurar electron-builder para usar Wine
npm run electron:build:win
```

⚠️ **Advertencia**: Esta opción puede fallar o producir ejecutables con problemas. Se recomienda compilar desde Windows nativo.

### 3. Compilar para macOS (.dmg)

#### ❌ Solo desde macOS

```bash
# SOLO funciona en macOS
npm run electron:build:mac
```

**Resultado**: `release/Cartas Proyectivas-1.0.0.dmg`

Si intentas compilar desde Windows/Linux:
```
Error: Cannot build for macOS on a non-macOS platform
```

**Alternativa**: Usar servicios CI/CD:
- GitHub Actions con `macos-latest`
- CircleCI con macOS executors
- Travis CI con macOS

### 4. Compilar para Todos (Automático)

```bash
npm run electron:build
```

Compilará solo los formatos compatibles con tu sistema actual.

## 📦 Formatos de Distribución

### Windows

| Formato | Descripción | Comando |
|---------|-------------|---------|
| **NSIS** | Instalador completo con asistente | Por defecto |
| **Portable** | Ejecutable sin instalación | Requiere configuración |
| **MSI** | Instalador para empresas | Requiere configuración |

### macOS

| Formato | Descripción | Comando |
|---------|-------------|---------|
| **DMG** | Imagen de disco (recomendado) | Por defecto |
| **PKG** | Instalador tradicional | Requiere configuración |
| **ZIP** | Archivo comprimido | Requiere configuración |

### Linux

| Formato | Descripción | Comando |
|---------|-------------|---------|
| **AppImage** | Ejecutable universal (recomendado) | Por defecto |
| **DEB** | Para Debian/Ubuntu | `--linux deb` |
| **RPM** | Para Fedora/RHEL | `--linux rpm` |
| **Snap** | Para Snappy | `--linux snap` |

## 🎯 Compilación Multiplataforma

### Estrategia Recomendada

1. **Linux**: Compilar desde cualquier sistema
2. **Windows**: Compilar desde máquina Windows o VM
3. **macOS**: Compilar desde macOS o usar CI/CD

### Usando CI/CD (GitHub Actions)

Crea `.github/workflows/build.yml`:

```yaml
name: Build Executables

on:
  push:
    tags:
      - 'v*'

jobs:
  build-linux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run electron:build:linux
      - uses: actions/upload-artifact@v3
        with:
          name: linux-build
          path: release/*.AppImage

  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run electron:build:win
      - uses: actions/upload-artifact@v3
        with:
          name: windows-build
          path: release/*.exe

  build-macos:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run electron:build:mac
      - uses: actions/upload-artifact@v3
        with:
          name: macos-build
          path: release/*.dmg
```

## 🔍 Verificación de Ejecutables

### Checksum (Integridad)

```bash
# Generar SHA256
sha256sum "release/Cartas Proyectivas-1.0.0.AppImage"

# Verificar
sha256sum -c checksum.txt
```

### Verificar Tamaño

```bash
# Linux/macOS
ls -lh release/

# Windows
dir release\
```

**Tamaños esperados**:
- Linux AppImage: 100-150 MB
- Windows Installer: 80-120 MB
- macOS DMG: 100-150 MB

### Probar Ejecutable

```bash
# Linux
./release/Cartas\ Proyectivas-1.0.0.AppImage

# Windows
start "release/Cartas Proyectivas Setup 1.0.0.exe"

# macOS
open "release/Cartas Proyectivas-1.0.0.dmg"
```

## 🐛 Solución de Problemas

### Error: "Cannot build for macOS"
**Causa**: Intentando compilar para macOS desde Windows/Linux
**Solución**: Usar macOS nativo o CI/CD

### Error: "Command failed: wine"
**Causa**: Wine no instalado o mal configurado
**Solución**: Compilar Windows desde Windows nativo

### Error: "ENOSPC: no space left on device"
**Causa**: Poco espacio en disco
**Solución**: Liberar al menos 2 GB de espacio

### Error: "electron-builder not found"
**Causa**: Dependencias no instaladas
**Solución**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Compilación muy lenta
**Solución**:
```bash
# Deshabilitar compresión (más rápido, archivos más grandes)
npm run electron:build:linux -- --dir
```

## 📊 Optimización

### Reducir Tamaño del Ejecutable

1. **Excluir archivos innecesarios** (package.json):
```json
"build": {
  "files": [
    "dist/**/*",
    "electron.js",
    "package.json"
  ],
  "extraFiles": []
}
```

2. **Comprimir assets**:
```bash
# Optimizar imágenes antes de compilar
npm install -g imagemin-cli
imagemin src/assets/* --out-dir=src/assets/
```

### Acelerar Compilación

```bash
# Usar caché
electron-builder --config.electronDist=node_modules/electron/dist
```

## 📝 Checklist de Release

- [ ] Actualizar versión en `package.json`
- [ ] Compilar para Linux
- [ ] Compilar para Windows (desde Windows)
- [ ] Compilar para macOS (desde macOS)
- [ ] Generar checksums SHA256
- [ ] Probar cada ejecutable
- [ ] Crear tag de Git
- [ ] Subir ejecutables a GitHub Releases
- [ ] Actualizar README con enlaces de descarga

## 🔗 Recursos Adicionales

- [electron-builder Docs](https://www.electron.build/)
- [Multi Platform Build](https://www.electron.build/multi-platform-build)
- [GitHub Actions for Electron](https://github.com/samuelmeuli/action-electron-builder)

---

**Última actualización**: Noviembre 2025
