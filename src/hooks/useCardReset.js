import { useState, useCallback } from 'react';
import { FLIP_TO_FACEDOWN_DELAY, SHUFFLE_UNLOCK_DELAY } from '../constants/animations';
import { flipAllToFaceDown } from '../utils/cardTransformers';
import { shuffleCards } from '../utils/array';

/**
 * Hook para gestionar el reseteo y mezclado de cartas
 *
 * @param {Object} params - Parámetros del hook
 * @param {Function} params.updateBothDecks - Función para actualizar ambos mazos
 * @param {Function} params.setRevealedWordCard - Setter para carta de palabra revelada
 * @param {Function} params.setRevealedImageCard - Setter para carta de imagen revelada
 * @param {Function} params.setRevealedPairs - Setter para contador de parejas
 *
 * @returns {Object} { isShuffling, resetCards }
 */
export const useCardReset = ({
  updateBothDecks,
  setRevealedWordCard,
  setRevealedImageCard,
  setRevealedPairs
}) => {
  const [isShuffling, setIsShuffling] = useState(false);

  /**
   * Reinicia y mezcla todas las cartas
   */
  const resetCards = useCallback(() => {
    // Bloquear durante el mezclado
    setIsShuffling(true);

    // Limpiar cartas reveladas y contador
    setRevealedWordCard(null);
    setRevealedImageCard(null);
    setRevealedPairs(0);

    // PASO 1: Voltear todas a faceDown
    updateBothDecks(flipAllToFaceDown);

    // PASO 2: Mezclar después de la animación
    setTimeout(() => {
      updateBothDecks(shuffleCards);

      // PASO 3: Desbloquear
      setTimeout(() => {
        setIsShuffling(false);
      }, SHUFFLE_UNLOCK_DELAY);
    }, FLIP_TO_FACEDOWN_DELAY);
  }, [
    updateBothDecks,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealedPairs
  ]);

  return {
    isShuffling,
    resetCards
  };
};
