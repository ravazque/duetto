# 🎴 Duetto

Aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards. Duetto combina mazos de palabras e imágenes para facilitar procesos terapéuticos y de autoconocimiento.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey)

---

## 📥 Descargar Duetto

Descarga el ejecutable para tu sistema operativo desde [GitHub Releases](https://github.com/ravazque/projection-charts/releases/latest):

### Windows
```
Duetto-Setup-1.2.0.exe
```
**Instalación:**
1. Descarga el instalador `.exe`
2. Ejecuta el archivo descargado
3. Sigue el asistente de instalación
4. Lanza Duetto desde el menú de inicio o el acceso directo del escritorio

### Linux
```
Duetto-1.2.0.AppImage
```
**Instalación:**
```bash
# Descarga el archivo .AppImage
# Dale permisos de ejecución
chmod +x Duetto-1.2.0.AppImage

# Ejecuta la aplicación
./Duetto-1.2.0.AppImage
```

**Compatibilidad Linux:** Funciona en la mayoría de distribuciones modernas (Ubuntu 18.04+, Fedora 28+, Debian 10+, Arch, etc.)

---

## ✨ Características Principales

### 🎴 Dos Mazos de Cartas

Duetto incluye dos mazos complementarios:

- **Mazo de Palabras (44 cartas)**: Conceptos, emociones y arquetipos verbales
  - AMOR, MIEDO, ESPERANZA, SOLEDAD, LIBERTAD, ALEGRÍA, TRISTEZA, FAMILIA
  - FUERZA, PAZ, CONFIANZA, CAMBIO, DOLOR, VALENTÍA, FUTURO, PASADO
  - Y 28 palabras más cuidadosamente seleccionadas

- **Mazo de Imágenes (44 cartas)**: Símbolos visuales universales
  - Elementos naturales: 🌅 🌊 🏔️ 🌳 🌸 🔥 💧 🌈
  - Seres vivos: 🦋 🦅 🕊️ 🐚 🐝 🐞
  - Y 30 símbolos adicionales para exploración proyectiva

### 💾 Persistencia Automática

- **Guardado automático de cambios**: Todas las modificaciones que hagas a los mazos se guardan automáticamente
- **Configuración personalizada persistente**: Tus cartas personalizadas permanecen entre sesiones
- **Sin necesidad de "Guardar"**: La aplicación gestiona el almacenamiento de forma transparente

**Ubicación de los datos:**
- Windows: `%APPDATA%\duetto\`
- Linux: `~/.config/duetto/`

### ⚙️ Totalmente Personalizable

- **Añade nuevas cartas**: Expande los mazos con tus propias palabras o emojis
- **Edita cartas existentes**: Modifica el contenido de cualquier carta
- **Elimina cartas**: Reduce los mazos según tus necesidades terapéuticas
- **Ajusta la cantidad**: Desde 10 hasta 100+ cartas por mazo

### 🔄 Mezcla Aleatoria

- **Barajado automático**: Los mazos se mezclan aleatoriamente al reiniciar la sesión
- **Algoritmo Fisher-Yates**: Garantiza una distribución uniforme y aleatoria real
- **Reinicio manual**: Botón "Reiniciar / Mezclar" disponible en cualquier momento

### 🖥️ Funcionamiento Offline

- **Sin internet necesario**: Toda la aplicación funciona localmente
- **Privacidad total**: Ningún dato se envía a servidores externos
- **Rendimiento óptimo**: No depende de conexión a internet

### 🎯 Interfaz Intuitiva

- **Scroll horizontal**: Navega fácilmente por todos los mazos
- **Selección visual**: Las cartas seleccionadas muestran ✓ verde
- **Revelado progresivo**: Voltea solo las cartas que necesites
- **Contador de cartas**: Indicadores visuales de cartas seleccionadas y volteadas

---

## 🎮 Cómo Usar Duetto

### Flujo de Trabajo Básico

1. **Selecciona cartas**
   - Haz clic en las cartas que desees de cualquier mazo
   - Verás un ✓ verde en las cartas seleccionadas
   - Puedes seleccionar cartas de ambos mazos simultáneamente

2. **Voltear cartas**
   - Presiona el botón "🎴 Revelar"
   - Las cartas seleccionadas se voltearán mostrando su contenido
   - Las cartas reveladas se moverán al inicio para facilitar la visualización

3. **Reiniciar sesión**
   - Usa "🔄 Reiniciar / Mezclar" para barajar los mazos
   - Todas las cartas vuelven a estado boca abajo
   - El orden se aleatoriza completamente

4. **Configurar mazos**
   - Presiona "⚙️" para abrir el panel de configuración
   - Edita, añade o elimina cartas según necesites
   - Los cambios se guardan automáticamente

### Casos de Uso

**Terapia individual:**
- Cliente selecciona cartas que resuenan con su situación actual
- Combina palabra + imagen para profundizar en significados
- Usa las cartas como disparadores de conversación

**Terapia de pareja:**
- Cada persona selecciona cartas por separado
- Comparen y discutan las elecciones
- Encuentren puentes entre perspectivas diferentes

**Autoexploración:**
- Selecciona 3-5 cartas aleatoriamente
- Reflexiona sobre qué significan para ti hoy
- Registra insights en un diario terapéutico

---

## 📋 Requisitos del Sistema

### Windows
- **Sistema Operativo**: Windows 10 o superior (64-bit)
- **Procesador**: Intel Core i3 o equivalente
- **RAM**: 2 GB mínimo, 4 GB recomendado
- **Espacio en disco**: 300 MB libres
- **Pantalla**: 1280x720 resolución mínima

### Linux
- **Sistema Operativo**: Distribución con Kernel 3.10+
- **Procesador**: Intel Core i3 o equivalente
- **RAM**: 2 GB mínimo, 4 GB recomendado
- **Espacio en disco**: 300 MB libres
- **Pantalla**: 1280x720 resolución mínima
- **Librerías**: GLIBC 2.28+ (incluido en distros modernas)

---

## 👨‍💻 Para Desarrolladores

¿Quieres modificar Duetto, compilar desde el código fuente o contribuir al desarrollo?

### Instalación para Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/ravazque/projection-charts.git
cd projection-charts

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run electron
```

### Compilar Ejecutables

```bash
# Linux (desde cualquier sistema)
npm run electron:build:linux

# Windows (SOLO desde Windows)
npm run electron:build:win

# macOS (SOLO desde macOS - próximamente)
npm run electron:build:mac
```

**Limitaciones de electron-builder:**
- Ejecutables Windows solo pueden compilarse desde Windows
- Ejecutables macOS solo pueden compilarse desde macOS
- Ejecutables Linux pueden compilarse desde cualquier sistema

Los ejecutables compilados se generan en la carpeta `release/`.

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo web (Vite) |
| `npm run electron` | Ejecutar como aplicación Electron en desarrollo |
| `npm run build` | Compilar aplicación React para producción |
| `npm run electron:build:linux` | Crear ejecutable Linux (.AppImage) |
| `npm run electron:build:win` | Crear ejecutable Windows (.exe) |

### Estructura del Proyecto

```
duetto/
├── src/                          # Código fuente React
│   ├── components/               # Componentes React
│   │   ├── Card.jsx             # Componente individual de carta
│   │   ├── Deck.jsx             # Componente mazo de cartas
│   │   ├── ControlPanel.jsx    # Panel de botones principales
│   │   └── DeckConfig.jsx       # Panel de configuración
│   ├── data/
│   │   └── cardsData.js         # Datos de las 88 cartas (44+44)
│   ├── App.jsx                  # Componente principal
│   ├── App.css                  # Estilos globales
│   └── main.jsx                 # Punto de entrada React
├── build/                       # Recursos de compilación
│   └── icon.png                 # Icono de la aplicación (1024x1024)
├── docs/                        # Documentación técnica
│   ├── README_TECNICO.md        # Guía técnica detallada
│   ├── INSTRUCCIONES_RAPIDAS.txt
│   ├── COMPILAR_WINDOWS.md         # Guía para compilar en Windows
│   └── INSTALAR_NODEJS_WINDOWS.md  # Guía instalación Node.js Windows
├── release/                     # Ejecutables compilados (no en repo)
├── electron.js                  # Configuración Electron
├── package.json                 # Dependencias y configuración
├── vite.config.js              # Configuración Vite
├── index.html                   # HTML principal
└── README.md                    # Este archivo
```

### Stack Tecnológico

- **Frontend**: React 18 con hooks
- **Build tool**: Vite 5 (desarrollo rápido con HMR)
- **Desktop**: Electron 39
- **Build system**: electron-builder 26
- **Estilos**: CSS puro (sin preprocessadores)
- **Almacenamiento**: localStorage (Electron)

### Arquitectura de Datos

**Flujo de persistencia:**
1. Usuario modifica cartas en el configurador
2. `App.jsx` actualiza el estado con `useState`
3. `useEffect` detecta cambios y guarda en localStorage
4. Al reiniciar, `loadSavedCards()` carga desde localStorage
5. Si no hay datos guardados, usa `cardsData.js` por defecto

**Estados de las cartas:**
- `faceDown`: Carta boca abajo (inicial)
- `selected`: Carta seleccionada pero no volteada (✓ verde)
- `flipped`: Carta volteada mostrando contenido

---

## 📖 Documentación Adicional

- **[Documentación Técnica Completa](docs/README_TECNICO.md)**: Arquitectura interna, API de componentes, guía de desarrollo
- **[Instrucciones de Compilación Windows](docs/COMPILAR_WINDOWS.md)**: Guía paso a paso para crear el ejecutable Windows
- **[Instalación Node.js en Windows](docs/INSTALAR_NODEJS_WINDOWS.md)**: Cómo instalar las herramientas de desarrollo

---

## ❓ Preguntas Frecuentes

### ¿Duetto envía mis datos a algún servidor?

No. Duetto funciona completamente offline. Todos tus datos se almacenan localmente en tu ordenador. No hay conexión a servidores externos.

### ¿Puedo usar Duetto en consulta online?

Sí, pero necesitarás compartir pantalla con tu cliente. Duetto está diseñado para uso local, no es una aplicación web colaborativa.

### ¿Cuántas cartas puedo tener en cada mazo?

No hay límite técnico, pero la interfaz está optimizada para 20-60 cartas por mazo. Puedes añadir tantas como necesites.

### ¿Puedo exportar o imprimir las cartas?

En la versión 1.0.0 no incluye exportación. Esta funcionalidad está planificada para versiones futuras.

### ¿Cómo desinstalo Duetto?

- **Windows**: Panel de Control → Programas → Desinstalar Duetto
- **Linux**: Simplemente elimina el archivo `.AppImage`

Para eliminar los datos guardados:
- **Windows**: Elimina `%APPDATA%\duetto\`
- **Linux**: Elimina `~/.config/duetto/`

### ¿Funcionará en macOS?

La versión para macOS está en desarrollo. Sigue el repositorio para actualizaciones.

---

## 🐛 Solución de Problemas

### Windows: "Windows protegió tu PC"

Esto es normal en aplicaciones sin firma digital costosa. Click en "Más información" → "Ejecutar de todos modos".

### Linux: El AppImage no ejecuta

```bash
# Asegúrate de tener permisos
chmod +x Duetto-1.2.0.AppImage

# Si falla, prueba con:
./Duetto-1.2.0.AppImage --no-sandbox
```

### Los cambios no se guardan

Verifica que la aplicación tenga permisos de escritura en:
- Windows: `%APPDATA%`
- Linux: `~/.config/`

### La aplicación no inicia

1. Verifica que cumples los requisitos mínimos del sistema
2. Intenta reinstalar la aplicación
3. Elimina los datos guardados y vuelve a intentar

---

## 🔗 Enlaces

- **Repositorio**: https://github.com/ravazque/projection-charts
- **Releases**: https://github.com/ravazque/projection-charts/releases
- **Issues**: https://github.com/ravazque/projection-charts/issues

---

**Duetto v1.2.0** | React + Electron | 2025
