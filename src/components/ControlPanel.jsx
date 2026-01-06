import { BUTTON_LABELS, TOOLTIPS, UI_MESSAGES } from '../constants/uiTexts';
import { useElectronAPI } from '../hooks/useElectronAPI';
import './ControlPanel.css';

/**
 * Componente ControlPanel - Panel de control con botones de acción
 * Refactorizado con custom hooks para mejor separación de concerns
 *
 * Props:
 * - selectedWords: número de palabras seleccionadas
 * - selectedImages: número de imágenes seleccionadas
 * - revealedPairs: número de parejas reveladas
 * - onFlipSelected: función para revelar cartas seleccionadas
 * - onReset: función para reiniciar todas las cartas
 * - darkMode: estado del modo oscuro
 * - onToggleDarkMode: función para cambiar modo oscuro
 * - zoomLevel: nivel de zoom actual
 * - onZoomIn: función para aumentar zoom
 * - onZoomOut: función para reducir zoom
 * - canZoomIn: boolean que indica si se puede aumentar el zoom
 * - canZoomOut: boolean que indica si se puede reducir el zoom
 * - isShuffling: boolean que indica si está en proceso de mezclar
 * - isRevealing: boolean que indica si está en proceso de revelar
 */
const ControlPanel = ({
  selectedWords,
  selectedImages,
  revealedPairs,
  onFlipSelected,
  onReset,
  darkMode,
  onToggleDarkMode,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  canZoomIn,
  canZoomOut,
  isShuffling,
  isRevealing,
  closeApp
}) => {
  // Hook de Electron API
  const {
    isFullscreen,
    toggleFullscreen,
    minimize
  } = useElectronAPI();

  return (
    <div className="control-panel">
      <div className="control-row">
        <div className="control-info">
          <div className="counter-group">
            <span className="counter-label">{UI_MESSAGES.REVEALED_PAIRS_LABEL}</span>
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
            title={selectedWords !== 1 || selectedImages !== 1 ? TOOLTIPS.REVEAL_DISABLED : TOOLTIPS.REVEAL_ENABLED}
          >
            {BUTTON_LABELS.REVEAL}
          </button>

          <button
            className="btn btn-secondary"
            onClick={onReset}
            disabled={isShuffling || isRevealing}
            title={isShuffling || isRevealing ? TOOLTIPS.RESET_DISABLED : TOOLTIPS.RESET_ENABLED}
          >
            {BUTTON_LABELS.RESET}
          </button>

          <button
            className="btn btn-theme"
            onClick={onToggleDarkMode}
            title={darkMode ? TOOLTIPS.LIGHT_MODE : TOOLTIPS.DARK_MODE}
          >
            {darkMode ? BUTTON_LABELS.LIGHT_MODE : BUTTON_LABELS.DARK_MODE}
          </button>

          <button
            className="btn btn-zoom"
            onClick={onZoomOut}
            disabled={!canZoomOut}
            title={canZoomOut ? TOOLTIPS.ZOOM_OUT : TOOLTIPS.ZOOM_OUT_DISABLED}
          >
            {BUTTON_LABELS.ZOOM_OUT}
          </button>

          <button
            className="btn btn-zoom"
            onClick={onZoomIn}
            disabled={!canZoomIn}
            title={canZoomIn ? TOOLTIPS.ZOOM_IN : TOOLTIPS.ZOOM_IN_DISABLED}
          >
            {BUTTON_LABELS.ZOOM_IN}
          </button>

          <button
            className="btn btn-fullscreen"
            onClick={toggleFullscreen}
            title={isFullscreen ? TOOLTIPS.EXIT_FULLSCREEN : TOOLTIPS.FULLSCREEN}
          >
            {isFullscreen ? BUTTON_LABELS.EXIT_FULLSCREEN : BUTTON_LABELS.FULLSCREEN}
          </button>

          <button
            className="btn btn-window"
            onClick={minimize}
            title={TOOLTIPS.MINIMIZE}
          >
            {BUTTON_LABELS.MINIMIZE}
          </button>

          <button
            className="btn btn-close"
            onClick={closeApp}
            title={TOOLTIPS.CLOSE_APP}
          >
            {BUTTON_LABELS.CLOSE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
