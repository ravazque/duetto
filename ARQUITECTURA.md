# 🧱 ARQUITECTURA DUETTO - Guía de Piezas LEGO

> **Editar este proyecto es como ensamblar LEGO**: cada pieza tiene un propósito claro, interfaces bien definidas, y se conecta con otras piezas de forma predecible.

---

## 📦 INVENTARIO DE PIEZAS

### 🔵 PIEZAS BASE (Fundación)
```
├── 🟦 electron.js          - Motor principal (Electron)
├── 🟦 preload.js           - Puente seguro Electron↔React
├── 🟦 index.html           - Contenedor HTML
└── 🟦 main.jsx             - Punto de arranque React
```

### 🟢 PIEZAS DE LÓGICA (Componentes React)
```
├── 🟩 App.jsx              - Cerebro central (estado global)
├── 🟩 Card.jsx             - Carta individual (volteo)
├── 🟩 Deck.jsx             - Mazo de cartas (grid)
├── 🟩 ControlPanel.jsx     - Panel de botones
├── 🟩 RevealArea.jsx       - Área de cartas reveladas
└── 🟩 DeckConfig.jsx       - Modal informativo (no usado)
```

### 🟣 PIEZAS DE DATOS
```
└── 🟪 cardsData.js         - 88 palabras + 88 imágenes
```

### 🟡 PIEZAS DE ESTILO
```
├── 🟨 index.css            - Variables globales CSS
├── 🟨 App.css              - Layout principal
├── 🟨 Card.css             - Animación de volteo
├── 🟨 Deck.css             - Grid de cartas
├── 🟨 ControlPanel.css     - Botones
└── 🟨 RevealArea.css       - Área de revelación
```

---

## 🔗 CONEXIONES ENTRE PIEZAS

### Diagrama de Ensamblaje
```
     electron.js (🟦 Base Principal)
           │
           ├──→ preload.js (🟦 Puente)
           │         │
           ▼         ▼
     index.html ─→ main.jsx (🟦 Arranque)
                      │
                      ▼
                  App.jsx (🟩 Cerebro)
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   Deck.jsx    ControlPanel   RevealArea.jsx
   (🟩 Mazo)   (🟩 Botones)   (🟩 Reveladas)
        │
        ▼
   Card.jsx
   (🟩 Carta)
        │
        ▼
   cardsData.js
   (🟪 Datos)
```

---

## 🧩 ESPECIFICACIÓN DE CADA PIEZA

---

### 🟦 **PIEZA BASE 1: electron.js**

**📍 Ubicación:** `/electron.js` (75 líneas)

**🎯 Propósito:** Motor que convierte la app web en aplicación de escritorio

**🔌 Interfaces de Entrada:**
- Ninguna (es el punto de entrada)

**📤 Interfaces de Salida:**
- `ipcMain.handle('toggle-fullscreen')` - Recibe peticiones de fullscreen
- `ipcMain.handle('close-app')` - Recibe peticiones de cierre
- `mainWindow.webContents.send('fullscreen-changed', isFullscreen)` - Envía estado

**⚙️ Configuración:**
```javascript
{
  width: 1400,
  height: 900,
  frame: false,              // Sin barra de título
  webPreferences: {
    preload: './preload.js',
    contextIsolation: true
  }
}
```

**🔧 Cómo Modificar:**
- Cambiar tamaño ventana → Editar `width` y `height`
- Añadir shortcuts globales → Usar `globalShortcut.register()`
- Cambiar comportamiento ventana → Modificar `BrowserWindowConstructorOptions`

**📝 Ejemplo de Modificación:**
```javascript
// Añadir ventana siempre al frente
const mainWindow = new BrowserWindow({
  width: 1400,
  height: 900,
  alwaysOnTop: true,  // ← Nueva línea
  // ...
})
```

---

### 🟦 **PIEZA BASE 2: preload.js**

**📍 Ubicación:** `/preload.js` (11 líneas)

**🎯 Propósito:** Puente seguro entre el proceso Electron y React (contexto aislado)

**🔌 Interfaces de Entrada:**
- Acceso a `ipcRenderer` (desde Electron)

**📤 Interfaces de Salida:**
- Expone `window.electronAPI` con:
  - `toggleFullscreen()` → Invoca IPC
  - `closeApp()` → Invoca IPC
  - `onFullscreenChange(callback)` → Escucha cambios

**🔧 Cómo Modificar:**
```javascript
// Añadir nuevo comando IPC
contextBridge.exposeInMainWorld('electronAPI', {
  // Existentes...
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),

  // Nuevo:
  minimizeWindow: () => ipcRenderer.invoke('minimize-window')
})
```

**⚠️ Importante:** Cualquier funcionalidad de Electron que uses en React DEBE pasar por aquí.

---

### 🟦 **PIEZA BASE 3: index.html**

**📍 Ubicación:** `/index.html` (13 líneas)

**🎯 Propósito:** Contenedor HTML donde React se monta

**🔌 Elementos Clave:**
- `<div id="root"></div>` - Punto de montaje de React
- `<script type="module" src="/src/main.jsx"></script>` - Carga React

**🔧 Cómo Modificar:**
- Añadir favicon → `<link rel="icon" href="/favicon.ico">`
- Cambiar título → `<title>Nuevo Título</title>`
- Añadir meta tags → `<meta name="..." content="...">`

---

### 🟦 **PIEZA BASE 4: main.jsx**

**📍 Ubicación:** `/src/main.jsx` (10 líneas)

**🎯 Propósito:** Arranca React y monta `<App />` en el DOM

**🔌 Interfaces:**
```javascript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**🔧 Cómo Modificar:**
- Añadir providers globales (Redux, Context):
```javascript
<StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</StrictMode>
```

---

## 🟩 PIEZAS DE LÓGICA (Componentes React)

---

### 🟩 **PIEZA CENTRAL: App.jsx** (El Cerebro)

**📍 Ubicación:** `/src/App.jsx` (282 líneas)

**🎯 Propósito:** Componente raíz que gestiona TODO el estado de la aplicación

**🗄️ Estados Manejados:**
```javascript
// Cartas
words: []              // 88 cartas de palabras
images: []             // 88 cartas de imágenes

// Revelación
revealedWordCard       // Carta palabra en área de revelación
revealedImageCard      // Carta imagen en área de revelación
revealKey              // Key para re-animar (cambio fuerza nueva animación)
revealedPairs          // Contador: cuántas parejas se han revelado

// UI
darkMode               // Tema oscuro on/off
isShuffling            // Bloquea selección durante mezcla
isRevealing            // Bloquea botones durante revelación
```

**🔌 Props que RECIBE:** Ninguna (es el root)

**📤 Props que ENVÍA:**

A `<Deck>`:
```javascript
cards={words}              // o images
onCardSelect={handleCardSelect}
isShuffling={isShuffling}
```

A `<ControlPanel>`:
```javascript
onFlipSelected={handleFlipSelected}
onReset={handleReset}
onDarkModeToggle={() => setDarkMode(!darkMode)}
darkMode={darkMode}
hasSelectedCards={hasSelectedWords && hasSelectedImages}
revealedPairs={revealedPairs}
isRevealing={isRevealing}
```

A `<RevealArea>`:
```javascript
wordCard={revealedWordCard}
imageCard={revealedImageCard}
darkMode={darkMode}
key={revealKey}
```

**⚙️ Funciones Principales:**

#### 1️⃣ `handleCardSelect(cardId)`
**Propósito:** Selecciona/deselecciona una carta del mazo

**Flujo:**
```
1. Busca carta en array (words o images)
2. Verifica que no esté flipped ni shuffling
3. Actualiza state de la carta:
   - Si ya selected → faceDown
   - Si otra selected → la anterior a faceDown, esta a selected
   - Si ninguna selected → esta a selected
```

**Código Clave:**
```javascript
// Máximo 1 carta seleccionada por mazo
const selected = updatedCards.find(c => c.state === 'selected')
if (selected && selected.id !== card.id) {
  selected.state = 'faceDown'
}
card.state = card.state === 'selected' ? 'faceDown' : 'selected'
```

#### 2️⃣ `handleFlipSelected()`
**Propósito:** Revela las cartas seleccionadas

**Flujo (2 pasos con timers):**
```
PASO 1 (t=0ms):
  - Busca selected en words e images
  - Cambia state a 'moving-to-end'
  - setIsRevealing(true)

PASO 2 (t=400ms):
  - Cambia state a 'flipped'
  - Actualiza revealedWordCard y revealedImageCard
  - Incrementa revealedPairs

PASO 3 (t=700ms):
  - setIsRevealing(false)
  - Incrementa revealKey (fuerza re-animación)
```

**Código Clave:**
```javascript
setTimeout(() => {
  // Voltear
  selectedWord.state = 'flipped'
  selectedImage.state = 'flipped'
  setRevealedWordCard(selectedWord)
  setRevealedImageCard(selectedImage)

  setTimeout(() => setIsRevealing(false), 300)
}, 400)
```

#### 3️⃣ `handleReset()`
**Propósito:** Reinicia y mezcla todas las cartas

**Flujo (3 pasos):**
```
PASO 1 (t=0ms):
  - setIsShuffling(true)
  - Todas las cartas → state: 'faceDown'

PASO 2 (t=650ms):
  - Mezcla arrays con Fisher-Yates
  - Limpia revealedWordCard/imageCard
  - Resetea revealedPairs a 0

PASO 3 (t=650ms):
  - setIsShuffling(false)
```

**Código de Mezcla (Fisher-Yates):**
```javascript
const shuffleCards = (cardsArray) => {
  const shuffled = [...cardsArray]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
```

**🔧 Cómo Modificar:**

**Añadir nuevo tipo de carta:**
```javascript
// 1. Importar datos
import { wordCards, imageCards, newTypeCards } from './data/cardsData'

// 2. Estado
const [newType, setNewType] = useState(newTypeCards)

// 3. Deck adicional
<Deck
  label="Nuevo Tipo"
  cards={newType}
  onCardSelect={handleCardSelect}
/>
```

**Cambiar duración de animaciones:**
```javascript
// En handleFlipSelected
setTimeout(() => {
  // ... código
}, 600)  // Cambiar de 400 a 600ms
```

---

### 🟩 **PIEZA: Card.jsx** (Carta Individual)

**📍 Ubicación:** `/src/components/Card.jsx` (67 líneas)

**🎯 Propósito:** Renderiza una carta individual con efecto de volteo 3D

**🔌 Props que RECIBE:**
```javascript
card: {
  id: string,           // 'w1', 'i23', etc.
  type: 'word' | 'image',
  content: string,      // Texto o ruta imagen
  state: 'faceDown' | 'selected' | 'moving-to-end' | 'flipped'
}
onSelect: (cardId) => void
isShuffling: boolean
```

**📤 Eventos que EMITE:**
- `onClick` → `onSelect(card.id)` (si no está flipped ni shuffling)

**🎨 Estados Visuales:**
```css
.card.faceDown         - Dorso visible
.card.selected         - Borde dorado + elevación
.card.moving-to-end    - Transición al área de revelación
.card.flipped          - Volteada, muestra content
```

**⚙️ Lógica de Renderizado:**
```javascript
// Dorso
<div className="card-back">
  {type === 'word' ? 'Duetto' : <img src="/images/back.png" />}
</div>

// Frente
<div className="card-front">
  {type === 'word' ? content : <img src={content} />}
</div>
```

**🔧 Cómo Modificar:**

**Cambiar imagen del dorso:**
```javascript
// En card-back
<img src="/images/nuevo-dorso.png" alt="dorso" />
```

**Añadir efecto hover:**
```javascript
const [isHovered, setIsHovered] = useState(false)

<div
  className={`card ${isHovered ? 'hovered' : ''}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
```

---

### 🟩 **PIEZA: Deck.jsx** (Mazo)

**📍 Ubicación:** `/src/components/Deck.jsx` (34 líneas)

**🎯 Propósito:** Contenedor grid que renderiza múltiples cartas con scroll

**🔌 Props que RECIBE:**
```javascript
label: string              // 'Palabras' o 'Imágenes'
cards: Card[]              // Array de 88 cartas
onCardSelect: (id) => void
isShuffling: boolean
```

**📤 Lo que renderiza:**
```javascript
<div className="deck">
  <h3>{label}</h3>
  <div className="deck-cards">
    {cards.map(card => (
      <Card
        key={card.id}
        card={card}
        onSelect={onCardSelect}
        isShuffling={isShuffling}
      />
    ))}
  </div>
</div>
```

**🎨 Layout:**
- Grid con 6 columnas
- Auto-scroll vertical si > 14 cartas visibles
- Gap de 1rem entre cartas

**🔧 Cómo Modificar:**

**Cambiar columnas del grid:**
```css
/* En Deck.css */
.deck-cards {
  grid-template-columns: repeat(8, 1fr);  /* 6 → 8 columnas */
}
```

---

### 🟩 **PIEZA: ControlPanel.jsx** (Panel de Botones)

**📍 Ubicación:** `/src/components/ControlPanel.jsx` (102 líneas)

**🎯 Propósito:** Panel con todos los controles de la aplicación

**🔌 Props que RECIBE:**
```javascript
onFlipSelected: () => void
onReset: () => void
onDarkModeToggle: () => void
darkMode: boolean
hasSelectedCards: boolean
revealedPairs: number
isRevealing: boolean
```

**🎮 Botones:**
1. **Revelar** - Disabled si !hasSelectedCards o isRevealing
2. **Reiniciar** - Mezcla y resetea
3. **Tema** - Toggle dark/light mode
4. **Pantalla Completa** - Usa window.electronAPI.toggleFullscreen()
5. **Cerrar** - Usa window.electronAPI.closeApp()

**💡 Contador:**
- Muestra `revealedPairs` parejas reveladas

**🔧 Cómo Modificar:**

**Añadir nuevo botón:**
```javascript
<button
  onClick={() => console.log('Nueva acción')}
  className="control-button"
>
  🎲 Nuevo
</button>
```

**Añadir tooltip:**
```javascript
<button
  title="Descripción del botón"  // ← Añade esto
>
```

---

### 🟩 **PIEZA: RevealArea.jsx** (Área de Revelación)

**📍 Ubicación:** `/src/components/RevealArea.jsx` (45 líneas)

**🎯 Propósito:** Muestra las cartas reveladas estilo OH Cards (superposición)

**🔌 Props que RECIBE:**
```javascript
wordCard: Card | null
imageCard: Card | null
darkMode: boolean
```

**🎨 Diseño:**
- Dos cartas grandes en columna
- Animación de fade-in al aparecer
- Tamaño: `clamp(300px, 42vh, 580px)`

**⚙️ Renderizado Condicional:**
```javascript
{wordCard?.state === 'flipped' && (
  <div className="reveal-card">
    {wordCard.type === 'word' ? (
      <div className="word-content">{wordCard.content}</div>
    ) : (
      <img src={wordCard.content} />
    )}
  </div>
)}
```

**🔧 Cómo Modificar:**

**Cambiar layout a horizontal:**
```css
/* En RevealArea.css */
.reveal-area {
  flex-direction: row;  /* column → row */
  gap: 2rem;
}
```

**Añadir superposición (estilo OH Cards original):**
```css
.reveal-area {
  position: relative;
}
.reveal-card:nth-child(2) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -30%);
}
```

---

## 🟪 PIEZA DE DATOS: cardsData.js

**📍 Ubicación:** `/src/data/cardsData.js` (113 líneas)

**🎯 Propósito:** Fuente de verdad única para todas las cartas

**📦 Exports:**
```javascript
export const wordCards = [
  {
    id: 'w1',
    type: 'word',
    content: 'ESCONDER',
    state: 'faceDown'
  },
  // ... 87 más
]

export const imageCards = [
  {
    id: 'i1',
    type: 'image',
    content: './images/card-01.png',
    state: 'faceDown'
  },
  // ... 87 más
]
```

**🔧 Cómo Modificar:**

**Añadir nueva palabra:**
```javascript
const wordList = [
  'ESCONDER',
  'NUEVA_PALABRA',  // ← Añadir aquí
  // ...
]
```

**Cambiar ruta de imágenes:**
```javascript
content: `./images/nueva-carpeta/card-${...}.png`
```

**Añadir metadata a cartas:**
```javascript
{
  id: 'w1',
  type: 'word',
  content: 'ESCONDER',
  state: 'faceDown',
  category: 'emociones',     // ← Nuevo campo
  difficulty: 'easy'          // ← Nuevo campo
}
```

---

## 🟨 PIEZAS DE ESTILO (CSS)

### Sistema de Variables Globales (index.css)

**📍 Ubicación:** `/src/index.css`

**🎨 Variables CSS:**
```css
:root {
  /* Colores */
  --primary: #667eea;
  --secondary: #764ba2;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;

  /* Tipografía */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;

  /* Espaciado */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;

  /* Animaciones */
  --transition-fast: 200ms;
  --transition-normal: 400ms;
  --transition-slow: 600ms;
}
```

**🌙 Modo Oscuro:**
```css
.dark-mode {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #f1f1f1;
  /* ... */
}
```

**🔧 Cómo Modificar:**
- Cambiar color primario → Editar `--primary`
- Añadir nueva variable → `--mi-variable: valor;`
- Usar en componente → `color: var(--primary);`

---

### Animaciones Clave (Card.css)

**📍 Ubicación:** `/src/components/Card.css`

**🎞️ Animación de Volteo (3D):**
```css
.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front {
  transform: rotateY(180deg);  /* Pre-volteada */
}
```

**🔧 Cómo Modificar:**

**Cambiar dirección de volteo:**
```css
/* Vertical en lugar de horizontal */
.card.flipped {
  transform: rotateX(180deg);  /* Y → X */
}
```

**Cambiar velocidad:**
```css
.card {
  transition: transform 0.8s;  /* 0.6s → 0.8s */
}
```

---

## 🔄 FLUJOS DE DATOS COMPLETOS

### Flujo 1: Selección de Carta
```
Usuario click en carta
     ↓
Card.jsx detecta onClick
     ↓
Llama a onSelect(card.id)
     ↓
App.handleCardSelect(cardId)
     ↓
Busca carta en words[] o images[]
     ↓
Actualiza card.state a 'selected'
     ↓
setWords([...]) o setImages([...])
     ↓
Re-render de Deck con carta selected
     ↓
Card.jsx añade clase .selected
     ↓
CSS aplica borde dorado + box-shadow
```

---

### Flujo 2: Revelación de Pareja
```
Usuario click en 'Revelar'
     ↓
ControlPanel onClick → onFlipSelected()
     ↓
App.handleFlipSelected()
     ↓
┌─ PASO 1 (t=0ms) ─────────────────┐
│ selectedWord.state = 'moving-to-end' │
│ selectedImage.state = 'moving-to-end'│
│ setIsRevealing(true)              │
└───────────────────────────────────┘
     ↓ setTimeout 400ms
┌─ PASO 2 (t=400ms) ────────────────┐
│ selectedWord.state = 'flipped'    │
│ selectedImage.state = 'flipped'   │
│ setRevealedWordCard(selectedWord) │
│ setRevealedImageCard(...)         │
│ setRevealedPairs(prev => prev+1)  │
└───────────────────────────────────┘
     ↓ setTimeout 300ms
┌─ PASO 3 (t=700ms) ────────────────┐
│ setIsRevealing(false)             │
│ setRevealKey(prev => prev+1)      │
└───────────────────────────────────┘
     ↓
RevealArea recibe nuevas props (key cambiado)
     ↓
Animación de fade-in en RevealArea
     ↓
Cartas visibles en área grande
```

---

### Flujo 3: Reinicio y Mezcla
```
Usuario click en 'Reiniciar'
     ↓
ControlPanel onClick → onReset()
     ↓
App.handleReset()
     ↓
┌─ PASO 1 (t=0ms) ──────────────────┐
│ setIsShuffling(true)              │
│ Todas cards.state = 'faceDown'    │
└───────────────────────────────────┘
     ↓ setTimeout 650ms
┌─ PASO 2 (t=650ms) ────────────────┐
│ shuffled = shuffleCards(words)    │
│ setWords(shuffled)                │
│ (igual para images)               │
│ setRevealedWordCard(null)         │
│ setRevealedImageCard(null)        │
│ setRevealedPairs(0)               │
└───────────────────────────────────┘
     ↓
┌─ PASO 3 (t=650ms) ────────────────┐
│ setIsShuffling(false)             │
└───────────────────────────────────┘
     ↓
Deck re-renderiza con orden nuevo
     ↓
Usuario puede volver a seleccionar
```

---

## 🛠️ GUÍA DE MODIFICACIONES COMUNES

### 1. Añadir un Nuevo Botón en ControlPanel

**Archivos a modificar:** 1
- `/src/components/ControlPanel.jsx`

**Pasos:**
```javascript
// 1. Añadir prop si necesita comunicarse con App
const { ..., onNuevaAccion } = props;

// 2. Añadir botón
<button
  onClick={onNuevaAccion}
  className="control-button"
  disabled={algunaCondicion}
>
  🎲 Texto
</button>
```

**Si necesita estado en App:**
```javascript
// En App.jsx
const handleNuevaAccion = () => {
  // Lógica aquí
}

// Pasar a ControlPanel
<ControlPanel
  // ... otras props
  onNuevaAccion={handleNuevaAccion}
/>
```

---

### 2. Cambiar las 88 Palabras

**Archivos a modificar:** 1
- `/src/data/cardsData.js`

**Pasos:**
```javascript
// Editar array wordList
const wordList = [
  'PALABRA_1',
  'PALABRA_2',
  // ... total 88 palabras
]

// El resto se genera automáticamente
```

---

### 3. Cambiar Colores del Tema

**Archivos a modificar:** 1
- `/src/index.css`

**Pasos:**
```css
:root {
  --primary: #TU_COLOR;      /* Modo claro */
}

.dark-mode {
  --primary: #TU_COLOR_OSCURO; /* Modo oscuro */
}
```

**Uso automático:** Todos los componentes que usen `var(--primary)` se actualizan.

---

### 4. Añadir un Tercer Mazo (ej: Emociones)

**Archivos a modificar:** 3
1. `/src/data/cardsData.js`
2. `/src/App.jsx`
3. `/src/App.css` (opcional, si necesitas ajustar layout)

**Pasos:**

```javascript
// 1. cardsData.js - Añadir datos
export const emotionCards = [
  { id: 'e1', type: 'emotion', content: '😊', state: 'faceDown' },
  // ... más emociones
]

// 2. App.jsx - Importar y añadir estado
import { wordCards, imageCards, emotionCards } from './data/cardsData'

const [emotions, setEmotions] = useState(emotionCards)
const [revealedEmotionCard, setRevealedEmotionCard] = useState(null)

// 3. Modificar handleCardSelect para soportar emotions
// 4. Modificar handleFlipSelected para incluir emotion
// 5. Añadir tercer Deck
<Deck
  label="Emociones"
  cards={emotions}
  onCardSelect={handleCardSelect}
  isShuffling={isShuffling}
/>
```

---

### 5. Cambiar Tamaño de las Cartas

**Archivos a modificar:** 2
- `/src/components/Card.css`
- `/src/components/RevealArea.css`

**Pasos:**
```css
/* Card.css - Cartas en mazo */
.card {
  width: clamp(120px, 12vw, 320px);  /* Aumentar de 90/280 */
}

/* RevealArea.css - Cartas reveladas */
.reveal-card {
  width: clamp(400px, 35vw, 700px);  /* Aumentar de 300/580 */
}
```

---

### 6. Persistir el Estado de las Cartas

**Archivos a modificar:** 1
- `/src/App.jsx`

**Pasos:**
```javascript
// Guardar al revelar
useEffect(() => {
  if (revealedWordCard && revealedImageCard) {
    localStorage.setItem('revealed', JSON.stringify({
      word: revealedWordCard,
      image: revealedImageCard,
      pairs: revealedPairs
    }))
  }
}, [revealedWordCard, revealedImageCard, revealedPairs])

// Cargar al iniciar
useEffect(() => {
  const saved = localStorage.getItem('revealed')
  if (saved) {
    const { word, image, pairs } = JSON.parse(saved)
    setRevealedWordCard(word)
    setRevealedImageCard(image)
    setRevealedPairs(pairs)
  }
}, [])
```

---

## 📊 TABLA DE REFERENCIA RÁPIDA

| Si quieres...                        | Edita este archivo                | Líneas aprox. |
|--------------------------------------|-----------------------------------|---------------|
| Cambiar palabras                     | `data/cardsData.js`               | 1-88          |
| Añadir botón                         | `components/ControlPanel.jsx`     | ~80           |
| Modificar lógica de selección        | `App.jsx` → `handleCardSelect`    | 78-96         |
| Cambiar animación de volteo          | `components/Card.css`             | 50-70         |
| Ajustar colores del tema             | `index.css` → `:root`             | 10-30         |
| Cambiar tamaño ventana               | `electron.js` → `BrowserWindow`   | 20-25         |
| Añadir shortcut de teclado           | `electron.js` → `globalShortcut`  | +5 líneas     |
| Modificar duración de animaciones    | `App.jsx` → `setTimeout`          | Buscar 400, 650, 700 |
| Cambiar layout de cartas reveladas   | `components/RevealArea.css`       | 1-30          |
| Añadir nuevo comando IPC             | `preload.js` + `electron.js`      | +5 en cada uno |

---

## 🎯 REGLAS DE ORO PARA MODIFICAR

### ✅ HACER
1. **Leer primero, modificar después** - Entiende el flujo completo antes de cambiar
2. **Respetar interfaces** - Si una función recibe props específicas, no cambies su firma sin actualizar todas las llamadas
3. **Mantener sincronía de timers** - Las animaciones dependen de timeouts coordinados
4. **Usar variables CSS** - Prefiere `var(--primary)` sobre valores hardcodeados
5. **Seguir el patrón de estados** - Las cartas siempre deben pasar por: `faceDown` → `selected` → `moving-to-end` → `flipped`

### ❌ EVITAR
1. **Modificar estados de carta directamente** - Siempre usa `setWords([...])` o `setImages([...])`
2. **Saltarse pasos en animaciones** - Podrías romper la sincronización
3. **Añadir dependencias sin actualizar package.json** - Documenta nuevas librerías
4. **Eliminar `key={revealKey}` en RevealArea** - Romperías la re-animación
5. **Hardcodear valores mágicos** - Usa constantes o variables CSS

---

## 🔍 DEBUGGING: Dónde Buscar Cuando Algo Falla

| Síntoma                              | Pieza LEGO a revisar               | Qué verificar                       |
|--------------------------------------|-----------------------------------|-------------------------------------|
| Carta no se voltea                   | `Card.jsx` + `Card.css`           | Clase `.flipped`, transform CSS     |
| Botón deshabilitado siempre          | `ControlPanel.jsx`                | Prop `disabled`, condiciones        |
| Cartas no se mezclan                 | `App.jsx` → `handleReset`         | Función `shuffleCards`, timer 650ms |
| Revelación no anima                  | `RevealArea.jsx`                  | Prop `key={revealKey}`, CSS fade-in |
| Fullscreen no funciona               | `preload.js` + `electron.js`      | IPC handlers, `window.electronAPI`  |
| Tema oscuro no aplica                | `index.css` + `App.jsx`           | Clase `.dark-mode`, `localStorage`  |
| Imágenes no cargan                   | `public/images/` + `cardsData.js` | Rutas correctas, archivos existen   |
| App no arranca                       | `main.jsx` + `index.html`         | Script type="module", id="root"     |

---

## 📚 GLOSARIO DE TÉRMINOS

- **Deck**: Mazo de cartas (Palabras o Imágenes)
- **Card**: Carta individual
- **State** (de carta): Estado actual (`faceDown`, `selected`, `moving-to-end`, `flipped`)
- **Reveal**: Acción de voltear cartas seleccionadas
- **Pair**: Pareja de carta palabra + carta imagen
- **Shuffling**: Estado de mezcla activa
- **RevealArea**: Área donde se muestran las cartas reveladas
- **IPC**: Inter-Process Communication (Electron ↔ React)
- **Context Bridge**: Puente seguro (preload.js)
- **Fisher-Yates**: Algoritmo de mezcla aleatoria

---

## 🚀 PRÓXIMOS PASOS SUGERIDOS

### Mejoras Fáciles (🟢 Bajo Esfuerzo)
1. Añadir tooltips a botones
2. Añadir sonidos al voltear cartas
3. Persistir cartas reveladas en localStorage
4. Añadir shortcuts de teclado (Espacio=Revelar, R=Reiniciar)

### Mejoras Medias (🟡 Esfuerzo Medio)
1. Permitir seleccionar múltiples parejas antes de revelar
2. Añadir historial de parejas reveladas
3. Export de sesión a PDF
4. Modo de pantalla dividida (terapeuta/paciente)

### Mejoras Avanzadas (🔴 Alto Esfuerzo)
1. Editor visual de mazos (cambiar palabras desde UI)
2. Sistema de mazos personalizados (múltiples sets)
3. Modo colaborativo (múltiples usuarios)
4. Integración con APIs de IA para sugerencias

---

## 📞 CONTACTO Y SOPORTE

Si necesitas ayuda modificando alguna pieza:
1. Busca el archivo en esta guía
2. Lee la sección "🔧 Cómo Modificar"
3. Revisa ejemplos similares en el código
4. Usa DevTools para debuggear en vivo

---

**Última actualización:** 2025-12-26
**Versión de Duetto:** 1.3.1
**Autor de la documentación:** Claude Code Assistant

---

🎉 **¡Con esta guía, cada pieza de código es tan clara como un bloque de LEGO!**
