import React from 'react';
import { UI_MESSAGES } from '../constants/uiTexts';
import './RevealArea.css';

/**
 * Componente RevealArea - Área de revelación estilo OH Cards
 *
 * Muestra las cartas reveladas con:
 * - Carta de palabra grande con texto en los bordes
 * - Carta de imagen superpuesta sobre la palabra
 */
const RevealArea = ({ wordCard, imageCard, animationKey }) => {
  const hasRevealedCards = wordCard || imageCard;

  return (
    <div className="reveal-area">
      <div className="reveal-container">
        {hasRevealedCards ? (
          <div className="oh-cards-stack" key={animationKey}>
            {/* Carta de palabra (más grande, abajo) */}
            {wordCard && (
              <div className="oh-card oh-card-word">
                <div className="oh-card-border-text top">{wordCard.content}</div>
                <div className="oh-card-border-text bottom">{wordCard.content}</div>
              </div>
            )}

            {/* Carta de imagen (superpuesta, más pequeña) */}
            {imageCard && (
              <div className="oh-card oh-card-image">
                <img src={imageCard.content} alt="Carta revelada" />
              </div>
            )}
          </div>
        ) : (
          <div className="reveal-placeholder">
            <div className="placeholder-icon">{UI_MESSAGES.REVEAL_PLACEHOLDER_ICON}</div>
            <p>{UI_MESSAGES.SELECT_CARDS_PLACEHOLDER}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevealArea;
