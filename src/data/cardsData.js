// Datos de ejemplo para las cartas - 44 cartas por mazo (88 total)

// Lista de palabras para el mazo
const wordList = [
  'AMOR', 'MIEDO', 'ESPERANZA', 'SOLEDAD', 'LIBERTAD', 'ALEGRÍA', 'TRISTEZA', 'FAMILIA',
  'FUERZA', 'PAZ', 'CONFIANZA', 'CAMBIO', 'DOLOR', 'VALENTÍA', 'FUTURO', 'PASADO',
  'SUEÑO', 'RABIA', 'PERDÓN', 'CULPA', 'GRATITUD', 'ACEPTACIÓN', 'TIEMPO', 'HOGAR',
  'ÉXITO', 'FRACASO', 'SALUD', 'ENFERMEDAD', 'TRABAJO', 'DESCANSO', 'AMIGO', 'ENEMIGO',
  'VERDAD', 'MENTIRA', 'LUZ', 'OSCURIDAD', 'VIDA', 'MUERTE', 'RISA', 'LLANTO',
  'PODER', 'DEBILIDAD', 'SABIDURÍA', 'IGNORANCIA'
];

export const wordCards = wordList.map((word, index) => ({
  id: `w${index + 1}`,
  type: 'word',
  content: word,
  state: 'faceDown'
}));

// Lista de emojis/símbolos para el mazo de imágenes
const emojiList = [
  '🌅', '🌊', '🏔️', '🌳', '🦋', '🌙', '⭐', '🌸',
  '🔥', '💧', '🌈', '☀️', '🌺', '🍃', '🦅', '🐚',
  '🕊️', '🌻', '🍂', '⛰️', '🌵', '🌴', '🌾', '🌿',
  '🍀', '🌼', '🌷', '🥀', '🌹', '💐', '🏵️', '🌱',
  '🍄', '🌰', '🐌', '🦗', '🐛', '🐜', '🐝', '🐞',
  '🦂', '🕷️', '🦟', '🦠'
];

export const imageCards = emojiList.map((emoji, index) => ({
  id: `i${index + 1}`,
  type: 'image',
  content: emoji,
  state: 'faceDown'
}));

// NOTA IMPORTANTE:
// Para tu versión final, las imágenes deberían ser URLs o rutas a archivos:
// content: '/images/card-01.jpg'
// Por ahora uso emojis para hacer la demo funcional sin necesidad de imágenes
