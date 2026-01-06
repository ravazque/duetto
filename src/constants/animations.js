/**
 * Constantes de tiempo para animaciones de cartas
 * Todos los valores en milisegundos
 */

// Animación de movimiento de carta al final del mazo
export const MOVE_TO_END_DURATION = 400;

// Duración de animación de volteo de carta (debe coincidir con CSS)
export const CARD_FLIP_DURATION = 600;

// Delay para desbloquear UI después de revelar cartas
// (CARD_FLIP_DURATION + margen de seguridad)
export const REVEAL_COMPLETE_DELAY = 700;

// Delay para esperar animación de volteo antes de mezclar
// (CARD_FLIP_DURATION + margen de seguridad)
export const FLIP_TO_FACEDOWN_DELAY = 650;

// Delay para desbloquear UI después de mezclar
export const SHUFFLE_UNLOCK_DELAY = 100;
