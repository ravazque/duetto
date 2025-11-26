# 🎴 Cartas Proyectivas - Aplicación de Escritorio

Aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards.

## 📋 Descripción del Proyecto

Esta aplicación permite a terapeutas trabajar con cartas proyectivas digitales. Incluye dos mazos:
- **Mazo de Palabras**: 44 cartas con palabras (88 total entre ambos mazos)
- **Mazo de Imágenes**: 44 cartas con imágenes

### ✨ Características Nuevas
- **💾 Persistencia de datos**: Tus cartas personalizadas se guardan automáticamente
- **🖥️ Aplicación de escritorio**: Funciona offline con Electron
- **⚙️ Configuración flexible**: Añade, edita o elimina cartas desde la interfaz
- **🔄 Mezcla aleatoria**: Baraja automáticamente al reiniciar

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install
```

### Modo Desarrollo Web

```bash
# Iniciar servidor de desarrollo web
npm run dev
# Se abrirá automáticamente en http://localhost:3000
```

### Modo Electron (Aplicación de Escritorio)

```bash
# Ejecutar como aplicación de escritorio
npm run electron
```

## 📦 Crear Ejecutable

### Windows (.exe)
```bash
npm run electron:build:win
```
**Resultado**: `release/Cartas Proyectivas Setup 1.0.0.exe`

### macOS (.dmg)
```bash
npm run electron:build:mac
```
**Resultado**: `release/Cartas Proyectivas-1.0.0.dmg`

### Linux (.AppImage)
```bash
npm run electron:build:linux
```
**Resultado**: `release/Cartas Proyectivas-1.0.0.AppImage`

### Todas las plataformas
```bash
npm run electron:build
```

## 🎮 Cómo Usar la Aplicación

1. **Seleccionar cartas**: Haz clic en las cartas que desees (aparecerá un ✓ verde)
2. **Voltear**: Presiona el botón "🎴 Revelar" para ver el contenido
3. **Reiniciar**: Usa "🔄 Reiniciar / Mezclar" para barajar las cartas
4. **Configurar**: Presiona "⚙️" para añadir, editar o eliminar cartas

## 💾 Persistencia de Datos

La aplicación guarda automáticamente:
- ✅ Cartas personalizadas que agregues
- ✅ Modificaciones a cartas existentes
- ✅ Cantidad de cartas por mazo

Los datos persisten entre sesiones de la aplicación.

### Resetear Configuración

Para volver a las cartas por defecto:
1. Abre las **DevTools** (F12)
2. Ve a **Application** > **Local Storage**
3. Elimina las entradas `wordCards` e `imageCards`
4. Recarga la aplicación

## 📝 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo web (puerto 3000) |
| `npm run build` | Compila la aplicación React para producción |
| `npm run electron` | Ejecuta como aplicación de escritorio (desarrollo) |
| `npm run electron:build` | Compila ejecutable para tu sistema operativo |
| `npm run electron:build:win` | Compila ejecutable para Windows (.exe) |
| `npm run electron:build:mac` | Compila ejecutable para macOS (.dmg) |
| `npm run electron:build:linux` | Compila ejecutable para Linux (.AppImage) |

## 🎨 Personalizar Ícono

1. Crea un ícono PNG de **512x512 píxeles**
2. Guárdalo como `build/icon.png`
3. El ícono se usará automáticamente al compilar el ejecutable

## 📁 Estructura del Proyecto

```
ariarcos/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Card.jsx         # Carta individual
│   │   ├── Card.css
│   │   ├── Deck.jsx         # Mazo de cartas
│   │   ├── Deck.css
│   │   ├── ControlPanel.jsx # Panel de control
│   │   └── ControlPanel.css
│   ├── data/
│   │   └── cardsData.js     # Datos de las cartas
│   ├── App.jsx              # Componente principal
│   ├── App.css
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🏗️ Arquitectura de Componentes

### App.jsx (Componente Principal)
- Maneja el estado global de todas las cartas
- Coordina la interacción entre componentes
- Gestiona la lógica de selección y volteo

### Deck.jsx
- Muestra un mazo completo de cartas
- Renderiza una grid responsive
- Recibe: título, array de cartas, función de selección

### Card.jsx
- Representa una carta individual
- Maneja 3 estados: faceDown, selected, flipped
- Animación 3D de volteo
- Indicador visual de selección

### ControlPanel.jsx
- Panel de control con botones
- Muestra contador de cartas seleccionadas
- Instrucciones para el usuario

## 🔄 Flujo de Estados

Cada carta pasa por estos estados:

```
faceDown → selected → flipped
   ↑          ↓
   ← (click) ←
```

1. **faceDown**: Estado inicial, carta boca abajo
2. **selected**: Carta seleccionada pero aún boca abajo (con ✓)
3. **flipped**: Carta volteada mostrando contenido

## 💾 Estructura de Datos

```javascript
{
  id: 'w1',              // ID único
  type: 'word',          // 'word' o 'image'
  content: 'AMOR',       // Contenido (palabra o URL de imagen)
  state: 'faceDown'      // Estado actual
}
```

## 🎨 Personalización

### Agregar Más Cartas

Edita `src/data/cardsData.js`:

```javascript
export const wordCards = [
  { id: 'w1', type: 'word', content: 'TU_PALABRA', state: 'faceDown' },
  { id: 'w2', type: 'word', content: 'OTRA_PALABRA', state: 'faceDown' },
  // ... hasta 88 cartas
];
```

### Usar Imágenes Reales

1. Crea carpeta `public/images/`
2. Coloca tus imágenes (ej: `card-01.jpg`)
3. En `cardsData.js`:

```javascript
export const imageCards = [
  { id: 'i1', type: 'image', content: '/images/card-01.jpg', state: 'faceDown' },
  { id: 'i2', type: 'image', content: '/images/card-02.jpg', state: 'faceDown' },
];
```

### Cambiar Colores

Edita los gradientes en los archivos CSS:
- `src/index.css`: Color de fondo principal
- `src/components/Card.css`: Reverso de cartas
- `src/components/ControlPanel.css`: Botones

## ⚠️ Warnings y Consideraciones

### Problemas Comunes

1. **Las cartas no se voltean**
   - Verifica que el estado cambie correctamente en DevTools
   - Revisa que las clases CSS se apliquen

2. **Imágenes no se muestran**
   - Asegúrate de que las rutas sean correctas
   - Coloca imágenes en carpeta `public/`

3. **Responsive no funciona bien**
   - Prueba en diferentes tamaños con DevTools
   - Ajusta breakpoints en archivos CSS

### Rendimiento

- Con 176 cartas (88 + 88), el rendimiento es óptimo
- Si notas lag, considera:
  - Lazy loading de imágenes
  - Virtualización de la grid
  - Optimizar tamaño de imágenes

### Seguridad

- Esta demo NO incluye autenticación
- NO almacena datos del paciente
- Para uso profesional, considera:
  - Backend con Node.js/Express
  - Base de datos (MongoDB/PostgreSQL)
  - Autenticación de usuarios
  - Encriptación de datos sensibles

## 🛠️ Próximos Pasos Sugeridos

### Para la versión completa (después de la demo):

1. **Backend**
   - API REST con Express.js
   - Base de datos para sesiones
   - Autenticación de terapeutas

2. **Funcionalidades**
   - Guardar sesiones de terapia
   - Exportar resultados a PDF
   - Historial de pacientes
   - Notas del terapeuta

3. **UI/UX**
   - Modo oscuro
   - Animaciones mejoradas
   - Sonidos de cartas
   - Zoom en cartas

4. **Deployment**
   - Vercel (frontend)
   - Railway/Render (backend)
   - Cloudinary (imágenes)

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Móviles iOS/Android

## 🐛 Solución de Problemas

### Electron no inicia
- Asegúrate de que el **puerto 3000** esté libre
- Verifica que todas las dependencias estén instaladas: `npm install`
- Intenta eliminar `node_modules` y reinstalar: `rm -rf node_modules && npm install`

### El build falla
- Asegúrate de tener **espacio suficiente en disco** (1-2 GB)
- En Windows, ejecuta la terminal **como administrador**
- Verifica que el ícono `build/icon.png` exista (o elimina la referencia en `package.json`)

### Los cambios no se guardan
- Verifica que localStorage esté habilitado
- Revisa la consola (F12) en busca de errores
- Intenta limpiar localStorage y recargar

### Error: "electron: command not found"
```bash
# Reinstala Electron
npm install --save-dev electron@latest --legacy-peer-deps
```

### Error al compilar en Linux
```bash
# Instala dependencias del sistema
sudo apt-get install -y libxtst6 libnss3
```

## 🤝 Soporte

Si tienes problemas:
1. Revisa la consola del navegador/Electron (F12 o Ctrl+Shift+I)
2. Verifica que node_modules esté instalado correctamente
3. Prueba con `npm install --legacy-peer-deps` de nuevo
4. Revisa los logs en la carpeta `.npm/_logs/`

## 📄 Licencia

Este es un proyecto freelance personalizado.

---

**Creado con React + Vite**
