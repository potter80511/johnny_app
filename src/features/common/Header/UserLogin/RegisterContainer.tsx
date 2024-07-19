import { Button } from "@mui/material"
import { useState } from "react"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import RegisterForm from "src/features/common/Header/RegisterForm"
import { RegisterUserPayload } from "src/features/common/users/types/net"

const RegisterContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [registerRequestError, setRegisterRequestError] = useState<RegisterUserPayload>({
    email: '',
    username: '',
    password: ''
  })

  const onOpenRegisterDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialogData = () => {
    setIsDialogOpen(false)
  }

  return <>
    <Button variant="contained" size="small" onClick={() => onOpenRegisterDialog()}>註冊</Button>
    <AlertDialogSlide
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
    </AlertDialogSlide>
  </>
}

export default RegisterContainer
