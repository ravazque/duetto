# 🎴 Cartas Proyectivas - Aplicación de Terapia

Aplicación web para terapia con cartas proyectivas estilo OH Cards.

## 📋 Descripción del Proyecto

Esta aplicación permite a terapeutas trabajar con cartas proyectivas digitales. Incluye dos mazos:
- **Mazo de Palabras**: 88 cartas con palabras (8 de ejemplo en demo)
- **Mazo de Imágenes**: 88 cartas con imágenes (8 de ejemplo en demo)

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación se abrirá automáticamente en http://localhost:3000
```

### Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

## 🎮 Cómo Usar la Aplicación

1. **Seleccionar cartas**: Haz clic en las cartas que desees (aparecerá un ✓ verde)
2. **Voltear**: Presiona el botón "Voltear Seleccionadas" para ver el contenido
3. **Reiniciar**: Usa "Reiniciar Todo" para volver todas las cartas boca abajo

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

## 🤝 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que node_modules esté instalado
3. Prueba con `npm install` de nuevo

## 📄 Licencia

Este es un proyecto freelance personalizado.

---

**Creado con React + Vite**
