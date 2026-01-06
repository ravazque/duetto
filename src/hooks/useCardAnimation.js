import { useState, useCallback } from 'react';
import { CARD_STATES } from '../constants/gameConfig';
import { MOVE_TO_END_DURATION, REVEAL_COMPLETE_DELAY } from '../constants/animations';
import { getSelectedCard } from '../utils/cardSelectors';
import { updateCardsByPredicate, moveCardsToEnd } from '../utils/cardTransformers';

/**
 * Hook para gestionar las animaciones de revelación de cartas
 *
 * @param {Object} params - Parámetros del hook
 * @param {Array} params.words - Array de palabras
 * @param {Array} params.images - Array de imágenes
 * @param {Function} params.updateBothDecks - Función para actualizar ambos mazos
 * @param {Function} params.setRevealedWordCard - Setter para carta de palabra revelada
 * @param {Function} params.setRevealedImageCard - Setter para carta de imagen revelada
 * @param {Function} params.setRevealKey - Setter para key de animación
 * @param {Function} params.setRevealedPairs - Setter para contador de parejas
 *
 * @returns {Object} { isRevealing, flipSelected }
 */
export const useCardAnimation = ({
  words,
  images,
  updateBothDecks,
  setRevealedWordCard,
  setRevealedImageCard,
  setRevealKey,
  setRevealedPairs
}) => {
  const [isRevealing, setIsRevealing] = useState(false);

  /**
   * Revela las cartas seleccionadas moviéndolas al área de revelación
   */
  const flipSelected = useCallback(() => {
    // Bloquear mientras se revelan
    setIsRevealing(true);

    // Encontrar cartas seleccionadas
    const selectedWord = getSelectedCard(words);
    const selectedImage = getSelectedCard(images);

    // PASO 1: Marcar y mover al final
    const markAndMove = (cards) => {
      const marked = updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.SELECTED,
        CARD_STATES.MOVING_TO_END
      );
      return moveCardsToEnd(marked, CARD_STATES.MOVING_TO_END);
    };

    updateBothDecks(markAndMove);

    // PASO 2: Voltear después del movimiento
    setTimeout(() => {
      updateBothDecks(cards => updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.MOVING_TO_END,
        CARD_STATES.FLIPPED
      ));

      // Actualizar área de revelación
      if (selectedWord) setRevealedWordCard(selectedWord);
      if (selectedImage) setRevealedImageCard(selectedImage);

      // Incrementar contador
      setRevealedPairs(prev => prev + 1);

      // Incrementar key para re-animación
      setRevealKey(prev => prev + 1);

      // PASO 3: Desbloquear UI
      setTimeout(() => {
        setIsRevealing(false);
      }, REVEAL_COMPLETE_DELAY);
    }, MOVE_TO_END_DURATION);
  }, [
    words,
    images,
    updateBothDecks,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealedPairs,
    setRevealKey
  ]);

  return {
    isRevealing,
    flipSelected
  };
};
