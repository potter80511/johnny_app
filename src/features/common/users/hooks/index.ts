import { createContext, useContext, useState } from 'react';
import { User } from 'src/features/common/users/types';

export const UserContext = createContext<{
  userInfo: User | null;
  setUserInfo: (info: User | null) => void
}>({userInfo: null, setUserInfo: () => {}});

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  return {
    userInfo,
    setUserInfo
  }
}

export default useUserInfo
