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
 * - resetScroll: trigger para resetear scroll al inicio
 * - deckGridRef: ref externa para el scroll del deck
 * - canFlipCards: flag que indica si las cartas pueden voltearse
 */
const Deck = ({ title, cards, onCardSelect, resetScroll, deckGridRef, canFlipCards }) => {
  const localDeckGridRef = useRef(null);
  const gridRef = deckGridRef || localDeckGridRef;

  // Resetear scroll al inicio cuando se revelan cartas
  useEffect(() => {
    if (resetScroll && gridRef.current) {
      gridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [resetScroll, gridRef]);

  return (
    <div className="deck">
      <h2 className="deck-title">{title}</h2>
      <div className="deck-grid" ref={gridRef}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onSelect={onCardSelect}
            canFlip={canFlipCards}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
