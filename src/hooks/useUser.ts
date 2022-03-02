import { useRouter } from 'next/router';
import { EndPoint, LSKey } from '../shared/enums';
import { ChangeEvent, useContext, useState } from 'react';
import { StoreContext } from '../store';
import { User } from '../interfaces/models';
import { userRepository } from '../repositories';
import { errorViewer } from '../shared/utils';

export default function useUser() {
  const { push, pathname } = useRouter();
  const { userStore } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    try {
      const user: User =
        pathname === EndPoint.Register
          ? await userRepository.register(email, password)
          : await userRepository.login(email, password);

      userStore.setUser(user);
      userStore.setIsAuth(true);
      await push(EndPoint.Main);
    } catch (e) {
      errorViewer(e);
    }
  };

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const logoutHandler = () => {
    userStore.setUser();
    userStore.setIsAuth(false);
    localStorage.removeItem(LSKey.Token);
    push(EndPoint.Main).then();
  };

  return {
    logoutHandler,
    submitHandler,
    changeEmailHandler,
    changePasswordHandler,
  };
}
