# 🎴 Cartas Proyectivas

> Aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## 📥 Descarga Rápida

**¿Solo quieres usar la aplicación?** Descarga el ejecutable para tu sistema operativo:

- **Windows**: `Cartas-Proyectivas-Setup-1.0.0.exe` *(Próximamente)*
- **macOS**: `Cartas-Proyectivas-1.0.0.dmg` *(Próximamente)*
- **Linux**: [`Cartas-Proyectivas-1.0.0.AppImage`](release/Cartas%20Proyectivas-1.0.0.AppImage) ✅ **Disponible**

### Instrucciones de Instalación

#### Linux
```bash
# Descarga el archivo .AppImage
# Dale permisos de ejecución
chmod +x Cartas-Proyectivas-1.0.0.AppImage

# Ejecuta la aplicación
./Cartas-Proyectivas-1.0.0.AppImage
```

#### Windows *(Próximamente)*
```
1. Descarga el instalador .exe
2. Ejecuta el archivo
3. Sigue el asistente de instalación
```

#### macOS *(Próximamente)*
```
1. Descarga el archivo .dmg
2. Abre el archivo
3. Arrastra la aplicación a la carpeta Aplicaciones
```

---

## ✨ Características

- 🎴 **Dos mazos de cartas**: Palabras (44 cartas) e Imágenes (44 cartas)
- 💾 **Persistencia automática**: Tus cambios se guardan automáticamente entre sesiones
- ⚙️ **Totalmente personalizable**: Añade, edita o elimina cartas desde la interfaz
- 🔄 **Mezcla aleatoria**: Las cartas se barajan automáticamente al reiniciar
- 🖥️ **Funciona offline**: Aplicación de escritorio que no requiere internet

## 🎮 Cómo Usar

1. **Selecciona cartas**: Haz clic en las cartas que desees (aparecerá ✓ verde)
2. **Voltear**: Presiona "🎴 Revelar" para ver el contenido
3. **Reiniciar**: Usa "🔄 Reiniciar / Mezclar" para barajar
4. **Configurar**: Presiona "⚙️" para gestionar tus cartas

## 💾 Persistencia de Datos

✅ **Todo se guarda automáticamente:**
- Cartas personalizadas que agregues
- Modificaciones a cartas existentes
- Cantidad de cartas por mazo

Los datos persisten entre ejecuciones de la aplicación. Se almacenan localmente en tu equipo usando la tecnología de localStorage de Electron.

### Ubicación de los Datos

Los datos se guardan en:
- **Linux**: `~/.config/cartas-proyectivas/`
- **Windows**: `%APPDATA%\cartas-proyectivas\`
- **macOS**: `~/Library/Application Support/cartas-proyectivas/`

---

## 👨‍💻 Para Desarrolladores

¿Quieres modificar o compilar la aplicación? Consulta la [Documentación Técnica](docs/README_TECNICO.md).

### Instalación para Desarrollo

```bash
# Clonar el repositorio
git clone <tu-repo>
cd ariarcos

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run electron
```

### Compilar Ejecutables

```bash
# Linux
npm run electron:build:linux

# Windows (solo desde Windows)
npm run electron:build:win

# macOS (solo desde macOS)
npm run electron:build:mac
```

**Nota importante**: Debido a limitaciones de electron-builder:
- Los ejecutables de **Windows** solo pueden compilarse desde Windows
- Los ejecutables de **macOS** solo pueden compilarse desde macOS
- Los ejecutables de **Linux** pueden compilarse desde cualquier sistema

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo web |
| `npm run electron` | Ejecutar como aplicación de escritorio |
| `npm run build` | Compilar para producción |
| `npm run electron:build:linux` | Crear ejecutable Linux (.AppImage) |
| `npm run electron:build:win` | Crear ejecutable Windows (.exe) |
| `npm run electron:build:mac` | Crear ejecutable macOS (.dmg) |

## 📁 Estructura del Proyecto

```
ariarcos/
├── src/                    # Código fuente React
│   ├── components/         # Componentes React
│   ├── data/              # Datos de las cartas
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
├── build/                 # Recursos para compilación
│   └── icon.png           # Icono de la aplicación
├── docs/                  # Documentación
│   ├── README_TECNICO.md  # Guía técnica completa
│   └── INSTRUCCIONES_RAPIDAS.txt  # Guía de inicio rápido
├── release/               # Ejecutables compilados
├── electron.js            # Configuración de Electron
├── package.json           # Dependencias y scripts
└── vite.config.js         # Configuración de Vite
```

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Desktop**: Electron
- **Estilos**: CSS puro
- **Build**: electron-builder

## 📖 Documentación Adicional

- [Documentación Técnica Completa](docs/README_TECNICO.md) - Arquitectura, desarrollo y API
- [Instrucciones Rápidas](docs/INSTRUCCIONES_RAPIDAS.txt) - Guía de inicio rápido

## ❓ Soporte

Si tienes problemas:

1. **Ejecutable no inicia**: Verifica que tengas los permisos necesarios
2. **Datos no se guardan**: Comprueba que la aplicación tenga permisos de escritura
3. **Errores al compilar**: Revisa la [documentación técnica](docs/README_TECNICO.md)

## 🤝 Contribuciones

Este es un proyecto freelance personalizado. Para contribuciones o mejoras, contacta al desarrollador.

## 📄 Licencia

Este proyecto es privado y de uso personalizado.

## 🎯 Roadmap

- [x] Aplicación base con dos mazos
- [x] Persistencia de datos
- [x] Ejecutable para Linux
- [ ] Ejecutables para Windows y macOS
- [ ] Exportar sesiones a PDF
- [ ] Historial de sesiones
- [ ] Modo oscuro

---

**Desarrollado con ❤️ usando React + Electron**
