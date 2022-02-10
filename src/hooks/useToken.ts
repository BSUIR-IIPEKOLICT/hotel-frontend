import { LSKey } from '../shared/enums';

export default function useToken() {
  const getToken = () => localStorage.getItem(LSKey.Token) || '';
  const saveToken = (token: string) => localStorage.setItem(LSKey.Token, token);
  const destroyToken = () => localStorage.removeItem(LSKey.Token);

  return {
    getToken,
    saveToken,
    destroyToken,
  };
}
