# 🪟 Compilar Ejecutable para Windows

## ✅ Verificación de Configuración

**La configuración por defecto ya está correcta:**
- ✅ 44 cartas en el mazo de Palabras
- ✅ 44 cartas en el mazo de Imágenes
- ✅ Sistema de guardado automático funcionando
- ✅ Persistencia de cambios entre ejecuciones

## 📋 Requisitos Previos

En tu ordenador **Windows**, necesitas tener instalado:
- Node.js (versión 16 o superior)
- Git (para clonar el repositorio)

## 🚀 Pasos para Compilar

### 1. Clonar el repositorio

Abre **PowerShell** o **CMD** y ejecuta:

```bash
cd C:\Users\TuUsuario\Desktop
git clone https://github.com/ravazque/projection-charts.git
cd projection-charts
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias (~5 minutos).

### 3. Compilar el ejecutable para Windows

```bash
npm run electron:build:win
```

Este proceso:
- Compilará la aplicación React
- Empaquetará con Electron
- Creará el ejecutable `.exe`
- **Tardará aproximadamente 5-10 minutos**

### 4. Encontrar el ejecutable

Una vez completado, el ejecutable estará en:

```
release/Cartas Proyectivas Setup 1.0.0.exe
```

**Tamaño aproximado**: ~100-150 MB

## 📤 Subir el Ejecutable al Release de GitHub

### Opción 1: Interfaz Web (Más Fácil)

1. Ve a: https://github.com/ravazque/projection-charts/releases/tag/v1.0.0
2. Click en **Edit release**
3. Arrastra el archivo `Cartas Proyectivas Setup 1.0.0.exe` a la sección de assets
4. Click en **Update release**

### Opción 2: GitHub CLI (PowerShell)

Si tienes GitHub CLI instalado en Windows:

```powershell
# Instalar GitHub CLI (si no lo tienes)
winget install --id GitHub.cli

# Autenticarse (solo la primera vez)
gh auth login

# Subir el ejecutable al release existente
gh release upload v1.0.0 "release/Cartas Proyectivas Setup 1.0.0.exe"
```

## ✅ Verificar el Ejecutable

Antes de subir, verifica que funcione:

1. Navega a la carpeta `release`
2. Ejecuta el instalador `Cartas Proyectivas Setup 1.0.0.exe`
3. Instala la aplicación
4. Abre la aplicación
5. Verifica que:
   - Se muestren 44 cartas en cada mazo
   - Puedes seleccionar y voltear cartas
   - Puedes editar cartas desde ⚙️
   - Los cambios se guardan al cerrar y abrir la app

## 🐛 Solución de Problemas

### Error: "node-gyp"
```bash
npm install --global windows-build-tools
npm install
npm run electron:build:win
```

### Error: "electron-builder"
```bash
npm install electron-builder --save-dev
npm run electron:build:win
```

### El ejecutable no se crea
1. Elimina la carpeta `node_modules`
2. Elimina `package-lock.json`
3. Ejecuta `npm install` de nuevo
4. Ejecuta `npm run electron:build:win`

## 📝 Notas Importantes

- **El ejecutable de Windows SOLO puede compilarse desde Windows**
- La primera compilación es más lenta (descarga dependencias)
- Las siguientes compilaciones serán más rápidas
- El ejecutable incluye Node.js y Chromium, por eso es grande
- No necesitas instalar nada extra para que funcione en otros PCs Windows
