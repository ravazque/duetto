import { useState } from 'react';

/**
 * Hook para gestionar el estado de revelación de cartas
 * Responsabilidad única: Estado de área de revelación
 *
 * @returns {Object} Estado y setters de revelación
 */
export const useRevealState = () => {
  const [revealedWordCard, setRevealedWordCard] = useState(null);
  const [revealedImageCard, setRevealedImageCard] = useState(null);
  const [revealKey, setRevealKey] = useState(0);
  const [revealedPairs, setRevealedPairs] = useState(0);

  return {
    revealedWordCard,
    revealedImageCard,
    revealKey,
    revealedPairs,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealKey,
    setRevealedPairs
  };
};
