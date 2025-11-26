import React from 'react';
import './Card.css';

/**
 * Componente Card - Representa una carta individual
 *
 * Props:
 * - card: objeto con {id, type, content, state}
 * - onSelect: función para manejar la selección de la carta
 *
 * Estados posibles:
 * - faceDown: carta boca abajo, no seleccionada
 * - selected: carta seleccionada pero aún boca abajo
 * - flipped: carta volteada mostrando su contenido
 */
const Card = ({ card, onSelect }) => {
  const handleClick = () => {
    // Solo permitir selección si está boca abajo o ya seleccionada
    if (card.state === 'faceDown' || card.state === 'selected') {
      onSelect(card.id);
    }
  };

  return (
    <div
      className={`card ${card.state} ${card.type} ${card.previouslyFlipped ? 'previously-flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Reverso de la carta */}
        <div className="card-back">
          <div className="card-pattern">
            <span className="card-type-indicator">
              {card.type === 'word' ? 'P' : 'I'}
            </span>
          </div>
        </div>

        {/* Anverso de la carta */}
        <div className="card-front">
          {card.type === 'word' ? (
            <div className="card-word">{card.content}</div>
          ) : (
            <div className="card-image">
              {card.imageData ? (
                <img src={card.imageData} alt="Carta" className="card-image-img" />
              ) : (
                card.content
              )}
            </div>
          )}
        </div>
      </div>

      {/* Indicador visual de selección */}
      {card.state === 'selected' && (
        <div className="selection-indicator">✓</div>
      )}
    </div>
  );
};

export default Card;
