import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCardsState } from '../useCardsState';
import { CARD_STATES } from '../../constants/gameConfig';

describe('useCardsState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Inicialización', () => {
    it('debe inicializar con 88 cartas de palabras', () => {
      const { result } = renderHook(() => useCardsState());

      expect(result.current.words).toHaveLength(88);
      expect(result.current.words[0]).toHaveProperty('id');
      expect(result.current.words[0]).toHaveProperty('type', 'word');
      expect(result.current.words[0]).toHaveProperty('content');
      expect(result.current.words[0]).toHaveProperty('state', CARD_STATES.FACE_DOWN);
    });

    it('debe inicializar con 88 cartas de imágenes', () => {
      const { result } = renderHook(() => useCardsState());

      expect(result.current.images).toHaveLength(88);
      expect(result.current.images[0]).toHaveProperty('id');
      expect(result.current.images[0]).toHaveProperty('type', 'image');
      expect(result.current.images[0]).toHaveProperty('content');
      expect(result.current.images[0]).toHaveProperty('state', CARD_STATES.FACE_DOWN);
    });

    it('debe tener IDs únicos para palabras', () => {
      const { result } = renderHook(() => useCardsState());
      const ids = result.current.words.map(card => card.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(88);
    });

    it('debe tener IDs únicos para imágenes', () => {
      const { result } = renderHook(() => useCardsState());
      const ids = result.current.images.map(card => card.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(88);
    });
  });

  describe('Setters', () => {
    it('debe permitir actualizar el estado de palabras', () => {
      const { result } = renderHook(() => useCardsState());

      act(() => {
        result.current.setWords(prevWords =>
          prevWords.map((card, idx) =>
            idx === 0 ? { ...card, state: CARD_STATES.SELECTED } : card
          )
        );
      });

      expect(result.current.words[0].state).toBe(CARD_STATES.SELECTED);
      expect(result.current.words[1].state).toBe(CARD_STATES.FACE_DOWN);
    });

    it('debe permitir actualizar el estado de imágenes', () => {
      const { result } = renderHook(() => useCardsState());

      act(() => {
        result.current.setImages(prevImages =>
          prevImages.map((card, idx) =>
            idx === 0 ? { ...card, state: CARD_STATES.SELECTED } : card
          )
        );
      });

      expect(result.current.images[0].state).toBe(CARD_STATES.SELECTED);
      expect(result.current.images[1].state).toBe(CARD_STATES.FACE_DOWN);
    });
  });

  describe('updateBothDecks', () => {
    it('debe actualizar ambos mazos simultáneamente', () => {
      const { result } = renderHook(() => useCardsState());

      act(() => {
        result.current.updateBothDecks(cards =>
          cards.map(card => ({ ...card, state: CARD_STATES.FLIPPED }))
        );
      });

      expect(result.current.words.every(card => card.state === CARD_STATES.FLIPPED)).toBe(true);
      expect(result.current.images.every(card => card.state === CARD_STATES.FLIPPED)).toBe(true);
    });

    it('debe aplicar la misma transformación a ambos mazos', () => {
      const { result } = renderHook(() => useCardsState());

      const markFirstAsSelected = (cards) =>
        cards.map((card, idx) =>
          idx === 0 ? { ...card, state: CARD_STATES.SELECTED } : card
        );

      act(() => {
        result.current.updateBothDecks(markFirstAsSelected);
      });

      expect(result.current.words[0].state).toBe(CARD_STATES.SELECTED);
      expect(result.current.images[0].state).toBe(CARD_STATES.SELECTED);
    });
  });

  describe('Inmutabilidad', () => {
    it('no debe mutar el estado original al actualizar', () => {
      const { result } = renderHook(() => useCardsState());
      const originalWords = result.current.words;

      act(() => {
        result.current.setWords(prevWords =>
          prevWords.map(card => ({ ...card, state: CARD_STATES.SELECTED }))
        );
      });

      // El estado original no debe cambiar
      expect(originalWords[0].state).toBe(CARD_STATES.FACE_DOWN);
      expect(result.current.words[0].state).toBe(CARD_STATES.SELECTED);
    });
  });
});
