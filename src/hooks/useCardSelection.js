import { useCallback } from 'react';
import { toggleCardSelection } from '../utils/cardTransformers';
import { getSelectedCount } from '../utils/cardSelectors';

/**
 * Hook para gestionar la selección de cartas
 * Responsabilidad única: Lógica de selección y contadores
 *
 * @param {Object} params - Parámetros del hook
 * @param {Array} params.words - Array de palabras
 * @param {Array} params.images - Array de imágenes
 * @param {Function} params.updateBothDecks - Función para actualizar ambos mazos
 *
 * @returns {Object} { handleCardSelect, selectedWordsCount, selectedImagesCount }
 */
export const useCardSelection = ({ words, images, updateBothDecks }) => {
  /**
   * Maneja la selección/deselección de una carta
   */
  const handleCardSelect = useCallback((cardId) => {
    updateBothDecks(cards => toggleCardSelection(cards, cardId) || cards);
  }, [updateBothDecks]);

  // Calcular cartas seleccionadas
  const selectedWordsCount = getSelectedCount(words);
  const selectedImagesCount = getSelectedCount(images);

  return {
    handleCardSelect,
    selectedWordsCount,
    selectedImagesCount
  };
};
