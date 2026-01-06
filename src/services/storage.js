/**
 * Servicio de almacenamiento
 *
 * Abstrae el acceso a localStorage proporcionando:
 * - Serialización/deserialización automática JSON
 * - Manejo robusto de errores
 * - API consistente
 * - Facilita testing y cambio de backend de almacenamiento
 *
 * @module services/storage
 */

/**
 * Obtiene un valor del almacenamiento
 * @param {string} key - Clave del valor a obtener
 * @param {*} defaultValue - Valor por defecto si no existe o hay error (default: null)
 * @returns {*} El valor almacenado parseado, o defaultValue
 *
 * @example
 * const darkMode = storage.get('darkMode', false);
 * const userData = storage.get('user', { name: 'Guest' });
 */
const get = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);

    // Si no existe, retornar valor por defecto
    if (value === null) {
      return defaultValue;
    }

    // Intentar parsear JSON
    return JSON.parse(value);
  } catch (error) {
    console.error(`[Storage] Error reading key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Guarda un valor en el almacenamiento
 * @param {string} key - Clave bajo la cual guardar
 * @param {*} value - Valor a guardar (será serializado a JSON)
 * @returns {boolean} true si se guardó correctamente, false si hubo error
 *
 * @example
 * storage.set('darkMode', true);
 * storage.set('settings', { theme: 'dark', language: 'es' });
 */
const set = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[Storage] Error writing key "${key}":`, error);
    return false;
  }
};

/**
 * Elimina un valor del almacenamiento
 * @param {string} key - Clave a eliminar
 * @returns {boolean} true si se eliminó correctamente, false si hubo error
 *
 * @example
 * storage.remove('oldSettings');
 */
const remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Error removing key "${key}":`, error);
    return false;
  }
};

/**
 * Limpia todo el almacenamiento
 * @returns {boolean} true si se limpió correctamente, false si hubo error
 *
 * @example
 * storage.clear();
 */
const clear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('[Storage] Error clearing storage:', error);
    return false;
  }
};

/**
 * Verifica si existe una clave en el almacenamiento
 * @param {string} key - Clave a verificar
 * @returns {boolean} true si la clave existe
 *
 * @example
 * if (storage.has('userPreferences')) {
 *   // Cargar preferencias
 * }
 */
const has = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`[Storage] Error checking key "${key}":`, error);
    return false;
  }
};

/**
 * Obtiene todas las claves almacenadas
 * @returns {string[]} Array de claves
 *
 * @example
 * const keys = storage.keys();
 * console.log('Keys almacenadas:', keys);
 */
const keys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('[Storage] Error getting keys:', error);
    return [];
  }
};

// Exportar API del servicio
const storage = {
  get,
  set,
  remove,
  clear,
  has,
  keys
};

export default storage;
