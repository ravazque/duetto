/**
 * Utilidades generales para manipulación de arrays
 * Funciones puras y reutilizables
 */

/**
 * Mezcla un array usando el algoritmo Fisher-Yates
 * Este es el algoritmo estándar para generar permutaciones aleatorias uniformes
 * Complejidad: O(n)
 *
 * @param {Array} array - Array a mezclar
 * @returns {Array} Nuevo array mezclado (no modifica el original)
 *
 * @example
 * const cards = [1, 2, 3, 4, 5];
 * const shuffled = fisherYatesShuffle(cards);
 * // shuffled podría ser [3, 1, 5, 2, 4]
 * // cards sigue siendo [1, 2, 3, 4, 5] (inmutabilidad)
 */
export const fisherYatesShuffle = (array) => {
  // Crear una copia para no modificar el array original
  const shuffled = [...array];

  // Iterar desde el final hacia el inicio
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Seleccionar un índice aleatorio entre 0 e i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiar elementos en posiciones i y j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/**
 * Alias más descriptivo para mezclar cartas
 * @param {Array} cards - Array de cartas a mezclar
 * @returns {Array} Nuevo array de cartas mezcladas
 */
export const shuffleCards = (cards) => {
  return fisherYatesShuffle(cards);
};
