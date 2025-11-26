# 📚 Guía de Desarrollo - Cartas Proyectivas

## Para el Desarrollador

Esta guía te ayudará a entender y modificar el código.

## 🧠 Conceptos Clave

### 1. React Hooks Utilizados

#### useState
```javascript
const [words, setWords] = useState(wordCards);
```
- Maneja el estado de las cartas
- `words`: estado actual
- `setWords`: función para actualizar

### 2. Patrón de Actualización Inmutable

❌ **INCORRECTO** (muta el estado):
```javascript
card.state = 'flipped'; // NO HACER ESTO
```

✅ **CORRECTO** (crea nuevo objeto):
```javascript
return { ...card, state: 'flipped' };
```

### 3. Flujo de Datos (Props)

```
App.jsx (estado global)
  ↓ props
Deck.jsx (recibe cartas y funciones)
  ↓ props
Card.jsx (carta individual)
```

## 🔧 Cómo Modificar Funcionalidades

### Agregar un Nuevo Estado a las Cartas

1. Edita el tipo de estado en `Card.jsx`:
```javascript
// Ejemplo: agregar estado "highlighted"
<div className={`card ${card.state} ${card.highlighted ? 'highlighted' : ''}`}>
```

2. Actualiza la lógica en `App.jsx`:
```javascript
const handleHighlight = (cardId) => {
  setWords(words.map(card =>
    card.id === cardId ? { ...card, highlighted: true } : card
  ));
};
```

3. Añade estilos en `Card.css`:
```css
.card.highlighted {
  border: 3px solid gold;
  box-shadow: 0 0 20px gold;
}
```

### Agregar un Botón de Acción

1. En `ControlPanel.jsx`:
```javascript
<button
  className="btn btn-primary"
  onClick={onNuevaAccion}
>
  🎯 Nueva Acción
</button>
```

2. Define la función en `App.jsx`:
```javascript
const handleNuevaAccion = () => {
  // Tu lógica aquí
  console.log('Nueva acción ejecutada');
};
```

3. Pasa como prop:
```javascript
<ControlPanel
  onNuevaAccion={handleNuevaAccion}
/>
```

### Cambiar la Animación de Volteo

En `Card.css`:
```css
.card-inner {
  transition: transform 0.6s; /* Cambia 0.6s por otra velocidad */
}

/* Para cambiar el eje de rotación: */
.card.flipped .card-inner {
  transform: rotateX(180deg); /* Volteo vertical */
  /* o */
  transform: rotateY(180deg); /* Volteo horizontal (actual) */
}
```

## 🐛 Debugging Tips

### Ver el Estado en Tiempo Real

1. Instala React DevTools (extensión de navegador)
2. Abre DevTools → pestaña "Components"
3. Selecciona componente `App`
4. Ve los estados `words` e `images`

### Console.log Estratégico

```javascript
const handleCardSelect = (cardId) => {
  console.log('Carta clickeada:', cardId);

  const updateCardState = (cards) => {
    const updated = cards.map((card) => {
      if (card.id === cardId) {
        console.log('Cambiando estado de:', card.state);
        // ... lógica
      }
      return card;
    });

    console.log('Cartas actualizadas:', updated);
    return updated;
  };

  setWords(updateCardState);
};
```

### Verificar Clases CSS Aplicadas

1. Abre DevTools (F12)
2. Selecciona una carta con el inspector
3. Ve el panel "Styles"
4. Verifica que las clases se apliquen correctamente

## 📊 Estructura de Datos Detallada

### Estado de una Carta
```javascript
{
  id: 'w1',              // String único
  type: 'word',          // 'word' | 'image'
  content: 'AMOR',       // String (palabra o URL)
  state: 'faceDown'      // 'faceDown' | 'selected' | 'flipped'
}
```

### Estado Global en App.jsx
```javascript
{
  words: [/* 8-88 cartas */],
  images: [/* 8-88 cartas */]
}
```

## 🎯 Patrones de Código

### Actualizar Array de Objetos

```javascript
// Patrón: map + condicional + spread operator
const updateCards = (cards) => {
  return cards.map((card) => {
    if (card.id === targetId) {
      return { ...card, state: 'newState' }; // Crea nuevo objeto
    }
    return card; // Mantiene el original
  });
};
```

### Filtrar y Contar

```javascript
// Contar cartas con cierto estado
const selectedCount = words.filter(card => card.state === 'selected').length;

// Obtener solo cartas volteadas
const flippedCards = images.filter(card => card.state === 'flipped');
```

### Resetear Todo

```javascript
// Patrón: map devolviendo nuevo objeto con estado reseteado
const resetCards = (cards) => {
  return cards.map((card) => ({ ...card, state: 'faceDown' }));
};
```

## ⚡ Optimizaciones Futuras

### Si la App se Vuelve Lenta

1. **Memoización de Componentes**
```javascript
import { memo } from 'react';

const Card = memo(({ card, onSelect }) => {
  // ... código del componente
});
```

2. **useCallback para Funciones**
```javascript
import { useCallback } from 'react';

const handleCardSelect = useCallback((cardId) => {
  // ... lógica
}, [words, images]);
```

3. **Lazy Loading de Imágenes**
```javascript
<img
  src={card.content}
  loading="lazy"
  alt="Carta"
/>
```

## 🧪 Testing Manual

### Checklist de Pruebas

- [ ] Seleccionar una carta (debe aparecer ✓)
- [ ] Deseleccionar carta clickeada (debe quitar ✓)
- [ ] Seleccionar varias cartas de un mazo
- [ ] Seleccionar cartas de ambos mazos
- [ ] Voltear sin cartas seleccionadas (botón deshabilitado)
- [ ] Voltear cartas seleccionadas (deben mostrarse)
- [ ] Reiniciar todo (todas boca abajo)
- [ ] Probar en móvil (responsive)
- [ ] Probar en diferentes navegadores

## 📱 Responsive Breakpoints

```css
/* Desktop: > 768px (default) */

/* Tablets: 768px y menor */
@media (max-width: 768px) {
  /* Cartas más pequeñas */
  /* Grid ajustado */
}

/* Móviles: 480px y menor */
@media (max-width: 480px) {
  /* Cartas muy pequeñas */
  /* Layout vertical */
}
```

## 🚀 Deployment

### Preparar para Producción

1. **Build**
```bash
npm run build
```

2. **Verificar build local**
```bash
npm run preview
```

3. **Deploy en Vercel** (gratis)
```bash
# Instalar CLI de Vercel
npm i -g vercel

# Deploy
vercel
```

4. **Deploy en Netlify**
- Arrastra carpeta `dist/` a netlify.com/drop

## 🔐 Agregar Backend (Futuro)

### Stack Recomendado
- **Backend**: Express.js
- **Base de datos**: PostgreSQL o MongoDB
- **Auth**: JWT o Firebase Auth

### Estructura Sugerida
```
proyecto/
├── client/          # Frontend React (actual)
└── server/          # Backend Node.js
    ├── routes/
    ├── controllers/
    ├── models/
    └── server.js
```

## 💡 Tips para tu Cliente

1. **Antes de la reunión de 2 días**:
   - Ten 5-10 cartas de cada tipo listas
   - Define si quieres imágenes o emojis
   - Piensa en los colores/branding

2. **Durante el desarrollo**:
   - Prueba cada cambio inmediatamente
   - Anota mejoras para versión 2.0
   - No agregues features extras (mantén scope)

3. **Entrega**:
   - Demo en vivo
   - Explica cómo agregar más cartas
   - Deja roadmap de mejoras futuras

## 📞 Preguntas Frecuentes

**P: ¿Cómo agrego 88 cartas rápido?**
R: Crea un script simple:
```javascript
const words = [];
for (let i = 1; i <= 88; i++) {
  words.push({
    id: `w${i}`,
    type: 'word',
    content: `PALABRA_${i}`,
    state: 'faceDown'
  });
}
console.log(JSON.stringify(words, null, 2));
```

**P: ¿Puedo usar TypeScript?**
R: Sí, pero para un proyecto de 2 días, JavaScript es más rápido.

**P: ¿Necesito Redux?**
R: No. useState es suficiente para este proyecto.

---

**¡Mucha suerte con tu proyecto freelance! 🚀**
