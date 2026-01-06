import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRevealState } from '../useRevealState';

describe('useRevealState', () => {
  describe('Inicialización', () => {
    it('debe inicializar con valores nulos para cartas reveladas', () => {
      const { result } = renderHook(() => useRevealState());

      expect(result.current.revealedWordCard).toBeNull();
      expect(result.current.revealedImageCard).toBeNull();
    });

    it('debe inicializar revealKey en 0', () => {
      const { result } = renderHook(() => useRevealState());

      expect(result.current.revealKey).toBe(0);
    });

    it('debe inicializar revealedPairs en 0', () => {
      const { result } = renderHook(() => useRevealState());

      expect(result.current.revealedPairs).toBe(0);
    });
  });

  describe('setRevealedWordCard', () => {
    it('debe permitir establecer una carta de palabra revelada', () => {
      const { result } = renderHook(() => useRevealState());
      const wordCard = { id: 'w1', type: 'word', content: 'Test' };

      act(() => {
        result.current.setRevealedWordCard(wordCard);
      });

      expect(result.current.revealedWordCard).toEqual(wordCard);
    });

    it('debe permitir limpiar la carta de palabra revelada', () => {
      const { result } = renderHook(() => useRevealState());
      const wordCard = { id: 'w1', type: 'word', content: 'Test' };

      act(() => {
        result.current.setRevealedWordCard(wordCard);
      });

      act(() => {
        result.current.setRevealedWordCard(null);
      });

      expect(result.current.revealedWordCard).toBeNull();
    });
  });

  describe('setRevealedImageCard', () => {
    it('debe permitir establecer una carta de imagen revelada', () => {
      const { result } = renderHook(() => useRevealState());
      const imageCard = { id: 'i1', type: 'image', content: '/img/test.jpg' };

      act(() => {
        result.current.setRevealedImageCard(imageCard);
      });

      expect(result.current.revealedImageCard).toEqual(imageCard);
    });

    it('debe permitir limpiar la carta de imagen revelada', () => {
      const { result } = renderHook(() => useRevealState());
      const imageCard = { id: 'i1', type: 'image', content: '/img/test.jpg' };

      act(() => {
        result.current.setRevealedImageCard(imageCard);
      });

      act(() => {
        result.current.setRevealedImageCard(null);
      });

      expect(result.current.revealedImageCard).toBeNull();
    });
  });

  describe('setRevealKey', () => {
    it('debe permitir incrementar la key de revelación', () => {
      const { result } = renderHook(() => useRevealState());

      act(() => {
        result.current.setRevealKey(prev => prev + 1);
      });

      expect(result.current.revealKey).toBe(1);

      act(() => {
        result.current.setRevealKey(prev => prev + 1);
      });

      expect(result.current.revealKey).toBe(2);
    });
  });

  describe('setRevealedPairs', () => {
    it('debe permitir incrementar el contador de parejas', () => {
      const { result } = renderHook(() => useRevealState());

      act(() => {
        result.current.setRevealedPairs(prev => prev + 1);
      });

      expect(result.current.revealedPairs).toBe(1);

      act(() => {
        result.current.setRevealedPairs(prev => prev + 1);
      });

      expect(result.current.revealedPairs).toBe(2);
    });

    it('debe permitir resetear el contador', () => {
      const { result } = renderHook(() => useRevealState());

      act(() => {
        result.current.setRevealedPairs(5);
      });

      expect(result.current.revealedPairs).toBe(5);

      act(() => {
        result.current.setRevealedPairs(0);
      });

      expect(result.current.revealedPairs).toBe(0);
    });
  });

  describe('Estado combinado', () => {
    it('debe permitir gestionar revelación completa de pareja', () => {
      const { result } = renderHook(() => useRevealState());
      const wordCard = { id: 'w1', type: 'word', content: 'Amor' };
      const imageCard = { id: 'i1', type: 'image', content: '/img/heart.jpg' };

      act(() => {
        result.current.setRevealedWordCard(wordCard);
        result.current.setRevealedImageCard(imageCard);
        result.current.setRevealedPairs(prev => prev + 1);
        result.current.setRevealKey(prev => prev + 1);
      });

      expect(result.current.revealedWordCard).toEqual(wordCard);
      expect(result.current.revealedImageCard).toEqual(imageCard);
      expect(result.current.revealedPairs).toBe(1);
      expect(result.current.revealKey).toBe(1);
    });

    it('debe permitir resetear todo el estado', () => {
      const { result } = renderHook(() => useRevealState());

      act(() => {
        result.current.setRevealedWordCard({ id: 'w1', type: 'word', content: 'Test' });
        result.current.setRevealedImageCard({ id: 'i1', type: 'image', content: '/test.jpg' });
        result.current.setRevealedPairs(3);
        result.current.setRevealKey(5);
      });

      act(() => {
        result.current.setRevealedWordCard(null);
        result.current.setRevealedImageCard(null);
        result.current.setRevealedPairs(0);
      });

      expect(result.current.revealedWordCard).toBeNull();
      expect(result.current.revealedImageCard).toBeNull();
      expect(result.current.revealedPairs).toBe(0);
      expect(result.current.revealKey).toBe(5); // No reseteado
    });
  });
});
