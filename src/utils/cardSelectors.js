/**
 * Utilidades para consultar y filtrar cartas
 * Estas funciones no modifican el array, solo lo consultan
 */

import { CARD_STATES } from '../constants/gameConfig';

/**
 * Encuentra la primera carta con un estado específico
 * @param {Array} cards - Array de cartas
 * @param {string} state - Estado a buscar
 * @returns {Object|undefined} La carta encontrada o undefined
 */
export const findCardByState = (cards, state) => {
  return cards.find(card => card.state === state);
};

/**
 * Encuentra la carta seleccionada en un mazo
 * @param {Array} cards - Array de cartas
 * @returns {Object|undefined} La carta seleccionada o undefined
 */
export const getSelectedCard = (cards) => {
  return findCardByState(cards, CARD_STATES.SELECTED);
};

/**
 * Cuenta cuántas cartas tienen un estado específico
 * @param {Array} cards - Array de cartas
 * @param {string} state - Estado a contar
 * @returns {number} Cantidad de cartas con ese estado
 */
export const countCardsByState = (cards, state) => {
  return cards.filter(card => card.state === state).length;
};

/**
 * Cuenta cuántas cartas están seleccionadas
 * @param {Array} cards - Array de cartas
 * @returns {number} Cantidad de cartas seleccionadas
 */
export const getSelectedCount = (cards) => {
  return countCardsByState(cards, CARD_STATES.SELECTED);
};

/**
 * Filtra cartas por estado
 * @param {Array} cards - Array de cartas
 * @param {string} state - Estado a filtrar
 * @returns {Array} Array con las cartas que tienen ese estado
 */
export const filterCardsByState = (cards, state) => {
  return cards.filter(card => card.state === state);
};

/**
 * Particiona un array de cartas en dos grupos según un estado
 * @param {Array} cards - Array de cartas
 * @param {string} state - Estado para particionar
 * @returns {Object} Objeto con dos arrays: { matching, others }
 *
 * @example
 * const { matching, others } = partitionByState(cards, 'selected')
 * // matching: cartas seleccionadas
 * // others: resto de cartas
 */
export const partitionByState = (cards, state) => {
  return {
    matching: cards.filter(card => card.state === state),
    others: cards.filter(card => card.state !== state)
  };
};

/**
 * Verifica si hay al menos una carta seleccionada en el mazo
 * @param {Array} cards - Array de cartas
 * @returns {boolean} true si hay al menos una carta seleccionada
 */
export const hasSelectedCard = (cards) => {
  return cards.some(card => card.state === CARD_STATES.SELECTED);
};

/**
 * Verifica si una carta específica puede ser seleccionada
 * @param {Object} card - La carta a verificar
 * @returns {boolean} true si la carta puede ser seleccionada
 */
export const canSelectCard = (card) => {
  return card.state !== CARD_STATES.FLIPPED;
};
