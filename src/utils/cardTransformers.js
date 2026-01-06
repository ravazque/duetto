/**
 * Utilidades para transformar y manipular arrays de cartas
 * Estas funciones son puras y reutilizables
 */

import { CARD_STATES } from '../constants/gameConfig';

/**
 * Actualiza el estado de una carta específica por ID
 * @param {Array} cards - Array de cartas
 * @param {string} cardId - ID de la carta a actualizar
 * @param {string} newState - Nuevo estado de la carta
 * @returns {Array} Nuevo array con la carta actualizada
 */
export const updateCardById = (cards, cardId, newState) => {
  return cards.map((card) => {
    if (card.id === cardId) {
      return { ...card, state: newState };
    }
    return card;
  });
};

/**
 * Actualiza el estado de todas las cartas que cumplan una condición
 * @param {Array} cards - Array de cartas
 * @param {Function} predicate - Función que determina qué cartas actualizar
 * @param {string} newState - Nuevo estado para las cartas que cumplan la condición
 * @returns {Array} Nuevo array con las cartas actualizadas
 *
 * @example
 * // Marcar todas las cartas seleccionadas como 'moving-to-end'
 * updateCardsByPredicate(
 *   cards,
 *   card => card.state === 'selected',
 *   'moving-to-end'
 * )
 */
export const updateCardsByPredicate = (cards, predicate, newState) => {
  return cards.map(card => predicate(card) ? { ...card, state: newState } : card);
};

/**
 * Inicializa cartas con un estado específico
 * @param {Array} cards - Array de cartas sin estado
 * @param {string} initialState - Estado inicial (por defecto 'faceDown')
 * @returns {Array} Nuevo array con cartas inicializadas
 */
export const initializeCards = (cards, initialState = CARD_STATES.FACE_DOWN) => {
  return cards.map(card => ({ ...card, state: initialState }));
};

/**
 * Voltea todas las cartas a estado 'faceDown'
 * @param {Array} cards - Array de cartas
 * @returns {Array} Nuevo array con todas las cartas boca abajo
 */
export const flipAllToFaceDown = (cards) => {
  return cards.map((card) => ({
    ...card,
    state: CARD_STATES.FACE_DOWN
  }));
};

/**
 * Mueve las cartas con un estado específico al final del array
 * @param {Array} cards - Array de cartas
 * @param {string} stateToMove - Estado de las cartas a mover
 * @returns {Array} Nuevo array con cartas reordenadas
 *
 * @example
 * // Mover cartas seleccionadas al final
 * moveCardsToEnd(cards, 'selected')
 */
export const moveCardsToEnd = (cards, stateToMove) => {
  const notMoving = cards.filter(card => card.state !== stateToMove);
  const moving = cards.filter(card => card.state === stateToMove);
  return [...notMoving, ...moving];
};

/**
 * Maneja la lógica de selección/deselección de una carta
 * REGLA: Solo una carta seleccionada por mazo a la vez
 * @param {Array} cards - Array de cartas del mazo
 * @param {string} cardId - ID de la carta clickeada
 * @returns {Array|null} Nuevo array actualizado, o null si la carta no pertenece a este mazo
 */
export const toggleCardSelection = (cards, cardId) => {
  // Verificar si la carta pertenece a este mazo
  const clickedCard = cards.find(c => c.id === cardId);

  if (!clickedCard) {
    return null; // No pertenece a este mazo
  }

  // No permitir seleccionar cartas volteadas
  if (clickedCard.state === CARD_STATES.FLIPPED) {
    return cards;
  }

  // Si la carta está siendo deseleccionada
  if (clickedCard.state === CARD_STATES.SELECTED) {
    return updateCardById(cards, cardId, CARD_STATES.FACE_DOWN);
  }

  // Si la carta está faceDown, deseleccionar otras y seleccionar esta
  return cards.map((card) => {
    if (card.id === cardId && card.state === CARD_STATES.FACE_DOWN) {
      return { ...card, state: CARD_STATES.SELECTED };
    } else if (card.state === CARD_STATES.SELECTED) {
      // Deseleccionar cualquier otra carta seleccionada
      return { ...card, state: CARD_STATES.FACE_DOWN };
    }
    return card;
  });
};
