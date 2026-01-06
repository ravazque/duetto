import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useZoom } from '../useZoom';
import { ZOOM_LEVELS, ZOOM_CONFIG } from '../../constants/zoomConfig';

describe('useZoom', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--app-zoom');
  });

  it('debe inicializar con zoom por defecto (1.0)', () => {
    const { result } = renderHook(() => useZoom());

    expect(result.current.zoomLevel).toBe(ZOOM_CONFIG.DEFAULT);
  });

  it('debe cargar zoom desde localStorage', () => {
    localStorage.setItem('zoomLevel', '1.5');

    const { result } = renderHook(() => useZoom());

    expect(result.current.zoomLevel).toBe(1.5);
  });

  it('debe aumentar el zoom con zoomIn', () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.zoomIn();
    });

    expect(result.current.zoomLevel).toBe(1.2); // Siguiente nivel después de 1.0
  });

  it('debe reducir el zoom con zoomOut', () => {
    localStorage.setItem('zoomLevel', '1.2');
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.zoomOut();
    });

    expect(result.current.zoomLevel).toBe(1.0);
  });

  it('no debe aumentar el zoom más allá del máximo', () => {
    localStorage.setItem('zoomLevel', '1.8'); // Máximo
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.zoomIn();
    });

    expect(result.current.zoomLevel).toBe(1.8); // Sin cambios
  });

  it('no debe reducir el zoom más allá del mínimo', () => {
    localStorage.setItem('zoomLevel', '0.6'); // Mínimo
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.zoomOut();
    });

    expect(result.current.zoomLevel).toBe(0.6); // Sin cambios
  });

  it('debe actualizar canZoomIn correctamente', () => {
    localStorage.setItem('zoomLevel', '1.8'); // Máximo
    const { result } = renderHook(() => useZoom());

    expect(result.current.canZoomIn).toBe(false);

    act(() => {
      result.current.setZoomLevel(1.0);
    });

    expect(result.current.canZoomIn).toBe(true);
  });

  it('debe actualizar canZoomOut correctamente', () => {
    localStorage.setItem('zoomLevel', '0.6'); // Mínimo
    const { result } = renderHook(() => useZoom());

    expect(result.current.canZoomOut).toBe(false);

    act(() => {
      result.current.setZoomLevel(1.0);
    });

    expect(result.current.canZoomOut).toBe(true);
  });

  it('debe permitir establecer el zoom directamente', () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.setZoomLevel(1.5);
    });

    expect(result.current.zoomLevel).toBe(1.5);
  });

  it('debe persistir el zoom en localStorage', () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.setZoomLevel(1.5);
    });

    expect(localStorage.getItem('zoomLevel')).toBe('1.5');
  });

  it('debe aplicar el zoom al CSS custom property', () => {
    const { result } = renderHook(() => useZoom());

    act(() => {
      result.current.setZoomLevel(1.5);
    });

    const rootStyle = document.documentElement.style.getPropertyValue('--app-zoom');
    expect(rootStyle).toBe('1.5');
  });

  it('debe navegar por todos los niveles de zoom', () => {
    const { result } = renderHook(() => useZoom());

    // Empezar desde el nivel más bajo
    act(() => {
      result.current.setZoomLevel(ZOOM_LEVELS[0]);
    });

    // Subir por todos los niveles
    ZOOM_LEVELS.slice(1).forEach((expectedLevel, index) => {
      act(() => {
        result.current.zoomIn();
      });
      expect(result.current.zoomLevel).toBe(expectedLevel);
    });

    // Bajar por todos los niveles
    ZOOM_LEVELS.slice(0, -1).reverse().forEach((expectedLevel, index) => {
      act(() => {
        result.current.zoomOut();
      });
      expect(result.current.zoomLevel).toBe(expectedLevel);
    });
  });
});
