import { useRouter } from 'next/router';
import { EndPoint } from '../shared/enums';

export default function useNavigation() {
  const { route } = useRouter();
  const isAuthPages = () =>
    route === EndPoint.Login || route === EndPoint.Register;

  return { isAuthPages };
}
