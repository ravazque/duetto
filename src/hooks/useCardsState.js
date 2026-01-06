import { useState, useCallback } from 'react';
import { wordCards, imageCards } from '../data/cardsData';
import { initializeCards } from '../utils/cardTransformers';

/**
 * Hook para gestionar el estado de los mazos de cartas
 * Responsabilidad única: Estado y setters de cartas
 *
 * @returns {Object} { words, images, setWords, setImages, updateBothDecks }
 */
export const useCardsState = () => {
  // Helper para cargar cartas iniciales
  const loadInitialCards = useCallback(() => ({
    words: initializeCards(wordCards),
    images: initializeCards(imageCards)
  }), []);

  // Estado de cartas
  const [words, setWords] = useState(() => loadInitialCards().words);
  const [images, setImages] = useState(() => loadInitialCards().images);

  /**
   * Helper para actualizar ambos mazos simultáneamente
   */
  const updateBothDecks = useCallback((updater) => {
    setWords(updater);
    setImages(updater);
  }, []);

  return {
    words,
    images,
    setWords,
    setImages,
    updateBothDecks
  };
};
