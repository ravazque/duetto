import { useState, useRef, useEffect } from 'react';
import Deck from './components/Deck';
import ControlPanel from './components/ControlPanel';
import DeckConfig from './components/DeckConfig';
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
  // Cargar configuración guardada del localStorage o usar valores por defecto
  const loadSavedCards = () => {
    try {
      const savedWords = localStorage.getItem('wordCards');
      const savedImages = localStorage.getItem('imageCards');
      return {
        words: savedWords ? JSON.parse(savedWords).map(card => ({ ...card, state: 'faceDown' })) : wordCards,
        images: savedImages ? JSON.parse(savedImages).map(card => ({ ...card, state: 'faceDown' })) : imageCards
      };
    } catch (error) {
      console.error('Error cargando configuración:', error);
      return { words: wordCards, images: imageCards };
    }
  };

  // Estado para todas las cartas (palabras e imágenes)
  const [words, setWords] = useState(() => loadSavedCards().words);
  const [images, setImages] = useState(() => loadSavedCards().images);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [scrollReset, setScrollReset] = useState(0); // Trigger para resetear scroll
  const decksContainerRef = useRef(null); // Ref para el contenedor de mazos

  // Guardar configuración de cartas cuando se actualicen (solo contenido, no estados)
  useEffect(() => {
    try {
      // Guardar solo el contenido de las cartas, no sus estados
      const wordsToSave = words.map(card => ({
        id: card.id,
        type: card.type,
        content: card.content
      }));
      const imagesToSave = images.map(card => ({
        id: card.id,
        type: card.type,
        content: card.content
      }));

      localStorage.setItem('wordCards', JSON.stringify(wordsToSave));
      localStorage.setItem('imageCards', JSON.stringify(imagesToSave));
    } catch (error) {
      console.error('Error guardando configuración:', error);
    }
  }, [words.length, images.length]); // Solo guardar cuando cambie la cantidad de cartas

  /**
   * Maneja la selección/deselección de una carta
   * @param {string} cardId - ID de la carta clickeada
   */
  const handleCardSelect = (cardId) => {
    // Función auxiliar para actualizar el estado de una carta específica
    const updateCardState = (cards) => {
      return cards.map((card) => {
        if (card.id === cardId) {
          // Toggle entre faceDown y selected
          if (card.state === 'faceDown') {
            return { ...card, state: 'selected' };
          } else if (card.state === 'selected') {
            return { ...card, state: 'faceDown' };
          }
        }
        return card;
      });
    };

    // Actualizar el mazo correspondiente
    setWords(updateCardState);
    setImages(updateCardState);
  };

  /**
   * Voltea todas las cartas seleccionadas y las mueve al inicio
   */
  const handleFlipSelected = () => {
    const flipAndReorder = (cards) => {
      // Voltear las cartas seleccionadas y marcar las previamente volteadas
      const updatedCards = cards.map((card) => {
        if (card.state === 'selected') {
          return { ...card, state: 'flipped', previouslyFlipped: false };
        }
        // Marcar las que ya estaban volteadas como previamente volteadas
        if (card.state === 'flipped') {
          return { ...card, previouslyFlipped: true };
        }
        return card;
      });

      // Separar por estado: recién volteadas, ya volteadas previamente, y no volteadas
      const justFlipped = updatedCards.filter((card) => {
        const originalCard = cards.find(c => c.id === card.id);
        return card.state === 'flipped' && originalCard.state === 'selected';
      });

      const previouslyFlipped = updatedCards.filter((card) => {
        const originalCard = cards.find(c => c.id === card.id);
        return card.state === 'flipped' && originalCard.state === 'flipped';
      });

      const notFlipped = updatedCards.filter((card) => card.state !== 'flipped');

      // Nuevas volteadas al inicio, luego las que ya estaban volteadas, luego el resto
      return [...justFlipped, ...previouslyFlipped, ...notFlipped];
    };

    setWords(flipAndReorder);
    setImages(flipAndReorder);

    // Trigger scroll reset
    setScrollReset(prev => prev + 1);

    // Centrar la vista en el contenedor de mazos
    setTimeout(() => {
      if (decksContainerRef.current) {
        decksContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  /**
   * Reinicia todas las cartas a su estado inicial y las mezcla
   */
  const handleReset = () => {
    const resetAndShuffle = (cards) => {
      // Resetear estado
      const resetCards = cards.map((card) => ({ ...card, state: 'faceDown' }));

      // Mezclar usando algoritmo Fisher-Yates
      const shuffled = [...resetCards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      return shuffled;
    };

    setWords(resetAndShuffle);
    setImages(resetAndShuffle);
  };

  /**
   * Actualiza las cartas desde el configurador
   */
  const handleUpdateCards = (newWords, newImages) => {
    const updatedWords = newWords.map(card => ({ ...card, state: 'faceDown' }));
    const updatedImages = newImages.map(card => ({ ...card, state: 'faceDown' }));

    setWords(updatedWords);
    setImages(updatedImages);

    // Guardar inmediatamente la configuración actualizada
    try {
      localStorage.setItem('wordCards', JSON.stringify(updatedWords.map(c => ({ id: c.id, type: c.type, content: c.content }))));
      localStorage.setItem('imageCards', JSON.stringify(updatedImages.map(c => ({ id: c.id, type: c.type, content: c.content }))));
    } catch (error) {
      console.error('Error guardando configuración:', error);
    }
  };

  // Calcular cartas seleccionadas por mazo
  const selectedWords = words.filter((card) => card.state === 'selected').length;
  const selectedImages = images.filter((card) => card.state === 'selected').length;
  const selectedCount = selectedWords + selectedImages;

  // Calcular cartas volteadas por mazo
  const flippedWords = words.filter((card) => card.state === 'flipped').length;
  const flippedImages = images.filter((card) => card.state === 'flipped').length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎴 Duetto 🎴</h1>
        <p className="app-subtitle">
          Selecciona cartas de palabras e imágenes, revélalas y descubre su significado.
          <br />
          Usa el scroll horizontal para ver todas las cartas de cada mazo.
        </p>
      </header>

      <ControlPanel
        selectedWords={selectedWords}
        selectedImages={selectedImages}
        selectedCount={selectedCount}
        flippedWords={flippedWords}
        flippedImages={flippedImages}
        onFlipSelected={handleFlipSelected}
        onReset={handleReset}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      <DeckConfig
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        wordCards={words}
        imageCards={images}
        onUpdateCards={handleUpdateCards}
      />

      <div className="decks-container" ref={decksContainerRef}>
        <Deck
          title="📝 Mazo de Palabras"
          cards={words}
          onCardSelect={handleCardSelect}
          resetScroll={scrollReset}
        />

        <Deck
          title="🖼️ Mazo de Imágenes"
          cards={images}
          onCardSelect={handleCardSelect}
          resetScroll={scrollReset}
        />
      </div>
    </div>
  );
}

export default App;
