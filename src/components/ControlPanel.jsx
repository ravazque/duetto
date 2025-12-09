import { useState, useEffect } from 'react';
import './ControlPanel.css';

/**
 * Componente ControlPanel - Panel de control con botones de acción
 *
 * Props:
 * - selectedWords: número de palabras seleccionadas
 * - selectedImages: número de imágenes seleccionadas
 * - selectedCount: total de cartas seleccionadas
 * - revealedPairs: número de parejas reveladas
 * - onFlipSelected: función para revelar cartas seleccionadas
 * - onReset: función para reiniciar todas las cartas
 * - darkMode: estado del modo oscuro
 * - onToggleDarkMode: función para cambiar modo oscuro
 * - isShuffling: boolean que indica si está en proceso de mezclar
 * - isRevealing: boolean que indica si está en proceso de revelar
 */
const ControlPanel = ({ selectedWords, selectedImages, selectedCount, revealedPairs, onFlipSelected, onReset, darkMode, onToggleDarkMode, isShuffling, isRevealing }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Escuchar cambios de pantalla completa desde Electron
    if (window.electronAPI) {
      window.electronAPI.onFullscreenChange((fullscreen) => {
        setIsFullscreen(fullscreen);
      });
    }
  }, []);

  const handleToggleFullscreen = () => {
    if (window.electronAPI) {
      window.electronAPI.toggleFullscreen();
    }
  };

  const handleCloseApp = () => {
    if (window.electronAPI) {
      window.electronAPI.closeApp();
    }
  };
  return (
    <div className="control-panel">
      <div className="control-row">
        <div className="control-info">
          <div className="counter-group">
            <span className="counter-label">Parejas Reveladas:</span>
            <span className="revealed-pairs-count">
              {revealedPairs}
            </span>
          </div>
        </div>

        <div className="control-buttons">
          <button
            className="btn btn-primary"
            onClick={onFlipSelected}
            disabled={selectedWords !== 1 || selectedImages !== 1}
            title={selectedWords !== 1 || selectedImages !== 1 ? "Debes seleccionar 1 carta de cada mazo" : "Revelar cartas"}
          >
            ✨ Revelar Cartas
          </button>

          <button
            className="btn btn-secondary"
            onClick={onReset}
            disabled={isShuffling || isRevealing}
            title={isShuffling || isRevealing ? "Espera a que termine la animación" : "Reiniciar y mezclar cartas"}
          >
            🔄 Reiniciar / Mezclar
          </button>

          <button
            className="btn btn-theme"
            onClick={onToggleDarkMode}
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            className="btn btn-fullscreen"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? '🗗' : '⛶'}
          </button>

          <button
            className="btn btn-close"
            onClick={handleCloseApp}
            title="Cerrar aplicación"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
