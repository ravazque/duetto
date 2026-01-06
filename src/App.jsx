import { useState, useRef, useEffect } from 'react';
import Deck from './components/Deck';
import ControlPanel from './components/ControlPanel';
import RevealArea from './components/RevealArea';
import { wordCards, imageCards } from './data/cardsData';
import './App.css';

// Constantes
import {
  MOVE_TO_END_DURATION,
  REVEAL_COMPLETE_DELAY,
  FLIP_TO_FACEDOWN_DELAY,
  SHUFFLE_UNLOCK_DELAY
} from './constants/animations';
import { CARD_STATES, STORAGE_KEYS } from './constants/gameConfig';

// Utilidades
import {
  initializeCards,
  flipAllToFaceDown,
  toggleCardSelection,
  updateCardsByPredicate,
  moveCardsToEnd
} from './utils/cardTransformers';
import { getSelectedCard, getSelectedCount } from './utils/cardSelectors';
import { shuffleCards } from './utils/array';

/**
 * Componente principal de la aplicación
 *
 * Maneja el estado de todas las cartas y la lógica de interacción
 *
 * Flujo de estados de cada carta:
 * 1. faceDown (inicial) → carta boca abajo
 * 2. selected → carta seleccionada pero aún boca abajo
 * 3. flipped → carta volteada mostrando contenido
 */
function App() {
  // Las cartas son fijas desde cardsData.js, no se cargan desde localStorage
  const loadSavedCards = () => {
    // Limpiar localStorage de cartas antiguas (solo se ejecuta una vez)
    localStorage.removeItem(STORAGE_KEYS.WORD_CARDS);
    localStorage.removeItem(STORAGE_KEYS.IMAGE_CARDS);

    return {
      words: initializeCards(wordCards),
      images: initializeCards(imageCards)
    };
  };

  // Estado para todas las cartas (palabras e imágenes)
  const [words, setWords] = useState(() => loadSavedCards().words);
  const [images, setImages] = useState(() => loadSavedCards().images);
  const [revealedWordCard, setRevealedWordCard] = useState(null); // Carta de palabra revelada
  const [revealedImageCard, setRevealedImageCard] = useState(null); // Carta de imagen revelada
  const [revealKey, setRevealKey] = useState(0); // Key para forzar re-animación
  const [revealedPairs, setRevealedPairs] = useState(0); // Contador de parejas reveladas
  const [darkMode, setDarkMode] = useState(() => {
    // Cargar preferencia de modo oscuro desde localStorage
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  });
  const [isShuffling, setIsShuffling] = useState(false); // Controla si está en proceso de mezclar
  const [isRevealing, setIsRevealing] = useState(false); // Controla si está en proceso de revelar
  const decksContainerRef = useRef(null); // Ref para el contenedor de mazos
  const wordDeckRef = useRef(null); // Ref para el slider del mazo de palabras
  const imageDeckRef = useRef(null); // Ref para el slider del mazo de imágenes

  // Guardar preferencia de modo oscuro
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
    // Aplicar clase al body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Las cartas son fijas, no se necesita guardar configuración
  // Este efecto se mantiene deshabilitado ya que las palabras e imágenes no son editables
  // useEffect(() => {
  //   // Configuración deshabilitada - las cartas son fijas
  // }, []);

  /**
   * Maneja la selección/deselección de una carta
   * REGLA: Máximo 1 carta seleccionada por mazo a la vez
   * No se pueden seleccionar cartas ya volteadas (flipped)
   * @param {string} cardId - ID de la carta clickeada
   */
  const handleCardSelect = (cardId) => {
    // No permitir seleccionar cartas mientras se está mezclando
    if (isShuffling) {
      return;
    }

    // Actualizar ambos mazos usando la utilidad toggleCardSelection
    setWords(cards => toggleCardSelection(cards, cardId) || cards);
    setImages(cards => toggleCardSelection(cards, cardId) || cards);
  };

  /**
   * Revela las cartas seleccionadas moviéndolas al área de revelación
   * Las cartas se voltean en el mazo y se mueven al final (derecha)
   */
  const handleFlipSelected = () => {
    // Bloquear el botón de mezclar mientras se revelan las cartas
    setIsRevealing(true);

    // Encontrar las cartas seleccionadas
    const selectedWord = getSelectedCard(words);
    const selectedImage = getSelectedCard(images);

    // PASO 1: Marcar cartas como "moving-to-end" y moverlas al final
    const markAndMove = (cards) => {
      const marked = updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.SELECTED,
        CARD_STATES.MOVING_TO_END
      );
      return moveCardsToEnd(marked, CARD_STATES.MOVING_TO_END);
    };

    setWords(markAndMove);
    setImages(markAndMove);

    // PASO 2: Después del movimiento, voltear las cartas y actualizar área de revelación
    setTimeout(() => {
      // Voltear las cartas que están en moving-to-end
      setWords(cards => updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.MOVING_TO_END,
        CARD_STATES.FLIPPED
      ));
      setImages(cards => updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.MOVING_TO_END,
        CARD_STATES.FLIPPED
      ));

      // Mover las cartas al área de revelación
      if (selectedWord) setRevealedWordCard(selectedWord);
      if (selectedImage) setRevealedImageCard(selectedImage);

      // Incrementar contador de parejas reveladas
      setRevealedPairs(prev => prev + 1);

      // Incrementar key para forzar re-animación
      setRevealKey(prev => prev + 1);

      // PASO 3: Desbloquear UI después de que termine la animación de revelación
      setTimeout(() => {
        setIsRevealing(false);
      }, REVEAL_COMPLETE_DELAY);
    }, MOVE_TO_END_DURATION);
  };

  /**
   * Reinicia todas las cartas a su estado inicial y las mezcla
   */
  const handleReset = () => {
    // Bloquear selección durante el mezclado
    setIsShuffling(true);

    // Limpiar cartas reveladas y resetear contador
    setRevealedWordCard(null);
    setRevealedImageCard(null);
    setRevealedPairs(0);

    // PASO 1: Voltear todas las cartas a faceDown (con animación)
    setWords(flipAllToFaceDown);
    setImages(flipAllToFaceDown);

    // PASO 2: Esperar a que termine la animación de volteo y luego mezclar
    setTimeout(() => {
      setWords(shuffleCards);
      setImages(shuffleCards);

      // PASO 3: Desbloquear selección después del mezclado
      setTimeout(() => {
        setIsShuffling(false);
      }, SHUFFLE_UNLOCK_DELAY);
    }, FLIP_TO_FACEDOWN_DELAY);
  };

  // Las cartas son fijas, no se permite edición desde la interfaz
  // handleUpdateCards eliminado ya que no se necesita

  // Calcular cartas seleccionadas por mazo
  const selectedWords = getSelectedCount(words);
  const selectedImages = getSelectedCount(images);
  const selectedCount = selectedWords + selectedImages;

  return (
    <div className="app">
      <header className="app-header">
          <br />
      </header>

      <ControlPanel
        selectedWords={selectedWords}
        selectedImages={selectedImages}
        selectedCount={selectedCount}
        revealedPairs={revealedPairs}
        onFlipSelected={handleFlipSelected}
        onReset={handleReset}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isShuffling={isShuffling}
        isRevealing={isRevealing}
      />

      <div className="main-content">
        <RevealArea
          wordCard={revealedWordCard}
          imageCard={revealedImageCard}
          animationKey={revealKey}
        />

        <div className="decks-container" ref={decksContainerRef}>
          <Deck
            title="📝 Mazo de Palabras"
            cards={words}
            onCardSelect={handleCardSelect}
            deckGridRef={wordDeckRef}
          />

          <Deck
            title="🖼️ Mazo de Imágenes"
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
