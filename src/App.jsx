import Deck from './components/Deck';
import ControlPanel from './components/ControlPanel';
import RevealArea from './components/RevealArea';
import { useTheme } from './hooks/useTheme';
import { useZoom } from './hooks/useZoom';
import { useElectronAPI } from './hooks/useElectronAPI';
import { useCardsState } from './hooks/useCardsState';
import { useRevealState } from './hooks/useRevealState';
import { useDeckRefs } from './hooks/useDeckRefs';
import { useCardSelection } from './hooks/useCardSelection';
import { useCardAnimation } from './hooks/useCardAnimation';
import { useCardReset } from './hooks/useCardReset';
import { DECK_TITLES } from './constants/uiTexts';
import './App.css';

/**
 * Componente principal de la aplicación
 *
 * Maneja el estado de todas las cartas y la lógica de interacción mediante custom hooks
 * Arquitectura basada en hooks especializados siguiendo SRP (Single Responsibility Principle)
 *
 * Flujo de estados de cada carta:
 * 1. faceDown (inicial) → carta boca abajo
 * 2. selected → carta seleccionada pero aún boca abajo
 * 3. moving_to_end → carta moviéndose al final del mazo
 * 4. flipped → carta volteada mostrando contenido
 */
function App() {
  // Hook de tema (Context API)
  const { darkMode, toggleDarkMode } = useTheme();

  // Hook de zoom con persistencia
  const { zoomLevel, zoomIn, zoomOut, canZoomIn, canZoomOut } = useZoom();

  // Hook de Electron API
  const { isElectron, isFullscreen, toggleFullscreen, maximize, minimize } = useElectronAPI();

  // Hooks de estado del juego (divididos por responsabilidad)
  const { words, images, setWords, setImages, updateBothDecks } = useCardsState();
  const {
    revealedWordCard,
    revealedImageCard,
    revealKey,
    revealedPairs,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealKey,
    setRevealedPairs
  } = useRevealState();
  const { decksContainerRef, wordDeckRef, imageDeckRef } = useDeckRefs();
  const { handleCardSelect, selectedWordsCount, selectedImagesCount } = useCardSelection({
    words,
    images,
    updateBothDecks
  });

  // Hook de animación de revelación
  const { isRevealing, flipSelected } = useCardAnimation({
    words,
    images,
    updateBothDecks,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealKey,
    setRevealedPairs
  });

  // Hook de reseteo y mezclado
  const { isShuffling, resetCards } = useCardReset({
    updateBothDecks,
    setRevealedWordCard,
    setRevealedImageCard,
    setRevealedPairs
  });

  // Estado derivado: botón de revelar habilitado
  const canReveal = selectedWordsCount === 1 && selectedImagesCount === 1;

  return (
    <div className="app">
      <ControlPanel
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onReveal={flipSelected}
        onReset={resetCards}
        canReveal={canReveal}
        isRevealing={isRevealing}
        isShuffling={isShuffling}
        isElectron={isElectron}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onMaximize={maximize}
        onMinimize={minimize}
        zoomLevel={zoomLevel}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        canZoomIn={canZoomIn}
        canZoomOut={canZoomOut}
      />

      <div className="main-content">
        <RevealArea
          revealedWordCard={revealedWordCard}
          revealedImageCard={revealedImageCard}
          revealKey={revealKey}
          revealedPairs={revealedPairs}
        />

        <div className="decks-container" ref={decksContainerRef}>
          <Deck
            title={DECK_TITLES.WORDS}
            cards={words}
            onCardSelect={handleCardSelect}
            deckGridRef={wordDeckRef}
          />
          <Deck
            title={DECK_TITLES.IMAGES}
            cards={images}
            onCardSelect={handleCardSelect}
            deckGridRef={imageDeckRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
