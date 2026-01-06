import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePersistedState } from '../usePersistedState';
import storage from '../../services/storage';

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Inicialización', () => {
    it('debe usar el valor por defecto si no hay nada en localStorage', () => {
      const { result } = renderHook(() =>
        usePersistedState('test-key', 'default-value')
      );

      expect(result.current[0]).toBe('default-value');
    });

    it('debe cargar el valor desde localStorage si existe', () => {
      storage.set('test-key', 'stored-value');

      const { result } = renderHook(() =>
        usePersistedState('test-key', 'default-value')
      );

      expect(result.current[0]).toBe('stored-value');
    });

    it('debe funcionar con diferentes tipos de datos', () => {
      storage.set('number-key', 42);
      storage.set('boolean-key', true);
      storage.set('object-key', { foo: 'bar' });
      storage.set('array-key', [1, 2, 3]);

      const { result: numberResult } = renderHook(() =>
        usePersistedState('number-key', 0)
      );
      expect(numberResult.current[0]).toBe(42);

      const { result: booleanResult } = renderHook(() =>
        usePersistedState('boolean-key', false)
      );
      expect(booleanResult.current[0]).toBe(true);

      const { result: objectResult } = renderHook(() =>
        usePersistedState('object-key', {})
      );
      expect(objectResult.current[0]).toEqual({ foo: 'bar' });

      const { result: arrayResult } = renderHook(() =>
        usePersistedState('array-key', [])
      );
      expect(arrayResult.current[0]).toEqual([1, 2, 3]);
    });
  });

  describe('Actualización de estado', () => {
    it('debe actualizar el estado correctamente', () => {
      const { result } = renderHook(() =>
        usePersistedState('test-key', 'initial')
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
    });

    it('debe persistir el nuevo valor en localStorage', () => {
      const { result } = renderHook(() =>
        usePersistedState('test-key', 'initial')
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(storage.get('test-key')).toBe('updated');
    });

    it('debe funcionar con función updater', () => {
      const { result } = renderHook(() =>
        usePersistedState('counter', 0)
      );

      act(() => {
        result.current[1](prev => prev + 1);
      });

      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1](prev => prev + 1);
      });

      expect(result.current[0]).toBe(2);
    });
  });

  describe('Callback onUpdate', () => {
    it('debe llamar onUpdate cuando el estado cambia', () => {
      const onUpdate = vi.fn();

      const { result } = renderHook(() =>
        usePersistedState('test-key', 'initial', onUpdate)
      );

      // Se llama en el montaje inicial
      expect(onUpdate).toHaveBeenCalledWith('initial');
      expect(onUpdate).toHaveBeenCalledTimes(1);

      act(() => {
        result.current[1]('updated');
      });

      expect(onUpdate).toHaveBeenCalledWith('updated');
      expect(onUpdate).toHaveBeenCalledTimes(2);
    });

    it('debe funcionar sin onUpdate (opcional)', () => {
      const { result } = renderHook(() =>
        usePersistedState('test-key', 'initial')
      );

      expect(() => {
        act(() => {
          result.current[1]('updated');
        });
      }).not.toThrow();

      expect(result.current[0]).toBe('updated');
    });

    it('debe permitir efectos secundarios en onUpdate', () => {
      let sideEffect = '';

      const onUpdate = (value) => {
        sideEffect = `effect-${value}`;
      };

      const { result } = renderHook(() =>
        usePersistedState('test-key', 'initial', onUpdate)
      );

      expect(sideEffect).toBe('effect-initial');

      act(() => {
        result.current[1]('new-value');
      });

      expect(sideEffect).toBe('effect-new-value');
    });
  });

  describe('Múltiples instancias', () => {
    it('debe mantener estados separados para diferentes keys', () => {
      const { result: result1 } = renderHook(() =>
        usePersistedState('key-1', 'value-1')
      );

      const { result: result2 } = renderHook(() =>
        usePersistedState('key-2', 'value-2')
      );

      expect(result1.current[0]).toBe('value-1');
      expect(result2.current[0]).toBe('value-2');

      act(() => {
        result1.current[1]('updated-1');
      });

      expect(result1.current[0]).toBe('updated-1');
      expect(result2.current[0]).toBe('value-2'); // No debería cambiar
    });
  });

  describe('Persistencia', () => {
    it('debe mantener el valor después de remount', () => {
      const { result, unmount } = renderHook(() =>
        usePersistedState('test-key', 'initial')
      );

      act(() => {
        result.current[1]('persisted-value');
      });

      unmount();

      const { result: newResult } = renderHook(() =>
        usePersistedState('test-key', 'initial')
      );

      expect(newResult.current[0]).toBe('persisted-value');
    });
  });
});
