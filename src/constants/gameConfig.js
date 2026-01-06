/**
 * Configuración general del juego y constantes de estado
 */

// Estados posibles de una carta
export const CARD_STATES = {
  FACE_DOWN: 'faceDown',      // Carta boca abajo (estado inicial)
  SELECTED: 'selected',        // Carta seleccionada pero aún boca abajo
  MOVING_TO_END: 'moving-to-end', // Carta moviéndose al final del mazo
  FLIPPED: 'flipped'           // Carta volteada mostrando contenido
};

// Keys para localStorage
export const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  WORD_CARDS: 'wordCards',     // Deprecated - ya no se usa
  IMAGE_CARDS: 'imageCards'    // Deprecated - ya no se usa
};

// Reglas del juego
export const GAME_RULES = {
  MAX_SELECTED_PER_DECK: 1,    // Máximo de cartas seleccionadas por mazo
  CAN_SELECT_FLIPPED: false    // No se pueden seleccionar cartas volteadas
};
