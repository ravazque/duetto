import { useRef, useEffect } from 'react';
import Card from './Card';
import './Deck.css';

/**
 * Componente Deck - Muestra un mazo de cartas
 *
 * Props:
 * - title: título del mazo (ej. "Mazo de Palabras")
 * - cards: array de cartas
 * - onCardSelect: función para manejar selección
 * - deckGridRef: ref externa para el scroll del deck
 */
const Deck = ({ title, cards, onCardSelect, deckGridRef }) => {
  const localDeckGridRef = useRef(null);
  const gridRef = deckGridRef || localDeckGridRef;

  // Añadir scroll horizontal con la rueda del ratón
  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const handleWheel = (e) => {
      // Prevenir scroll vertical si hay scroll horizontal disponible
      if (gridElement.scrollWidth > gridElement.clientWidth) {
        e.preventDefault();
        // Desplazar horizontalmente con la rueda del ratón
        gridElement.scrollLeft += e.deltaY;
      }
    };

    gridElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      gridElement.removeEventListener('wheel', handleWheel);
    };
  }, [gridRef]);

  return (
    <div className="deck">
      <h2 className="deck-title">{title}</h2>
      <div className="deck-grid" ref={gridRef}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onSelect={onCardSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
