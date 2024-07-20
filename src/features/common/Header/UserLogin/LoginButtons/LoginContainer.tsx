import { Button } from "@mui/material"
import { useContext, useEffect } from "react"
import { fetchToLogin, fetchToLoginByToken } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie"
import { UserContext } from "src/features/common/users/hooks"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import LoginForm from "src/features/common/Header/UserLogin/LoginForm"

const LoginContainer = () => {
  const [cookies, setCookie] = useCookies(['user_token']);
  const { loginModalType, setUserInfo, setLoginModalType } = useContext(UserContext);

  const handleLogin = (account: string, password: string) => {
    fetchToLogin({
      inputData: { account, password },
      callBack: {
        onSuccess: ({message, data: {token, user}}) => {
          console.log(message, 'onSuccess')
          console.log(user, 'user')
          setCookie('user_token', token)
          setUserInfo({...user})
          setLoginModalType('')
        },
        onError: ({message}) => {
          console.log(message, 'onError')
        },
      }
    })
  }

  const handleAuthLogin = (token: string) => {
    fetchToLoginByToken({
      inputData: { token },
      callBack: {
        onSuccess: ({message, data: user}) => {
          console.log(user, 'user')
          setUserInfo({...user})
        },
        onError: ({message}) => {
          console.log(message, 'onError')
        },
      }
    })
  }
  

  useEffect(() => {
    const userToken = cookies['user_token']
    handleAuthLogin(userToken)
  }, [])

  return <>
    <Button
      variant="contained"
      size="small"
      onClick={() => setLoginModalType('login')}
    >Login</Button>
    <AlertDialogSlide
      title="登入"
      isDialogOpen={loginModalType === 'login'}
      shouldHideButtons
      onClose={() => setLoginModalType('')}
    >
      <LoginForm onSubmitLoginData={(formData) => handleLogin(formData.email, formData.password)}
      />
    </AlertDialogSlide>
  </>
}

export default LoginContainer
