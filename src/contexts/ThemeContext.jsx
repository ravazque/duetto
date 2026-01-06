import { createContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { STORAGE_KEYS } from '../constants/gameConfig';

/**
 * Context para gestionar el tema de la aplicación (modo oscuro/claro)
 */
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {}
});

/**
 * Provider para el ThemeContext
 * Gestiona el estado del tema y su persistencia
 */
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = usePersistedState(
    STORAGE_KEYS.DARK_MODE,
    false,
    (value) => {
      // Aplicar clase al body cuando cambia el tema
      if (value) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  );

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    setDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
