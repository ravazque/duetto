import { useState, useEffect } from 'react';
import storage from '../services/storage';

/**
 * Hook genérico para gestionar estado persistido en localStorage
 *
 * @param {string} key - Clave de localStorage
 * @param {*} defaultValue - Valor por defecto si no existe en localStorage
 * @param {Function} [onUpdate] - Función opcional que se ejecuta cuando el estado cambia (recibe el nuevo valor)
 * @returns {[*, Function]} - [value, setValue]
 *
 * @example
 * const [darkMode, setDarkMode] = usePersistedState('darkMode', false, (value) => {
 *   document.body.classList.toggle('dark-mode', value);
 * });
 */
export const usePersistedState = (key, defaultValue, onUpdate) => {
  const [state, setState] = useState(() => {
    return storage.get(key, defaultValue);
  });

  useEffect(() => {
    storage.set(key, state);

    if (onUpdate) {
      onUpdate(state);
    }
  }, [key, state, onUpdate]);

  return [state, setState];
};
