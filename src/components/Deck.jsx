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

  // Implementar scroll horizontal con rueda del ratón
  useEffect(() => {
    const deckElement = gridRef.current;
    if (!deckElement) return;

    const handleWheel = (e) => {
      // Prevenir scroll vertical de la página
      e.preventDefault();

      // Scroll horizontal con la rueda del ratón
      // deltaY es positivo cuando se hace scroll hacia abajo
      // deltaX es positivo cuando se hace scroll hacia la derecha
      const scrollAmount = e.deltaY || e.deltaX;
      deckElement.scrollLeft += scrollAmount;
    };

    // Agregar listener con passive: false para poder prevenir el comportamiento por defecto
    deckElement.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup: remover listener cuando el componente se desmonte
    return () => {
      deckElement.removeEventListener('wheel', handleWheel);
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
