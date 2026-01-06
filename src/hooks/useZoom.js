import { useCallback } from 'react';
import { usePersistedState } from './usePersistedState';
import { ZOOM_LEVELS, ZOOM_CONFIG, STORAGE_KEYS_ZOOM } from '../constants/zoomConfig';

/**
 * Hook para gestionar el nivel de zoom de la aplicación
 *
 * @returns {Object} { zoomLevel, zoomIn, zoomOut, canZoomIn, canZoomOut, setZoomLevel }
 */
export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = usePersistedState(
    STORAGE_KEYS_ZOOM.ZOOM_LEVEL,
    ZOOM_CONFIG.DEFAULT,
    (value) => {
      // Aplicar zoom al root cuando cambia
      document.documentElement.style.setProperty('--app-zoom', value);
    }
  );

  // Calcular índice actual
  const currentIndex = ZOOM_LEVELS.indexOf(zoomLevel);

  // Verificar límites
  const canZoomIn = currentIndex < ZOOM_LEVELS.length - 1;
  const canZoomOut = currentIndex > 0;

  /**
   * Aumentar zoom
   */
  const zoomIn = useCallback(() => {
    const currentIdx = ZOOM_LEVELS.indexOf(zoomLevel);
    if (currentIdx < ZOOM_LEVELS.length - 1) {
      setZoomLevel(ZOOM_LEVELS[currentIdx + 1]);
    }
  }, [zoomLevel]);

  /**
   * Reducir zoom
   */
  const zoomOut = useCallback(() => {
    const currentIdx = ZOOM_LEVELS.indexOf(zoomLevel);
    if (currentIdx > 0) {
      setZoomLevel(ZOOM_LEVELS[currentIdx - 1]);
    }
  }, [zoomLevel]);

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    canZoomIn,
    canZoomOut,
    setZoomLevel
  };
};
