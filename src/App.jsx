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
      // Limpiar datos de prueba al iniciar (solo para reseteo inicial)
      // localStorage.clear(); // Descomenta esta línea si quieres resetear todo

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
  const [darkMode, setDarkMode] = useState(() => {
    // Cargar preferencia de modo oscuro desde localStorage
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [canFlipCards, setCanFlipCards] = useState(false); // Controla cuándo se pueden voltear las cartas
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
        content: card.content,
        imageData: card.imageData || null
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
    const prepareForFlip = (cards) => {
      // Marcar las cartas seleccionadas como "ready-to-flip" y marcar las previamente volteadas
      const updatedCards = cards.map((card) => {
        if (card.state === 'selected') {
          return { ...card, state: 'ready-to-flip', previouslyFlipped: false };
        }
        // Marcar las que ya estaban volteadas como previamente volteadas
        if (card.state === 'flipped') {
          return { ...card, previouslyFlipped: true };
        }
        return card;
      });

      // Separar por estado: listas para voltear, ya volteadas previamente, y no volteadas
      const readyToFlip = updatedCards.filter((card) => {
        const originalCard = cards.find(c => c.id === card.id);
        return card.state === 'ready-to-flip' && originalCard.state === 'selected';
      });

      const previouslyFlipped = updatedCards.filter((card) => {
        const originalCard = cards.find(c => c.id === card.id);
        return card.state === 'flipped' && originalCard.state === 'flipped';
      });

      const notFlipped = updatedCards.filter((card) => card.state !== 'ready-to-flip' && card.state !== 'flipped');

      // Listas para voltear al inicio, luego las que ya estaban volteadas, luego el resto
      return [...readyToFlip, ...previouslyFlipped, ...notFlipped];
    };

    const finalFlip = (cards) => {
      return cards.map((card) => {
        if (card.state === 'ready-to-flip') {
          return { ...card, state: 'flipped' };
        }
        return card;
      });
    };

    // Resetear el flag de flip
    setCanFlipCards(false);

    // Primero disparar el scroll reset de los sliders
    setScrollReset(prev => prev + 1);

    // Centrar la vista inmediatamente
    setTimeout(() => {
      if (decksContainerRef.current) {
        decksContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 10);

    // Reordenar las cartas (pero aún no voltearlas)
    setTimeout(() => {
      setWords(prepareForFlip);
      setImages(prepareForFlip);

      // Verificar que los sliders estén al inicio antes de voltear
      const checkScrollComplete = () => {
        const wordScroll = wordDeckRef.current?.scrollLeft || 0;
        const imageScroll = imageDeckRef.current?.scrollLeft || 0;

        // Si ambos sliders están al inicio (o muy cerca), iniciar animación
        if (wordScroll < 5 && imageScroll < 5) {
          // Cambiar estado a flipped para iniciar animación
          setWords(finalFlip);
          setImages(finalFlip);

          // Activar flag para voltear
          setCanFlipCards(true);
        } else {
          // Seguir verificando cada 50ms
          setTimeout(checkScrollComplete, 50);
        }
      };

      // Empezar a verificar después de 100ms (dar tiempo a que empiece el scroll)
      setTimeout(checkScrollComplete, 100);
    }, 10);
  };

  /**
   * Reinicia todas las cartas a su estado inicial y las mezcla
   */
  const handleReset = () => {
    // Primero marcar las cartas volteadas para animación y deseleccionar las seleccionadas
    const markResetting = (cards) => {
      return cards.map((card) => {
        if (card.state === 'flipped') {
          return { ...card, state: 'resetting' };
        }
        // Deseleccionar cartas seleccionadas
        if (card.state === 'selected') {
          return { ...card, state: 'faceDown' };
        }
        return card;
      });
    };

    setWords(markResetting);
    setImages(markResetting);

    // Después de la animación, resetear y mezclar
    setTimeout(() => {
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
    }, 600);
  };

  /**
   * Actualiza las cartas desde el configurador
   */
  const handleUpdateCards = (newWords, newImages) => {
    // Marcar las cartas que estaban volteadas para animación
    const hasFlippedWords = words.some(card => card.state === 'flipped');
    const hasFlippedImages = images.some(card => card.state === 'flipped');

    if (hasFlippedWords || hasFlippedImages) {
      // Primero voltear las cartas que estaban boca arriba
      const markResettingWords = (cards, newCards) => {
        return cards.map((card, index) => {
          if (card.state === 'flipped' && newCards[index]) {
            return { ...newCards[index], state: 'resetting' };
          }
          return newCards[index] || card;
        });
      };

      setWords(prev => markResettingWords(prev, newWords.map(card => ({ ...card, state: 'faceDown' }))));
      setImages(prev => markResettingWords(prev, newImages.map(card => ({ ...card, state: 'faceDown' }))));

      // Después de la animación, actualizar completamente
      setTimeout(() => {
        const updatedWords = newWords.map(card => ({ ...card, state: 'faceDown' }));
        const updatedImages = newImages.map(card => ({ ...card, state: 'faceDown' }));

        setWords(updatedWords);
        setImages(updatedImages);

        // Guardar inmediatamente la configuración actualizada
        try {
          localStorage.setItem('wordCards', JSON.stringify(updatedWords.map(c => ({ id: c.id, type: c.type, content: c.content }))));
          localStorage.setItem('imageCards', JSON.stringify(updatedImages.map(c => ({ id: c.id, type: c.type, content: c.content, imageData: c.imageData || null }))));
        } catch (error) {
          console.error('Error guardando configuración:', error);
        }
      }, 600);
    } else {
      // Si no hay cartas volteadas, actualizar directamente
      const updatedWords = newWords.map(card => ({ ...card, state: 'faceDown' }));
      const updatedImages = newImages.map(card => ({ ...card, state: 'faceDown' }));

      setWords(updatedWords);
      setImages(updatedImages);

      // Guardar inmediatamente la configuración actualizada
      try {
        localStorage.setItem('wordCards', JSON.stringify(updatedWords.map(c => ({ id: c.id, type: c.type, content: c.content }))));
        localStorage.setItem('imageCards', JSON.stringify(updatedImages.map(c => ({ id: c.id, type: c.type, content: c.content, imageData: c.imageData || null }))));
      } catch (error) {
        console.error('Error guardando configuración:', error);
      }
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
        <div className="header-content">
          <h1>🎴 Duetto 🎴</h1>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
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
          deckGridRef={wordDeckRef}
          canFlipCards={canFlipCards}
        />

        <Deck
          title="🖼️ Mazo de Imágenes"
          cards={images}
          onCardSelect={handleCardSelect}
          resetScroll={scrollReset}
          deckGridRef={imageDeckRef}
          canFlipCards={canFlipCards}
        />
      </div>
    </div>
  );
}

export default App;
