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
