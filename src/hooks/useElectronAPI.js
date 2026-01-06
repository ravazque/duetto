import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para abstraer la interacción con Electron API
 * Proporciona una interfaz segura y desacoplada para las funcionalidades de Electron
 *
 * @returns {Object} API de Electron con funciones wrapper
 */
export const useElectronAPI = () => {
  const isElectron = typeof window !== 'undefined' && window.electronAPI !== undefined;
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Toggle fullscreen
   */
  const toggleFullscreen = useCallback(() => {
    if (isElectron) {
      window.electronAPI.toggleFullscreen();
    }
  }, [isElectron]);

  /**
   * Maximizar ventana
   */
  const maximize = useCallback(() => {
    if (isElectron) {
      window.electronAPI.maximize();
    }
  }, [isElectron]);

  /**
   * Minimizar ventana
   */
  const minimize = useCallback(() => {
    if (isElectron) {
      window.electronAPI.minimize();
    }
  }, [isElectron]);

  /**
   * Cerrar aplicación
   */
  const closeApp = useCallback(() => {
    if (isElectron) {
      window.electronAPI.closeApp();
    }
  }, [isElectron]);

  /**
   * Escuchar cambios de fullscreen
   */
  useEffect(() => {
    if (isElectron && window.electronAPI.onFullscreenChange) {
      window.electronAPI.onFullscreenChange((fullscreen) => {
        setIsFullscreen(fullscreen);
      });
    }
  }, [isElectron]);

  return {
    isElectron,
    isFullscreen,
    toggleFullscreen,
    maximize,
    minimize,
    closeApp
  };
};
