import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useElectronAPI } from '../useElectronAPI';

describe('useElectronAPI', () => {
  beforeEach(() => {
    // Resetear window.electronAPI
    window.electronAPI = {
      toggleFullscreen: vi.fn(),
      onFullscreenChange: vi.fn(),
      maximize: vi.fn(),
      minimize: vi.fn(),
      closeApp: vi.fn()
    };
  });

  it('debe detectar que estamos en Electron', () => {
    const { result } = renderHook(() => useElectronAPI());

    expect(result.current.isElectron).toBe(true);
  });

  it('debe detectar que NO estamos en Electron si window.electronAPI no existe', () => {
    delete window.electronAPI;

    const { result } = renderHook(() => useElectronAPI());

    expect(result.current.isElectron).toBe(false);
  });

  it('debe llamar a toggleFullscreen correctamente', () => {
    const { result } = renderHook(() => useElectronAPI());

    act(() => {
      result.current.toggleFullscreen();
    });

    expect(window.electronAPI.toggleFullscreen).toHaveBeenCalledOnce();
  });

  it('debe llamar a maximize correctamente', () => {
    const { result } = renderHook(() => useElectronAPI());

    act(() => {
      result.current.maximize();
    });

    expect(window.electronAPI.maximize).toHaveBeenCalledOnce();
  });

  it('debe llamar a minimize correctamente', () => {
    const { result } = renderHook(() => useElectronAPI());

    act(() => {
      result.current.minimize();
    });

    expect(window.electronAPI.minimize).toHaveBeenCalledOnce();
  });

  it('debe llamar a closeApp correctamente', () => {
    const { result } = renderHook(() => useElectronAPI());

    act(() => {
      result.current.closeApp();
    });

    expect(window.electronAPI.closeApp).toHaveBeenCalledOnce();
  });

  it('no debe fallar si window.electronAPI no existe', () => {
    delete window.electronAPI;

    const { result } = renderHook(() => useElectronAPI());

    // No debería lanzar error
    expect(() => {
      act(() => {
        result.current.toggleFullscreen();
        result.current.maximize();
        result.current.minimize();
        result.current.closeApp();
      });
    }).not.toThrow();
  });

  it('debe actualizar isFullscreen cuando recibe evento', () => {
    let fullscreenCallback;
    window.electronAPI.onFullscreenChange = vi.fn((cb) => {
      fullscreenCallback = cb;
    });

    const { result } = renderHook(() => useElectronAPI());

    expect(result.current.isFullscreen).toBe(false);

    // Simular evento de fullscreen
    act(() => {
      fullscreenCallback(true);
    });

    expect(result.current.isFullscreen).toBe(true);

    act(() => {
      fullscreenCallback(false);
    });

    expect(result.current.isFullscreen).toBe(false);
  });

  it('debe registrar el listener de fullscreen una sola vez', () => {
    const { rerender } = renderHook(() => useElectronAPI());

    expect(window.electronAPI.onFullscreenChange).toHaveBeenCalledOnce();

    // Re-renderizar no debería registrar el listener de nuevo
    rerender();

    expect(window.electronAPI.onFullscreenChange).toHaveBeenCalledOnce();
  });
});
