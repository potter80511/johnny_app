import { createContext, useContext, useState } from 'react';
import { User } from 'src/features/common/users/types';

type LoginModalType = 'login' | 'register' | ''

export const UserContext = createContext<{
  userInfo: User | null;
  setUserInfo: (info: User | null) => void;
  loginModalType: LoginModalType;
  setLoginModalType: (type: LoginModalType) => void;
  isUserInfoLoading: boolean;
  setIsUserInfoLoading: (status: boolean) => void
}>({
  userInfo: null,
  setUserInfo: () => {},
  loginModalType: '',
  setLoginModalType: () => {},
  isUserInfoLoading: false,
  setIsUserInfoLoading: () => {}
});

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [loginModalType, setLoginModalType] = useState<LoginModalType>('')
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false)

  return {
    userInfo,
    setUserInfo,
    loginModalType,
    setLoginModalType,
    isUserInfoLoading,
    setIsUserInfoLoading
  }
}

export default useUserInfo
