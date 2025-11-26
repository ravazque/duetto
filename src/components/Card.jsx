import React from 'react';
import './Card.css';

/**
 * Componente Card - Representa una carta individual
 *
 * Props:
 * - card: objeto con {id, type, content, state}
 * - onSelect: función para manejar la selección de la carta
 * - canFlip: flag que indica si la carta puede voltearse
 *
 * Estados posibles:
 * - faceDown: carta boca abajo, no seleccionada
 * - selected: carta seleccionada pero aún boca abajo
 * - flipped: carta volteada mostrando su contenido
 */
const Card = ({ card, onSelect, canFlip }) => {
  const handleClick = () => {
    // Solo permitir selección si está boca abajo o ya seleccionada
    if (card.state === 'faceDown' || card.state === 'selected') {
      onSelect(card.id);
    }
  };

  // Determinar la clase de estado para animaciones
  const stateClass = card.state === 'ready-to-flip' ? 'flipped' : card.state;

  return (
    <div
      className={`card ${stateClass} ${card.type} ${card.previouslyFlipped ? 'previously-flipped' : ''} ${canFlip ? 'can-flip' : ''}`}
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
            <div
              className="card-word"
              style={{
                fontSize: card.content.length > 6
                  ? `${Math.max(0.4, 1.4 - (card.content.length - 6) * 0.1)}rem`
                  : '1.4rem',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
                whiteSpace: 'nowrap',
                lineHeight: card.content.length > 10 ? '1.2' : '1.3'
              }}
            >
              {card.content}
            </div>
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
