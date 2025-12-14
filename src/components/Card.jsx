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
 * - selected: carta seleccionada
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
      className={`card ${card.state} ${card.type}`}
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
            <div className="card-word">
              {/* Dividir palabras compuestas en líneas */}
              {card.content.includes(' ') ? (
                card.content.split(' ').map((word, index) => (
                  <span key={index} className="card-word-line">{word}</span>
                ))
              ) : (
                card.content
              )}
            </div>
          ) : (
            <div className="card-image">
              <img src={card.content} alt="Carta" className="card-image-img" />
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
