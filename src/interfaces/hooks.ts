export interface LocalStorageHook {
  isDarkMode: () => boolean;
  saveDarkMode: (isDark: boolean) => void;
  getToken: () => string;
  saveToken: (token: string) => void;
  destroyToken: () => void;
}
