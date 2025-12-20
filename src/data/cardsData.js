// Datos para las cartas - 88 cartas de palabras + 88 cartas de imágenes
// Estas palabras e imágenes son FIJAS y no se pueden editar desde la interfaz

// Lista de palabras para el mazo (88 palabras fijas)
const wordList = [
  'ESCONDER', 'VACILACIÓN', 'ODIO', 'HÁBITO', 'ERÓTICO', 'JACTARSE', 'HOMOSEXUAL', 'ESPERANZA',
  'JUEGO DE PODER', 'RESENTIR', 'HOGAR', 'AGARRAR', 'RESISTIR', 'RETIRO', 'RÍGIDO', 'RIVAL',
  'MADRE', 'DESNUDO', 'DEUDA', 'HOMBRES', 'DOLOR', 'POSTURA', 'HUMILLAR', 'VIOLAR',
  'ESPERAR', 'AGOTADO', 'SABIO', 'MUJERES', 'MARAVILLOSO', 'MALO', 'AMOR', 'EXPERTO',
  'CÓMICO', 'OBSESIÓN', 'CONFORMAR', 'DEPENDER', 'CÓLERA', 'SOLO', 'DISCULPA', 'ANSIEDAD',
  'APARIENCIA', 'ATAQUE', 'ATRACCIÓN', 'COMIENZO', 'CONFUSIÓN', 'DESTRUIR', 'DESGRACIA', 'DESAGRADABLE',
  'ABURRIMIENTO', 'JEFE', 'CAMBIO', 'SUEÑO', 'ELIMINAR', 'EMBARAZOSO', 'FASCINACIÓN', 'PADRE',
  'MIEDO', 'JUEGO', 'DAR', 'PESAR', 'CULPA', 'DEBERÍA', 'COMPARTIR', 'VERGÜENZA',
  'METO LA PATA', 'ESCLAVO', 'PARAR', 'PUDRIR', 'ALEGRÍA', 'INTIMIDAR', 'RISA', 'SOLTAR',
  'EXTRAÑOS', 'MENTIRA', 'ESTÚPIDO', 'ÉXITO', 'SUPRIMIR', 'TOMAR', 'AMENAZA', 'FEO',
  'VÍCTIMA', 'CICLO', 'PELIGRO', '¡ADELANTE!', 'FRACASAR', 'FIRME', 'CARIÑO', 'NIÑO'
];

export const wordCards = wordList.map((word, index) => ({
  id: `w${index + 1}`,
  type: 'word',
  content: word,
  state: 'faceDown'
}));

// Lista de imágenes para el mazo (88 imágenes fijas)
// Las imágenes están en public/images/ y se cargan como card-01.png, card-02.png, etc.
const imageList = Array.from({ length: 88 }, (_, index) => {
  const cardNumber = String(index + 1).padStart(2, '0');
  return `./images/card-${cardNumber}.png`;
});

export const imageCards = imageList.map((imagePath, index) => ({
  id: `i${index + 1}`,
  type: 'image',
  content: imagePath,
  state: 'faceDown'
}));
