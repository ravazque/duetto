/**
 * Constantes de textos de interfaz de usuario
 * Centraliza todos los textos visibles para facilitar mantenimiento y futura internacionalización
 */

// Títulos de mazos
export const DECK_TITLES = {
  WORDS: '📝 Mazo de Palabras',
  IMAGES: '🖼️ Mazo de Imágenes'
};

// Textos de botones
export const BUTTON_LABELS = {
  REVEAL: '✨ Revelar Cartas',
  RESET: '🔄 Reiniciar / Mezclar',
  DARK_MODE: '🌙',
  LIGHT_MODE: '☀️',
  FULLSCREEN: '⛶',
  EXIT_FULLSCREEN: '🗗',
  MAXIMIZE: '🗖',
  MINIMIZE: '🗕',
  ZOOM_IN: '🔍+',
  ZOOM_OUT: '🔍-',
  CLOSE: '✕'
};

// Tooltips (títulos de ayuda al pasar el mouse)
export const TOOLTIPS = {
  REVEAL_DISABLED: 'Debes seleccionar 1 carta de cada mazo',
  REVEAL_ENABLED: 'Revelar cartas',
  RESET_DISABLED: 'Espera a que termine la animación',
  RESET_ENABLED: 'Reiniciar y mezclar cartas',
  DARK_MODE: 'Modo oscuro',
  LIGHT_MODE: 'Modo claro',
  FULLSCREEN: 'Pantalla completa',
  EXIT_FULLSCREEN: 'Salir de pantalla completa',
  MAXIMIZE: 'Maximizar ventana',
  MINIMIZE: 'Minimizar ventana',
  ZOOM_IN: 'Aumentar zoom',
  ZOOM_OUT: 'Reducir zoom',
  ZOOM_IN_DISABLED: 'Zoom máximo alcanzado',
  ZOOM_OUT_DISABLED: 'Zoom mínimo alcanzado',
  CLOSE_APP: 'Cerrar aplicación'
};

// Mensajes de la interfaz
export const UI_MESSAGES = {
  REVEALED_PAIRS_LABEL: 'Parejas Reveladas:',
  SELECT_CARDS_PLACEHOLDER: 'Selecciona 1 carta de cada mazo',
  REVEAL_PLACEHOLDER_ICON: '🎴'
};

// Indicadores de tipo de carta
export const CARD_TYPE_INDICATORS = {
  WORD: 'P',  // Palabra
  IMAGE: 'I'  // Imagen
};
