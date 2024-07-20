import { Button } from "@mui/material"
import { useContext, useState } from "react"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import RegisterForm from "src/features/common/Header/UserLogin/RegisterForm"
import { UserContext } from "src/features/common/users/hooks"
import { RegisterUserPayload } from "src/features/common/users/types/net"

const RegisterContainer = () => {
  const [registerRequestError, setRegisterRequestError] = useState<RegisterUserPayload>({
    email: '',
    username: '',
    password: ''
  })

  const { loginModalType, setLoginModalType } = useContext(UserContext);

  const onOpenRegisterDialog = () => {
    setLoginModalType('register')
  }

  const handleCloseDialogData = () => {
    setLoginModalType('')
  }

  return <>
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={() => onOpenRegisterDialog()}
    >註冊</Button>
    <AlertDialogSlide
      title="註冊"
      isDialogOpen={loginModalType === 'register'}
      shouldHideButtons
      onClose={handleCloseDialogData}
    >
      <RegisterForm
        registerRequestError={registerRequestError}
        setRegisterRequestError={(newError) => setRegisterRequestError({
          ...registerRequestError, 
          ...newError
        })}
        onClose={handleCloseDialogData}
      />
    </AlertDialogSlide>
  </>
}

export default RegisterContainer
