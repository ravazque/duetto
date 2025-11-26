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
  const [isShuffling, setIsShuffling] = useState(false); // Controla si está en proceso de mezclar
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
   * REGLA: Máximo 1 carta seleccionada por mazo a la vez
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
   * Voltea todas las cartas seleccionadas y las mueve al inicio
   * Secuencia: 1) Mover sliders al inicio, 2) Reordenar cartas, 3) Voltear cartas
   */
  const handleFlipSelected = () => {
    const prepareForFlip = (cards) => {
      // Paso 1: Marcar correctamente todas las cartas
      const updatedCards = cards.map((card) => {
        if (card.state === 'selected') {
          // Carta nueva para voltear
          return { ...card, state: 'ready-to-flip', previouslyFlipped: false };
        }
        if (card.state === 'flipped') {
          // Carta ya volteada - MANTENER estado flipped y marcar como previamente volteada
          return { ...card, state: 'flipped', previouslyFlipped: true };
        }
        // Cartas normales
        return { ...card, previouslyFlipped: card.previouslyFlipped || false };
      });

      // Paso 2: Separar en grupos para reordenar
      const readyToFlip = updatedCards.filter((card) => card.state === 'ready-to-flip');
      const previouslyFlipped = updatedCards.filter((card) => card.state === 'flipped' && card.previouslyFlipped);
      const notFlipped = updatedCards.filter((card) => card.state === 'faceDown');

      // Cartas para voltear al inicio, luego las que ya estaban volteadas, luego el resto
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

    // PASO 1: Mover los sliders al inicio
    setScrollReset(prev => prev + 1);

    // PASO 2: Reordenar las cartas (pero aún no voltearlas)
    setWords(prepareForFlip);
    setImages(prepareForFlip);

    // PASO 3: Esperar a que termine la animación de reordenamiento y luego voltear
    setTimeout(() => {
      const wordScroll = wordDeckRef.current?.scrollLeft || 0;
      const imageScroll = imageDeckRef.current?.scrollLeft || 0;

      // Verificar que los sliders estén al inicio antes de voltear
      if (wordScroll < 5 && imageScroll < 5) {
        // Cambiar estado a flipped para iniciar animación de volteo
        setWords(finalFlip);
        setImages(finalFlip);

        // Activar flag para voltear después de un pequeño delay
        setTimeout(() => {
          setCanFlipCards(true);
        }, 50);
      } else {
        // Si no están al inicio, seguir verificando
        const checkScrollComplete = () => {
          const wordScroll = wordDeckRef.current?.scrollLeft || 0;
          const imageScroll = imageDeckRef.current?.scrollLeft || 0;

          if (wordScroll < 5 && imageScroll < 5) {
            setWords(finalFlip);
            setImages(finalFlip);
            setTimeout(() => {
              setCanFlipCards(true);
            }, 50);
          } else {
            setTimeout(checkScrollComplete, 50);
          }
        };
        setTimeout(checkScrollComplete, 50);
      }
    }, 350); // Esperar a que termine la animación de scroll y reordenamiento
  };

  /**
   * Reinicia todas las cartas a su estado inicial y las mezcla
   */
  const handleReset = () => {
    // Bloquear selección durante el mezclado
    setIsShuffling(true);

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
        // Resetear estado completamente (eliminar previouslyFlipped y otros flags)
        const resetCards = cards.map((card) => ({
          id: card.id,
          type: card.type,
          content: card.content,
          imageData: card.imageData || null,
          state: 'faceDown'
        }));

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

      // Desbloquear selección después del mezclado
      setTimeout(() => {
        setIsShuffling(false);
      }, 100);
    }, 600);
  };

  /**
   * Actualiza las cartas desde el configurador
   */
  const handleUpdateCards = (newWords, newImages) => {
    // Marcar las cartas actuales que necesitan animación de reseteo
    const markResettingWithNewContent = (oldCards, newCards) => {
      return oldCards.map((oldCard, index) => {
        const newCard = newCards[index];
        // Si la carta vieja estaba volteada, marcarla como resetting pero con el contenido NUEVO
        if (oldCard.state === 'flipped' || oldCard.previouslyFlipped) {
          return {
            ...newCard, // Usar el contenido nuevo
            state: 'resetting',
            previouslyFlipped: false
          };
        }
        // Si estaba seleccionada, deseleccionar con contenido nuevo
        if (oldCard.state === 'selected') {
          return { ...newCard, state: 'faceDown' };
        }
        // Cartas normales: usar contenido nuevo directamente
        return { ...newCard, state: 'faceDown' };
      });
    };

    // Verificar si hay cartas volteadas (incluyendo las previouslyFlipped)
    const hasFlippedCards = words.some(card => card.state === 'flipped' || card.previouslyFlipped) ||
                           images.some(card => card.state === 'flipped' || card.previouslyFlipped);

    if (hasFlippedCards) {
      // Marcar cartas para resetear CON el contenido nuevo
      setWords(prev => markResettingWithNewContent(prev, newWords));
      setImages(prev => markResettingWithNewContent(prev, newImages));

      // Después de la animación, asegurarse de que todas estén boca abajo
      setTimeout(() => {
        const updatedWords = newWords.map(card => ({
          id: card.id,
          type: card.type,
          content: card.content,
          imageData: card.imageData || null,
          state: 'faceDown'
        }));
        const updatedImages = newImages.map(card => ({
          id: card.id,
          type: card.type,
          content: card.content,
          imageData: card.imageData || null,
          state: 'faceDown'
        }));

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
      const updatedWords = newWords.map(card => ({
        id: card.id,
        type: card.type,
        content: card.content,
        imageData: card.imageData || null,
        state: 'faceDown'
      }));
      const updatedImages = newImages.map(card => ({
        id: card.id,
        type: card.type,
        content: card.content,
        imageData: card.imageData || null,
        state: 'faceDown'
      }));

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
          <br />
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
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
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
