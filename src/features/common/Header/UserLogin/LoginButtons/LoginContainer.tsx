import { Button } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "src/features/common/users/hooks"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import LoginForm from "src/features/common/Header/UserLogin/LoginForm"

const LoginContainer = () => {
  const {
    loginModalType,
    setLoginModalType,
  } = useContext(UserContext);

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
      <LoginForm />
    </AlertDialogSlide>
  </>
}

export default LoginContainer
