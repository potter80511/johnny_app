import { useContext } from "react";
import { UserContext } from "src/features/common/users/hooks"
import UserDisplay from "src/features/common/Header/UserLogin/UserDisplay";
import LoginButtons from "src/features/common/Header/UserLogin/LoginButtons";

const UserLogin = () => {
  const { 
    userInfo,
    setUserInfo,
    isUserInfoLoading,
  } = useContext(UserContext);
  
  if(isUserInfoLoading) {
    return <span>Loading..</span>
  } else if (!!userInfo) {
    return <UserDisplay userInfo={userInfo} setUserInfo={setUserInfo} />
  } else {
    return <LoginButtons />
  }
}

export default UserLogin
