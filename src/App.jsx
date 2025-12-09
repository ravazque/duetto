import { useState, useRef, useEffect } from 'react';
import Deck from './components/Deck';
import ControlPanel from './components/ControlPanel';
import RevealArea from './components/RevealArea';
import { wordCards, imageCards } from './data/cardsData';
import './App.css';

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
    localStorage.removeItem('wordCards');
    localStorage.removeItem('imageCards');

    return {
      words: wordCards.map(card => ({ ...card, state: 'faceDown' })),
      images: imageCards.map(card => ({ ...card, state: 'faceDown' }))
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
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [isShuffling, setIsShuffling] = useState(false); // Controla si está en proceso de mezclar
  const [isRevealing, setIsRevealing] = useState(false); // Controla si está en proceso de revelar
  const decksContainerRef = useRef(null); // Ref para el contenedor de mazos
  const wordDeckRef = useRef(null); // Ref para el slider del mazo de palabras
  const imageDeckRef = useRef(null); // Ref para el slider del mazo de imágenes

  // Guardar preferencia de modo oscuro
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
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

    // Función auxiliar para actualizar el estado de una carta específica
    const updateCardState = (cards) => {
      // Verificar si la carta clickeada pertenece a este mazo
      const clickedCard = cards.find(c => c.id === cardId);

      if (!clickedCard) {
        return cards; // No pertenece a este mazo
      }

      // No permitir seleccionar cartas volteadas
      if (clickedCard.state === 'flipped') {
        return cards;
      }

      // Si la carta clickeada está siendo deseleccionada
      if (clickedCard.state === 'selected') {
        return cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, state: 'faceDown' };
          }
          return card;
        });
      }

      // Si la carta clickeada está faceDown, deseleccionar todas las demás
      // y seleccionar solo esta
      return cards.map((card) => {
        if (card.id === cardId && card.state === 'faceDown') {
          return { ...card, state: 'selected' };
        } else if (card.state === 'selected') {
          // Deseleccionar cualquier otra carta seleccionada
          return { ...card, state: 'faceDown' };
        }
        return card;
      });
    };

    // Actualizar ambos mazos
    setWords(updateCardState);
    setImages(updateCardState);
  };

  /**
   * Revela las cartas seleccionadas moviéndolas al área de revelación
   * Las cartas se voltean en el mazo y se mueven al final (derecha)
   */
  const handleFlipSelected = () => {
    // Bloquear el botón de mezclar mientras se revelan las cartas
    setIsRevealing(true);

    // Encontrar las cartas seleccionadas
    const selectedWord = words.find(card => card.state === 'selected');
    const selectedImage = images.find(card => card.state === 'selected');

    // PASO 1: Primero mover las cartas al final (sin voltear aún) para que se vea el movimiento
    const moveToEnd = (cards) => {
      // Marcar cartas seleccionadas como "moving-to-end" (aún no volteadas)
      const updatedCards = cards.map(card =>
        card.state === 'selected' ? { ...card, state: 'moving-to-end' } : card
      );

      // Separar en grupos: no seleccionadas y seleccionadas
      const notMoving = updatedCards.filter(card => card.state !== 'moving-to-end');
      const moving = updatedCards.filter(card => card.state === 'moving-to-end');

      // Mover las seleccionadas al final
      return [...notMoving, ...moving];
    };

    setWords(moveToEnd);
    setImages(moveToEnd);

    // PASO 2: Después de un pequeño delay, voltear las cartas y actualizar el área de revelación
    setTimeout(() => {
      // Voltear las cartas que están en moving-to-end
      const flipCards = (cards) => {
        return cards.map(card =>
          card.state === 'moving-to-end' ? { ...card, state: 'flipped' } : card
        );
      };

      setWords(flipCards);
      setImages(flipCards);

      // Mover las cartas al área de revelación
      if (selectedWord) {
        setRevealedWordCard(selectedWord);
      }
      if (selectedImage) {
        setRevealedImageCard(selectedImage);
      }

      // Incrementar contador de parejas reveladas
      setRevealedPairs(prev => prev + 1);

      // Incrementar key para forzar re-animación
      setRevealKey(prev => prev + 1);

      // PASO 3: Desbloquear el botón de mezclar después de que termine la animación de revelación
      // La animación de revelación dura 600ms (ver RevealArea.css)
      setTimeout(() => {
        setIsRevealing(false);
      }, 700); // 700ms para asegurar que la animación haya terminado
    }, 400); // Delay para que se vea el movimiento al final
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
    const flipToFaceDown = (cards) => {
      return cards.map((card) => ({
        ...card,
        state: 'faceDown'
      }));
    };

    setWords(flipToFaceDown);
    setImages(flipToFaceDown);

    // PASO 2: Esperar a que termine la animación de volteo (600ms) y luego mezclar
    setTimeout(() => {
      const shuffleCards = (cards) => {
        // Mezclar usando algoritmo Fisher-Yates
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
      };

      setWords(shuffleCards);
      setImages(shuffleCards);

      // PASO 3: Desbloquear selección después del mezclado
      setTimeout(() => {
        setIsShuffling(false);
      }, 100);
    }, 650); // Esperar 650ms para que termine la animación de volteo (600ms de transición)
  };

  // Las cartas son fijas, no se permite edición desde la interfaz
  // handleUpdateCards eliminado ya que no se necesita

  // Calcular cartas seleccionadas por mazo
  const selectedWords = words.filter((card) => card.state === 'selected').length;
  const selectedImages = images.filter((card) => card.state === 'selected').length;
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
