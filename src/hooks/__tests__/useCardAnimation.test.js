import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCardAnimation } from '../useCardAnimation';
import { CARD_STATES } from '../../constants/gameConfig';

describe('useCardAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockCards = (count, type) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}${i + 1}`,
      type,
      content: `${type} ${i + 1}`,
      state: CARD_STATES.FACE_DOWN
    }));
  };

  describe('Inicialización', () => {
    it('debe inicializar isRevealing en false', () => {
      const mockParams = {
        words: createMockCards(3, 'word'),
        images: createMockCards(3, 'image'),
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      expect(result.current.isRevealing).toBe(false);
    });

    it('debe proporcionar función flipSelected', () => {
      const mockParams = {
        words: createMockCards(3, 'word'),
        images: createMockCards(3, 'image'),
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      expect(result.current.flipSelected).toBeInstanceOf(Function);
    });
  });

  describe('flipSelected', () => {
    it('debe establecer isRevealing a true inmediatamente', () => {
      const words = createMockCards(3, 'word');
      words[0].state = CARD_STATES.SELECTED;

      const images = createMockCards(3, 'image');
      images[1].state = CARD_STATES.SELECTED;

      const mockParams = {
        words,
        images,
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      act(() => {
        result.current.flipSelected();
      });

      expect(result.current.isRevealing).toBe(true);
    });

    it('debe llamar updateBothDecks para marcar y mover cartas', () => {
      const words = createMockCards(2, 'word');
      words[0].state = CARD_STATES.SELECTED;

      const images = createMockCards(2, 'image');
      images[0].state = CARD_STATES.SELECTED;

      const updateBothDecks = vi.fn();

      const mockParams = {
        words,
        images,
        updateBothDecks,
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      act(() => {
        result.current.flipSelected();
      });

      // Debe llamarse para marcar y mover al final
      expect(updateBothDecks).toHaveBeenCalled();
    });

    it('debe actualizar cartas reveladas después del timeout', async () => {
      const words = createMockCards(2, 'word');
      const selectedWord = { ...words[0], state: CARD_STATES.SELECTED };
      words[0] = selectedWord;

      const images = createMockCards(2, 'image');
      const selectedImage = { ...images[0], state: CARD_STATES.SELECTED };
      images[0] = selectedImage;

      const setRevealedWordCard = vi.fn();
      const setRevealedImageCard = vi.fn();
      const setRevealedPairs = vi.fn();
      const setRevealKey = vi.fn();
      const updateBothDecks = vi.fn();

      const mockParams = {
        words,
        images,
        updateBothDecks,
        setRevealedWordCard,
        setRevealedImageCard,
        setRevealKey,
        setRevealedPairs
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      act(() => {
        result.current.flipSelected();
      });

      // Avanzar el primer timeout (MOVE_TO_END_DURATION)
      await act(async () => {
        vi.advanceTimersByTime(400);
      });

      expect(setRevealedWordCard).toHaveBeenCalledWith(selectedWord);
      expect(setRevealedImageCard).toHaveBeenCalledWith(selectedImage);
      expect(setRevealedPairs).toHaveBeenCalled();
      expect(setRevealKey).toHaveBeenCalled();
    });

    it('debe restaurar isRevealing después de la animación completa', async () => {
      const words = createMockCards(2, 'word');
      words[0].state = CARD_STATES.SELECTED;

      const images = createMockCards(2, 'image');
      images[0].state = CARD_STATES.SELECTED;

      const mockParams = {
        words,
        images,
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      act(() => {
        result.current.flipSelected();
      });

      expect(result.current.isRevealing).toBe(true);

      // Avanzar todos los timers
      await act(async () => {
        vi.runAllTimers();
      });

      expect(result.current.isRevealing).toBe(false);
    });

    it('debe incrementar contador de parejas reveladas', async () => {
      const words = createMockCards(2, 'word');
      words[0].state = CARD_STATES.SELECTED;

      const images = createMockCards(2, 'image');
      images[0].state = CARD_STATES.SELECTED;

      const setRevealedPairs = vi.fn();

      const mockParams = {
        words,
        images,
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs
      };

      const { result } = renderHook(() => useCardAnimation(mockParams));

      act(() => {
        result.current.flipSelected();
      });

      await act(async () => {
        vi.advanceTimersByTime(400);
      });

      expect(setRevealedPairs).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Memoización', () => {
    it('debe memoizar flipSelected con useCallback', () => {
      const words = createMockCards(2, 'word');
      const images = createMockCards(2, 'image');

      const mockParams = {
        words,
        images,
        updateBothDecks: vi.fn(),
        setRevealedWordCard: vi.fn(),
        setRevealedImageCard: vi.fn(),
        setRevealKey: vi.fn(),
        setRevealedPairs: vi.fn()
      };

      const { result, rerender } = renderHook(() => useCardAnimation(mockParams));

      const firstFlipSelected = result.current.flipSelected;

      rerender();

      // Debería ser la misma función si las dependencias no cambian
      expect(result.current.flipSelected).toBe(firstFlipSelected);
    });
  });
});
