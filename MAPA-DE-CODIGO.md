# 🗺️ MAPA DE CÓDIGO - DUETTO

> **Referencia visual rápida**: Encuentra cualquier pieza del código en segundos

---

## 🎯 ÍNDICE DE UBICACIONES

### Por Funcionalidad

#### ⚡ LÓGICA PRINCIPAL
```
App.jsx:1-282          → Cerebro central, todo el estado
  ├─ L78-96            → handleCardSelect (seleccionar carta)
  ├─ L98-156           → handleFlipSelected (revelar parejas)
  └─ L158-195          → handleReset (mezclar y reiniciar)
```

#### 🎴 SISTEMA DE CARTAS
```
cardsData.js:1-113     → Datos de 88+88 cartas
  ├─ L1-88             → Lista de 88 palabras
  ├─ L90-98            → Generación de wordCards
  └─ L100-113          → Generación de imageCards

Card.jsx:1-67          → Componente de carta individual
  ├─ L15-20            → onClick handler
  ├─ L25-40            → Renderizado de dorso/frente
  └─ Card.css          → Animación flip 3D

Deck.jsx:1-34          → Grid de cartas con scroll
  └─ Deck.css          → Layout grid 6 columnas
```

#### 🎛️ CONTROLES
```
ControlPanel.jsx:1-102 → Panel de botones
  ├─ L25-30            → Botón Revelar
  ├─ L31-36            → Botón Reiniciar
  ├─ L37-42            → Toggle Tema
  ├─ L43-58            → Fullscreen + Cerrar
  └─ ControlPanel.css  → Estilos de botones
```

#### 🖼️ ÁREA DE REVELACIÓN
```
RevealArea.jsx:1-45    → Cartas grandes reveladas
  ├─ L18-27            → Carta de palabra
  ├─ L28-37            → Carta de imagen
  └─ RevealArea.css    → Layout + animación fade-in
```

#### 🔌 ELECTRON
```
electron.js:1-75       → Proceso principal
  ├─ L12-26            → Configuración ventana
  ├─ L42-46            → IPC: toggle-fullscreen
  ├─ L48-50            → IPC: close-app
  └─ L52-60            → Detección cambios fullscreen

preload.js:1-11        → Puente seguro
  ├─ L4-6              → toggleFullscreen()
  ├─ L7                → onFullscreenChange()
  └─ L8                → closeApp()
```

#### 🎨 ESTILOS
```
index.css              → Variables globales CSS
  ├─ L1-30             → Variables :root (colores, spacing)
  └─ L32-60            → Tema .dark-mode

App.css                → Layout principal
  ├─ L1-40             → Estructura flexbox
  ├─ L42-80            → Área de mazos
  └─ L82-120           → Responsive design
```

---

## 🔍 BUSCADOR RÁPIDO

### "Quiero cambiar..."

| Cambio deseado | Archivo | Línea(s) |
|----------------|---------|----------|
| **Las 88 palabras** | `data/cardsData.js` | 1-88 |
| **Rutas de imágenes** | `data/cardsData.js` | 106 |
| **Color primario** | `index.css` | 12 (`:root`) |
| **Colores modo oscuro** | `index.css` | 35-50 (`.dark-mode`) |
| **Tamaño de cartas en mazo** | `components/Card.css` | 2 (width) |
| **Tamaño de cartas reveladas** | `components/RevealArea.css` | 28 (width) |
| **Número de columnas del grid** | `components/Deck.css` | 15 (grid-template-columns) |
| **Tamaño de ventana** | `electron.js` | 13-14 (width/height) |
| **Duración animación flip** | `App.jsx` | 102, 118, 130 (setTimeout) |
| **Velocidad de mezcla** | `App.jsx` | 165 (setTimeout 650ms) |
| **Texto de botones** | `components/ControlPanel.jsx` | 25-58 |
| **Shortcuts de teclado** | `electron.js` | Añadir con globalShortcut |

---

## 📊 MATRIZ DE DEPENDENCIAS

```
         ┌─────────────────────────────────────┐
         │       electron.js (Main)            │
         │  - Crea ventana                     │
         │  - IPC handlers                     │
         └──────────────┬──────────────────────┘
                        │
         ┌──────────────▼──────────────────────┐
         │       preload.js (Bridge)           │
         │  - Expone window.electronAPI        │
         └──────────────┬──────────────────────┘
                        │
         ┌──────────────▼──────────────────────┐
         │       index.html                    │
         │  - <div id="root">                  │
         │  - Carga main.jsx                   │
         └──────────────┬──────────────────────┘
                        │
         ┌──────────────▼──────────────────────┐
         │       main.jsx                      │
         │  - ReactDOM.createRoot()            │
         │  - Renderiza <App />                │
         └──────────────┬──────────────────────┘
                        │
    ┌───────────────────▼────────────────────────┐
    │                 App.jsx                    │
    │  - Estado de cartas, revelación, tema      │
    │  - handleCardSelect, handleFlipSelected    │
    │  - handleReset                             │
    └────┬────────────┬──────────────┬───────────┘
         │            │              │
    ┌────▼─────┐  ┌──▼─────────┐  ┌─▼──────────┐
    │ Deck.jsx │  │ Control    │  │ RevealArea │
    │          │  │ Panel.jsx  │  │ .jsx       │
    └────┬─────┘  └────────────┘  └────────────┘
         │
    ┌────▼─────┐
    │ Card.jsx │
    └──────────┘
         │
    ┌────▼─────────┐
    │ cardsData.js │
    └──────────────┘
```

---

## 🎬 FLUJOS DE ACCIONES

### Flujo 1️⃣: Seleccionar Carta

```
[Usuario click]
    → Card.jsx:18 (onClick)
    → props.onSelect(card.id)
    → App.jsx:78 handleCardSelect(cardId)
    → L82-90: Busca carta, verifica estado
    → L91-96: Actualiza state a 'selected'
    → setWords([...]) o setImages([...])
    → Re-render automático
    → Card recibe nueva prop card.state
    → Card.css aplica clase .selected
    → Borde dorado visible ✨
```

### Flujo 2️⃣: Revelar Parejas

```
[Usuario click "Revelar"]
    → ControlPanel.jsx:25 (onClick)
    → props.onFlipSelected()
    → App.jsx:98 handleFlipSelected()

    ⏱️ t=0ms
    → L102-110: selectedWord/Image.state = 'moving-to-end'
    → setIsRevealing(true)

    ⏱️ t=400ms (setTimeout en L111)
    → L118-125: state = 'flipped'
    → setRevealedWordCard(...)
    → setRevealedImageCard(...)
    → setRevealedPairs(n+1)

    ⏱️ t=700ms (setTimeout en L127)
    → setIsRevealing(false)
    → setRevealKey(k+1)

    → RevealArea.jsx recibe props
    → L18-37: Renderiza cartas grandes
    → RevealArea.css: animación fade-in
    → Cartas visibles ✨
```

### Flujo 3️⃣: Reiniciar y Mezclar

```
[Usuario click "Reiniciar"]
    → ControlPanel.jsx:31 (onClick)
    → props.onReset()
    → App.jsx:158 handleReset()

    ⏱️ t=0ms
    → L160: setIsShuffling(true)
    → L161-163: Todas cards.state = 'faceDown'
    → Card.css: animación flip-back

    ⏱️ t=650ms (setTimeout en L165)
    → L167-183: shuffleCards() con Fisher-Yates
    → setWords(shuffled)
    → setImages(shuffled)
    → setRevealedWordCard(null)
    → setRevealedPairs(0)
    → L191: setIsShuffling(false)

    → Deck re-renderiza con nuevo orden
    → Usuario puede seleccionar ✨
```

### Flujo 4️⃣: Toggle Tema Oscuro

```
[Usuario click "🌙"]
    → ControlPanel.jsx:37 (onClick)
    → props.onDarkModeToggle()
    → App.jsx:55 setDarkMode(!darkMode)

    → useEffect detecta cambio (L60)
    → L61-65: document.body.classList.add('dark-mode')
    → L66: localStorage.setItem('darkMode', true)

    → index.css: Aplica variables .dark-mode
    → Todos los componentes se re-pintan
    → Tema oscuro activo ✨
```

### Flujo 5️⃣: Fullscreen

```
[Usuario click "⛶"]
    → ControlPanel.jsx:43 (onClick)
    → window.electronAPI.toggleFullscreen()
    → preload.js:4 invoke IPC
    → electron.js:42 ipcMain.handle
    → L43: mainWindow.setFullScreen(!isFullScreen)

    → electron.js:52-60 (listener 'enter-full-screen')
    → mainWindow.webContents.send('fullscreen-changed', true)
    → preload.js:7 onFullscreenChange callback
    → ControlPanel.jsx:12 useEffect
    → L14: setIsFullscreen(true)
    → Icono botón cambia a "⛶" ✨
```

---

## 🧩 PIEZAS LEGO - Referencia Visual

```
┌─────────────────────────────────────────────────────┐
│ 🟦 PIEZAS BASE (Fundación)                          │
├─────────────────────────────────────────────────────┤
│ electron.js      - 75 líneas  - Motor Electron      │
│ preload.js       - 11 líneas  - Puente IPC          │
│ index.html       - 13 líneas  - HTML raíz           │
│ main.jsx         - 10 líneas  - Arranque React      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🟩 PIEZAS LÓGICA (Componentes)                      │
├─────────────────────────────────────────────────────┤
│ App.jsx          - 282 líneas - Cerebro central     │
│ Card.jsx         - 67 líneas  - Carta individual    │
│ Deck.jsx         - 34 líneas  - Grid de cartas      │
│ ControlPanel.jsx - 102 líneas - Botones control     │
│ RevealArea.jsx   - 45 líneas  - Área revelación     │
│ DeckConfig.jsx   - 88 líneas  - Modal (no usado)    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🟪 PIEZA DATOS                                       │
├─────────────────────────────────────────────────────┤
│ cardsData.js     - 113 líneas - 88+88 cartas        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🟨 PIEZAS ESTILO                                     │
├─────────────────────────────────────────────────────┤
│ index.css        - Variables CSS + tema oscuro      │
│ App.css          - Layout principal                 │
│ Card.css         - Flip animation 3D                │
│ Deck.css         - Grid 6 columnas                  │
│ ControlPanel.css - Estilos botones                  │
│ RevealArea.css   - Layout cartas grandes            │
└─────────────────────────────────────────────────────┘
```

---

## ⏱️ TIMINGS IMPORTANTES

```
🎬 Animaciones App.jsx:

   400ms ─→ Movimiento carta a área revelación (moving-to-end)
   700ms ─→ Volteo de carta en revelación (flipped)
   650ms ─→ Mezcla de cartas (shuffle)
   600ms ─→ Flip back a faceDown

🎨 Transiciones CSS:

   0.6s ─→ Card flip (Card.css)
   0.4s ─→ Fade-in RevealArea (RevealArea.css)
   0.3s ─→ Transición modo oscuro (index.css)
   0.2s ─→ Hover botones (ControlPanel.css)
```

---

## 🎨 PALETA DE COLORES

### Modo Claro (index.css:10-20)
```css
--primary:    #667eea  (Púrpura claro)
--secondary:  #764ba2  (Púrpura oscuro)
--success:    #10b981  (Verde)
--danger:     #ef4444  (Rojo)
--warning:    #f59e0b  (Naranja)

--bg-primary:    #f8f9fa  (Gris muy claro)
--bg-secondary:  #ffffff  (Blanco)
--text-primary:  #2d3748  (Gris oscuro)
--text-secondary:#718096  (Gris medio)
```

### Modo Oscuro (index.css:35-50)
```css
--primary:    #9f7aea  (Púrpura más claro)
--secondary:  #b794f4  (Púrpura pastel)

--bg-primary:    #1a1a2e  (Azul muy oscuro)
--bg-secondary:  #16213e  (Azul oscuro)
--text-primary:  #f1f1f1  (Gris muy claro)
--text-secondary:#cbd5e0  (Gris claro)
```

---

## 🔑 ESTADOS DE CARTA

```
Estado          Origen              Destino            Trigger
══════════════════════════════════════════════════════════════
faceDown   →    selected       (Usuario click)
selected   →    faceDown       (Usuario click otra vez)
selected   →    moving-to-end  (Click "Revelar")
moving-to-end → flipped        (400ms después)
flipped    →    faceDown       (Click "Reiniciar")
```

---

## 📦 PROPS DE COMPONENTES

### `<Card />` (Card.jsx)
```javascript
card: {
  id: string,              // 'w1', 'i88'
  type: 'word' | 'image',
  content: string,         // Texto o ruta
  state: string            // Ver estados arriba
}
onSelect: (cardId: string) => void
isShuffling: boolean
```

### `<Deck />` (Deck.jsx)
```javascript
label: string              // 'Palabras' | 'Imágenes'
cards: Card[]              // Array de 88
onCardSelect: (id) => void
isShuffling: boolean
```

### `<ControlPanel />` (ControlPanel.jsx)
```javascript
onFlipSelected: () => void
onReset: () => void
onDarkModeToggle: () => void
darkMode: boolean
hasSelectedCards: boolean  // Habilita "Revelar"
revealedPairs: number      // Contador
isRevealing: boolean       // Bloquea durante animación
```

### `<RevealArea />` (RevealArea.jsx)
```javascript
wordCard: Card | null
imageCard: Card | null
darkMode: boolean
```

---

## 🚨 PUNTOS CRÍTICOS (No Tocar Sin Cuidado)

| Código | Ubicación | Por qué es crítico |
|--------|-----------|-------------------|
| `key={revealKey}` | App.jsx:238 | Fuerza re-animación de RevealArea |
| `setTimeout 400ms` | App.jsx:111 | Sincroniza moving-to-end → flipped |
| `setTimeout 650ms` | App.jsx:165 | Permite animación flip antes de mezclar |
| `transform-style: preserve-3d` | Card.css:2 | Sin esto, flip 3D no funciona |
| `contextBridge.exposeInMainWorld` | preload.js:3 | Seguridad Electron, no saltarse |
| `Fisher-Yates shuffle` | App.jsx:167-183 | Mezcla aleatoria uniforme |

---

## 📝 CONVENCIONES DE CÓDIGO

### Nombres de Archivo
- Componentes: `PascalCase.jsx` (ej: `Card.jsx`)
- Estilos: `PascalCase.css` (ej: `Card.css`)
- Utilidades: `camelCase.js` (ej: `cardsData.js`)

### Nombres de Función
- Event handlers: `handle{Action}` (ej: `handleCardSelect`)
- State setters: `set{StateName}` (ej: `setDarkMode`)
- Utilidades: `{verb}{Noun}` (ej: `shuffleCards`)

### Nombres de Variables CSS
- Patrón: `--{category}-{name}` (ej: `--bg-primary`)
- Spacing: `--spacing-{size}` (ej: `--spacing-md`)
- Animaciones: `--transition-{speed}` (ej: `--transition-fast`)

---

## 🧪 DEBUGGING CHECKLIST

### Carta no voltea
- [ ] Verificar `card.state` en DevTools
- [ ] Inspeccionar clase `.flipped` en elemento
- [ ] Revisar CSS `transform: rotateY(180deg)`
- [ ] Comprobar que `transform-style: preserve-3d` existe

### Botón deshabilitado
- [ ] Verificar prop `disabled` en ControlPanel
- [ ] Revisar `hasSelectedCards` en App
- [ ] Console.log de `selectedWord` y `selectedImage`

### Animación no se repite
- [ ] Verificar que `revealKey` cambia
- [ ] Inspeccionar prop `key` en RevealArea
- [ ] Comprobar `setRevealKey(prev => prev + 1)` se ejecuta

### Fullscreen no funciona
- [ ] Abrir DevTools, ver errores de IPC
- [ ] Verificar `window.electronAPI` existe
- [ ] Revisar handlers en `electron.js:42-60`
- [ ] Probar con F11 (nativo) para comparar

---

## 📚 GLOSARIO VISUAL

```
┌─────────────────────────────────────┐
│ TÉRMINO       │ SIGNIFICADO         │
├───────────────┼─────────────────────┤
│ 🎴 Deck       │ Mazo (88 cartas)    │
│ 🃏 Card       │ Carta individual    │
│ 🔄 Flip       │ Voltear carta       │
│ ✨ Reveal     │ Mostrar en área     │
│ 🎲 Shuffle    │ Mezclar mazo        │
│ 👆 Select     │ Seleccionar carta   │
│ 🌙 Dark Mode  │ Tema oscuro         │
│ ⛶ Fullscreen │ Pantalla completa   │
│ 🧩 State      │ Estado de carta     │
│ 🔌 IPC        │ Comunicación Electron│
└─────────────────────────────────────┘
```

---

## 🎓 PATRONES DE DISEÑO USADOS

1. **Component Composition** - `App` → `Deck` → `Card`
2. **Controlled Components** - Estado en `App`, props down
3. **Lifting State Up** - Eventos suben, estado baja
4. **Unidirectional Data Flow** - React estándar
5. **Context Isolation** - Electron security (preload)
6. **Fisher-Yates** - Algoritmo de mezcla aleatoria
7. **CSS Variables** - Theming con `var(--name)`
8. **BEM-like** - Nombres de clases (`.card-front`)

---

## 🔗 ENLACES INTERNOS

- Ver documentación completa → `ARQUITECTURA.md`
- Ver código fuente → `/src/`
- Ver recursos → `/public/images/`
- Ver builds → `/release/`

---

**Última actualización:** 2025-12-26
**Versión:** 1.3.1
**Mantenedor:** Claude Code Assistant

---

💡 **Tip**: Imprime este mapa y tenlo a mano mientras codeas
