import { Button } from "@mui/material"
import { useContext, useEffect } from "react"
import { fetchToLogin, fetchToLoginByToken } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie"
import { UserContext } from "src/features/common/users/hooks"

const LoginContainer = () => {
  const [cookies, setCookie] = useCookies(['user_token']);
  const { setUserInfo } = useContext(UserContext);

  const handleLogin = (account: string, password: string) => {
    fetchToLogin({
      inputData: { account, password },
      callBack: {
        onSuccess: ({message, data: {token, user}}) => {
          console.log(message, 'onSuccess')
          console.log(user, 'user')
          setCookie('user_token', token)
          setUserInfo({...user})
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
      onClick={() => handleLogin('test@test.com', '123456')}
    >Login</Button>
    {/* <AlertDialogSlide
      title="註冊"
      isDialogOpen={isDialogOpen}
      shouldHideButtons
      onClose={handleCloseDialogData}
    >
      <RegisterForm
        registerRequestError={registerRequestError}
        setRegisterRequestError={(newError) => setRegisterRequestError({...registerRequestError, ...newError})}
        onClose={handleCloseDialogData}
      />
    </AlertDialogSlide> */}
  </>
}

export default LoginContainer
