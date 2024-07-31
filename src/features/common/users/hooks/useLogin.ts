import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "src/features/common/users/hooks";
import { fetchToLogin } from "src/features/common/users/fetchers";
import toast from "src/helpers/toastify";
import { useRouter } from "next/router";

export type LoginData = {
  email: string
  password: string
}

const useLogin = () => {
  const router = useRouter()

  const { setLoginModalType, setUserInfo, setIsUserInfoLoading } = useContext(UserContext);
  const [_cookies, setCookie, removeCookie] = useCookies(['user_token']);

  const [loginResponseError, setLoginResponseError] = useState<LoginData>({
    email: '',
    password: ''
  })

  const redirectToPrevious = (targetPath: string) => {
    router.push(targetPath)
  }

  const handleLogin = (account: string, password: string) => {
    setIsUserInfoLoading(true)

    fetchToLogin({
      inputData: { account, password },
      callBack: {
        onSuccess: ({message, data: {token, user}}) => {
          setCookie('user_token', token)
          setUserInfo({...user})
          setLoginModalType('')
          setIsUserInfoLoading(false)

          toast(message)

          if(router.query?.from) {
            redirectToPrevious(router.query.from as string)
          }
        },
        onError: ({message, type, field}) => {
          setIsUserInfoLoading(false)
          setLoginResponseError({...loginResponseError, ...field})
          toast(message, type)
        },
      }
    })
  }

  const handleLogout = () => {
    removeCookie('user_token')
    setUserInfo(null)
  }

  return {
    loginResponseError,
    handleLogin,
    handleLogout
  }
}

export default useLogin
