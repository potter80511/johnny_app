import { createContext, useContext, useState } from 'react';
import { User } from 'src/features/common/users/types';

type LoginModalType = 'login' | 'register' | ''

export const UserContext = createContext<{
  userInfo: User | null;
  setUserInfo: (info: User | null) => void;
  loginModalType: LoginModalType;
  setLoginModalType: (type: LoginModalType) => void;
}>({
  userInfo: null,
  setUserInfo: () => {},
  loginModalType: '',
  setLoginModalType: () => {}
});

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [loginModalType, setLoginModalType] = useState<LoginModalType>('')

  return {
    userInfo,
    setUserInfo,
    loginModalType,
    setLoginModalType
  }
}

export default useUserInfo
