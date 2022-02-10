import { useEffect, useState } from 'react';
import { LSKey } from '../shared/enums';

export default function useThemeState() {
  const [isDark, setIsDark] = useState(true);

  const isDarkMode = () => localStorage.getItem(LSKey.DarkMode) !== 'false';
  const saveDarkMode = (isDark: boolean) =>
    localStorage.setItem(LSKey.DarkMode, JSON.stringify(isDark));
  const toggleThemeHandler = () => setIsDark((prev) => !prev);

  useEffect(() => setIsDark(isDarkMode), []);
  useEffect(() => saveDarkMode(isDark), [isDark]);

  return {
    isDark,
    toggleThemeHandler,
  };
}
