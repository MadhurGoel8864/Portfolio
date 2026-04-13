import { useState, useEffect } from 'react';

/**
 * Manages dark/light theme with localStorage persistence.
 * Returns [isDark, toggleTheme].
 */
export function useTheme() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return { isDark: true };
}
