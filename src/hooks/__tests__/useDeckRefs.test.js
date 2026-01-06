import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeckRefs } from '../useDeckRefs';

describe('useDeckRefs', () => {
  describe('Inicialización', () => {
    it('debe crear todas las referencias necesarias', () => {
      const { result } = renderHook(() => useDeckRefs());

      expect(result.current).toHaveProperty('decksContainerRef');
      expect(result.current).toHaveProperty('wordDeckRef');
      expect(result.current).toHaveProperty('imageDeckRef');
    });

    it('debe inicializar refs con current null', () => {
      const { result } = renderHook(() => useDeckRefs());

      expect(result.current.decksContainerRef.current).toBeNull();
      expect(result.current.wordDeckRef.current).toBeNull();
      expect(result.current.imageDeckRef.current).toBeNull();
    });
  });

  describe('Estabilidad de referencias', () => {
    it('debe mantener las mismas referencias entre renders', () => {
      const { result, rerender } = renderHook(() => useDeckRefs());

      const firstRefs = {
        decksContainerRef: result.current.decksContainerRef,
        wordDeckRef: result.current.wordDeckRef,
        imageDeckRef: result.current.imageDeckRef
      };

      rerender();

      expect(result.current.decksContainerRef).toBe(firstRefs.decksContainerRef);
      expect(result.current.wordDeckRef).toBe(firstRefs.wordDeckRef);
      expect(result.current.imageDeckRef).toBe(firstRefs.imageDeckRef);
    });
  });

  describe('Uso con elementos DOM simulados', () => {
    it('debe permitir asignar elementos a las refs', () => {
      const { result } = renderHook(() => useDeckRefs());

      const mockContainer = { nodeName: 'DIV', className: 'decks-container' };
      const mockWordDeck = { nodeName: 'DIV', className: 'deck-grid' };
      const mockImageDeck = { nodeName: 'DIV', className: 'deck-grid' };

      result.current.decksContainerRef.current = mockContainer;
      result.current.wordDeckRef.current = mockWordDeck;
      result.current.imageDeckRef.current = mockImageDeck;

      expect(result.current.decksContainerRef.current).toBe(mockContainer);
      expect(result.current.wordDeckRef.current).toBe(mockWordDeck);
      expect(result.current.imageDeckRef.current).toBe(mockImageDeck);
    });
  });
});
