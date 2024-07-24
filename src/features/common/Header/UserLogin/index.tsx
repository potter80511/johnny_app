import { useContext, useEffect } from "react";
import { UserContext } from "src/features/common/users/hooks"
import UserDisplay from "src/features/common/Header/UserLogin/UserDisplay";
import LoginButtons from "src/features/common/Header/UserLogin/LoginButtons";
import { fetchToLoginByToken } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie";

const UserLogin = () => {
  const { 
    userInfo,
    setUserInfo,
    isUserInfoLoading,
    setIsUserInfoLoading
  } = useContext(UserContext);

  const [cookies] = useCookies(['user_token']);

  const handleAuthLogin = (token: string) => {
    setIsUserInfoLoading(true)

    fetchToLoginByToken({
      inputData: { token },
      callBack: {
        onSuccess: ({data: user}) => {
          setUserInfo({...user})
          setIsUserInfoLoading(false)
        },
        onError: ({message}) => {
          console.log(message, 'onError')
          setIsUserInfoLoading(false)
        },
      }
    })
  }

  useEffect(() => {
    const userToken = cookies['user_token']
    userToken && handleAuthLogin(userToken)
  }, [])
  
  if(isUserInfoLoading) {
    return <span>Loading..</span>
  } else if (!!userInfo) {
    return <UserDisplay userInfo={userInfo} setUserInfo={setUserInfo} />
  } else {
    return <LoginButtons />
  }
}

export default UserLogin
