# 📦 Ejecutables - Cartas Proyectivas v1.0.0

Esta carpeta contiene los ejecutables listos para usar de **Cartas Proyectivas**.

## 📥 Archivos Disponibles

### ✅ Linux
```
Cartas Proyectivas-1.0.0.AppImage
```
- **Tamaño**: ~114 MB
- **Formato**: AppImage (portable, no requiere instalación)
- **Compatible con**: Ubuntu, Debian, Fedora, Arch Linux, etc.

### 🚧 Windows (Próximamente)
```
Cartas Proyectivas Setup 1.0.0.exe
```
- **Formato**: Instalador NSIS
- **Requiere compilación desde Windows**

### 🚧 macOS (Próximamente)
```
Cartas Proyectivas-1.0.0.dmg
```
- **Formato**: Imagen de disco DMG
- **Requiere compilación desde macOS**

---

## 🚀 Instrucciones de Uso

### Linux (AppImage)

#### Método 1: Línea de Comandos
```bash
# Dar permisos de ejecución
chmod +x "Cartas Proyectivas-1.0.0.AppImage"

# Ejecutar
./"Cartas Proyectivas-1.0.0.AppImage"
```

#### Método 2: Interfaz Gráfica
1. Click derecho en el archivo
2. Seleccionar "Propiedades"
3. Ir a la pestaña "Permisos"
4. Marcar "Permitir ejecutar como programa"
5. Doble click en el archivo para ejecutar

#### Integración con el Sistema (Opcional)
Para añadir al menú de aplicaciones:
```bash
# Instalar AppImageLauncher (recomendado)
# Ubuntu/Debian
sudo apt install appimagelauncher

# Al ejecutar el AppImage por primera vez con AppImageLauncher instalado,
# se ofrecerá integrarlo automáticamente
```

### Windows (Cuando esté disponible)

```powershell
# Ejecutar el instalador
.\Cartas_Proyectivas_Setup_1.0.0.exe

# Seguir el asistente de instalación
# La aplicación se instalará en: C:\Program Files\Cartas Proyectivas\
```

### macOS (Cuando esté disponible)

```bash
# Abrir el archivo DMG
open Cartas-Proyectivas-1.0.0.dmg

# Arrastrar la aplicación a la carpeta Aplicaciones
# Ejecutar desde Launchpad
```

Si macOS bloquea la app por seguridad:
```bash
# Permitir manualmente
sudo xattr -rd com.apple.quarantine "/Applications/Cartas Proyectivas.app"
```

---

## 🔐 Verificación de Integridad

Verifica que el archivo descargado no esté corrupto:

### Linux/macOS
```bash
# Verificar checksum
sha256sum "Cartas Proyectivas-1.0.0.AppImage"

# Debe coincidir con:
ffb3c24dff88bca5d5957f99e4cb1c2c001fb35329bec835321b41afeb4f1a8e
```

### Windows (PowerShell)
```powershell
# Verificar checksum
Get-FileHash -Algorithm SHA256 "Cartas Proyectivas Setup 1.0.0.exe"

# Comparar con el checksum proporcionado
```

**Archivo de checksums**: Ver `checksum.txt` para todos los hashes.

---

## 💾 Persistencia de Datos

Los datos de la aplicación se guardan automáticamente en:

| Sistema | Ubicación |
|---------|-----------|
| **Linux** | `~/.config/cartas-proyectivas/` |
| **Windows** | `%APPDATA%\cartas-proyectivas\` |
| **macOS** | `~/Library/Application Support/cartas-proyectivas/` |

### Hacer Backup de tus Datos

```bash
# Linux
cp -r ~/.config/cartas-proyectivas ~/cartas-proyectivas-backup

# Windows (PowerShell)
Copy-Item -Recurse "$env:APPDATA\cartas-proyectivas" "$HOME\cartas-proyectivas-backup"

# macOS
cp -r ~/Library/Application\ Support/cartas-proyectivas ~/cartas-proyectivas-backup
```

### Restaurar Backup

```bash
# Linux
cp -r ~/cartas-proyectivas-backup ~/.config/cartas-proyectivas

# Windows (PowerShell)
Copy-Item -Recurse "$HOME\cartas-proyectivas-backup" "$env:APPDATA\cartas-proyectivas"

# macOS
cp -r ~/cartas-proyectivas-backup ~/Library/Application\ Support/cartas-proyectivas
```

---

## 🐛 Solución de Problemas

### Linux: "Permission denied"
```bash
chmod +x "Cartas Proyectivas-1.0.0.AppImage"
```

### Linux: "cannot execute binary file"
- Verifica que descargaste la versión correcta (64-bit)
- Asegúrate de tener un sistema de 64 bits: `uname -m` (debe mostrar x86_64)

### Linux: Error de dependencias
```bash
# Ubuntu/Debian
sudo apt-get install -y libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0

# Fedora
sudo dnf install -y libXtst nss atk at-spi2-atk gtk3

# Arch Linux
sudo pacman -S libxtst nss atk at-spi2-atk gtk3
```

### Linux: "No se puede ejecutar en modo sandbox"
```bash
# Ejecutar con --no-sandbox (menos seguro, usar solo si es necesario)
./"Cartas Proyectivas-1.0.0.AppImage" --no-sandbox
```

### Windows: "Windows protegió tu PC"
1. Click en "Más información"
2. Click en "Ejecutar de todas formas"
3. Esto es normal para aplicaciones sin firma digital

### macOS: "No se puede abrir porque proviene de un desarrollador no identificado"
```bash
# Método 1: Permitir en Preferencias del Sistema
# 1. Ir a: Preferencias del Sistema → Seguridad y Privacidad
# 2. Click en "Abrir de todas formas"

# Método 2: Terminal
sudo xattr -rd com.apple.quarantine "/Applications/Cartas Proyectivas.app"
```

### La aplicación no inicia
1. Verificar que tu sistema cumple los requisitos mínimos
2. Revisar los logs (ver sección siguiente)
3. Probar ejecutar desde terminal para ver errores

### Ver Logs de Errores

```bash
# Linux
./"Cartas Proyectivas-1.0.0.AppImage" 2>&1 | tee app-log.txt

# Windows (PowerShell)
& "C:\Program Files\Cartas Proyectivas\Cartas Proyectivas.exe" *> app-log.txt

# macOS
/Applications/Cartas\ Proyectivas.app/Contents/MacOS/Cartas\ Proyectivas 2>&1 | tee app-log.txt
```

---

## 📊 Información Técnica

### Tecnologías Incluidas
- Electron 39.2.3
- Chromium 132
- Node.js 20.x
- V8 JavaScript Engine

### Arquitectura
- **Soporte**: x86_64 (64-bit) únicamente
- **No compatible**: ARM, 32-bit

---

## 🔄 Actualización

### Actualización Manual
1. Descargar la nueva versión
2. Reemplazar el archivo antiguo
3. Tus datos se mantienen (están en una carpeta separada)

### Verificar Versión Actual
Abrir la aplicación → Menú Ayuda → Acerca de

---

## 📞 Soporte

Si tienes problemas:

1. Consultar la [Documentación Técnica](../docs/README_TECNICO.md)
2. Revisar las [Release Notes](../RELEASE_NOTES.md)
3. Reportar issue en GitHub con:
   - Sistema operativo y versión
   - Descripción del problema
   - Logs de error (si hay)

---

## 📄 Archivos Adicionales

```
release/
├── Cartas Proyectivas-1.0.0.AppImage    # Ejecutable Linux
├── checksum.txt                          # Hashes SHA-256
├── latest-linux.yml                      # Metadatos de actualización
├── builder-debug.yml                     # Info de compilación
├── linux-unpacked/                       # Archivos sin empaquetar (debug)
└── README.md                             # Este archivo
```

### Archivos de Metadatos

- **checksum.txt**: Contiene hashes SHA-256 de todos los ejecutables
- **latest-linux.yml**: Usado por sistemas de actualización automática
- **builder-debug.yml**: Información de debug de electron-builder

---

**Última actualización**: Noviembre 26, 2025
**Versión**: 1.0.0
**Build**: beta
