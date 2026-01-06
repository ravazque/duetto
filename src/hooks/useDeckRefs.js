import { useRef } from 'react';

/**
 * Hook para gestionar las referencias DOM de los mazos
 * Responsabilidad única: Referencias a elementos del DOM
 *
 * @returns {Object} { decksContainerRef, wordDeckRef, imageDeckRef }
 */
export const useDeckRefs = () => {
  const decksContainerRef = useRef(null);
  const wordDeckRef = useRef(null);
  const imageDeckRef = useRef(null);

  return {
    decksContainerRef,
    wordDeckRef,
    imageDeckRef
  };
};
