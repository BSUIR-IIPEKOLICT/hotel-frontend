import { LocalStorageHook } from '../interfaces/hooks';
import { LSKey } from '../shared/enums';

export default function useLocalStorage(): LocalStorageHook {
  return {
    isDarkMode: () => localStorage.getItem(LSKey.DarkMode) !== 'false',
    saveDarkMode: (isDark: boolean) =>
      localStorage.setItem(LSKey.DarkMode, JSON.stringify(isDark)),
    getToken: () => localStorage.getItem(LSKey.Token) || '',
    saveToken: (token: string) => localStorage.setItem(LSKey.Token, token),
    destroyToken: () => localStorage.removeItem(LSKey.Token),
  };
}
