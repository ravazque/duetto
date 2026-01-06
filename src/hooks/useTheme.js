import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Hook para acceder al contexto del tema
 *
 * @returns {Object} { darkMode, toggleDarkMode, setDarkMode }
 * @throws {Error} Si se usa fuera de ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }

  return context;
};
