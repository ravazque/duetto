import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardSelection } from '../useCardSelection';
import { CARD_STATES } from '../../constants/gameConfig';

describe('useCardSelection', () => {
  const createMockCards = (count, type) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}${i + 1}`,
      type,
      content: `${type} ${i + 1}`,
      state: CARD_STATES.FACE_DOWN
    }));
  };

  describe('Inicialización', () => {
    it('debe calcular correctamente las cartas seleccionadas inicialmente (0)', () => {
      const words = createMockCards(5, 'word');
      const images = createMockCards(5, 'image');
      const updateBothDecks = vi.fn();

      const { result } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      expect(result.current.selectedWordsCount).toBe(0);
      expect(result.current.selectedImagesCount).toBe(0);
    });

    it('debe calcular correctamente cuando hay cartas seleccionadas', () => {
      const words = createMockCards(5, 'word');
      words[0].state = CARD_STATES.SELECTED;
      words[2].state = CARD_STATES.SELECTED;

      const images = createMockCards(5, 'image');
      images[1].state = CARD_STATES.SELECTED;

      const updateBothDecks = vi.fn();

      const { result } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      expect(result.current.selectedWordsCount).toBe(2);
      expect(result.current.selectedImagesCount).toBe(1);
    });
  });

  describe('handleCardSelect', () => {
    it('debe llamar updateBothDecks con la función correcta', () => {
      const words = createMockCards(3, 'word');
      const images = createMockCards(3, 'image');
      const updateBothDecks = vi.fn((updater) => {
        // Simular la actualización
        const updated = updater(words);
        return updated;
      });

      const { result } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      act(() => {
        result.current.handleCardSelect('word1');
      });

      expect(updateBothDecks).toHaveBeenCalledTimes(1);
      expect(updateBothDecks).toHaveBeenCalledWith(expect.any(Function));
    });

    it('debe ser memoizado con useCallback', () => {
      const words = createMockCards(3, 'word');
      const images = createMockCards(3, 'image');
      const updateBothDecks = vi.fn();

      const { result, rerender } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      const firstHandler = result.current.handleCardSelect;

      rerender();

      expect(result.current.handleCardSelect).toBe(firstHandler);
    });

    it('debe actualizarse cuando updateBothDecks cambia', () => {
      const words = createMockCards(3, 'word');
      const images = createMockCards(3, 'image');
      let updateBothDecks = vi.fn();

      const { result, rerender } = renderHook(
        ({ updateFn }) => useCardSelection({ words, images, updateBothDecks: updateFn }),
        { initialProps: { updateFn: updateBothDecks } }
      );

      const firstHandler = result.current.handleCardSelect;

      updateBothDecks = vi.fn(); // Nueva función
      rerender({ updateFn: updateBothDecks });

      expect(result.current.handleCardSelect).not.toBe(firstHandler);
    });
  });

  describe('Contadores reactivos', () => {
    it('debe actualizar contadores cuando cambian las cartas', () => {
      const words = createMockCards(3, 'word');
      const images = createMockCards(3, 'image');
      const updateBothDecks = vi.fn();

      const { result, rerender } = renderHook(
        ({ w, i }) => useCardSelection({ words: w, images: i, updateBothDecks }),
        { initialProps: { w: words, i: images } }
      );

      expect(result.current.selectedWordsCount).toBe(0);

      // Simular selección de carta
      const newWords = [...words];
      newWords[0] = { ...newWords[0], state: CARD_STATES.SELECTED };

      rerender({ w: newWords, i: images });

      expect(result.current.selectedWordsCount).toBe(1);
    });

    it('debe contar solo cartas en estado SELECTED', () => {
      const words = createMockCards(5, 'word');
      words[0].state = CARD_STATES.SELECTED;
      words[1].state = CARD_STATES.FLIPPED;
      words[2].state = CARD_STATES.MOVING_TO_END;
      words[3].state = CARD_STATES.SELECTED;

      const images = createMockCards(5, 'image');
      const updateBothDecks = vi.fn();

      const { result } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      expect(result.current.selectedWordsCount).toBe(2); // Solo las SELECTED
    });
  });

  describe('Integración con toggleCardSelection', () => {
    it('debe pasar una función que invoca toggleCardSelection', () => {
      const words = createMockCards(3, 'word');
      const images = createMockCards(3, 'image');

      let capturedUpdater;
      const updateBothDecks = vi.fn((updater) => {
        capturedUpdater = updater;
      });

      const { result } = renderHook(() =>
        useCardSelection({ words, images, updateBothDecks })
      );

      act(() => {
        result.current.handleCardSelect('word1');
      });

      // Verificar que la función updater funciona correctamente
      const updated = capturedUpdater(words);
      expect(updated).toBeDefined();
      expect(Array.isArray(updated)).toBe(true);
    });
  });
});
