import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/features/common/users/hooks"
import { fetchToLoginByToken } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie";
import toast from "src/helpers/toastify";

const routesShouldAuthorized = ['/ride_check_in', '/interviews']

const AuthCheckContainer = () => {
  const router = useRouter()
  const [cookies] = useCookies(['user_token']);

  const [authCheckingStatus, setAuthCheckingStatus] = useState<PromiseProgressStatus>('pending')

  const { 
    setUserInfo,
    setIsUserInfoLoading,
    setLoginModalType
  } = useContext(UserContext);

  const handleAuthLogin = (token: string) => {
    setIsUserInfoLoading(true)

    fetchToLoginByToken({
      inputData: { token },
      callBack: {
        onSuccess: ({data: user}) => {
          setUserInfo({...user})
          setIsUserInfoLoading(false)
          setAuthCheckingStatus('resolved')
        },
        onError: ({message}) => {
          console.log(message, 'onError')
          setIsUserInfoLoading(false)
          setAuthCheckingStatus('rejected')
        },
      }
    })
  }

  useEffect(function loginByToken() {
    const userToken = cookies['user_token']
    userToken && handleAuthLogin(userToken)
  }, [])

  useEffect(function handleCheckAuth() {
    const shouldAutorized = routesShouldAuthorized.includes(router.pathname)
    const userToken = cookies['user_token']

    if(shouldAutorized && (!userToken || authCheckingStatus === 'rejected')) {
      toast('Please Login!!', 'info')
      setLoginModalType('login')
      router.push({
        pathname: '/',
        query: { from: router.asPath }
      })
      setAuthCheckingStatus('pending')
    }
  }, [authCheckingStatus, router, cookies])

  return null
}

export default AuthCheckContainer
