import { Button } from "@mui/material"
import { useContext } from "react"
import { fetchToLogin } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie"
import { UserContext } from "src/features/common/users/hooks"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import LoginForm from "src/features/common/Header/UserLogin/LoginForm"

const LoginContainer = () => {
  const [_cookies, setCookie] = useCookies(['user_token']);
  const {
    loginModalType,
    setUserInfo,
    setLoginModalType,
    setIsUserInfoLoading
  } = useContext(UserContext);

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
        },
        onError: ({message}) => {
          setIsUserInfoLoading(false)
        },
      }
    })
  }

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
