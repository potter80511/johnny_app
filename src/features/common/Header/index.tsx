import { Button } from "@mui/material"
import { useState } from "react"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import { styled } from "styled-components"
import RegisterForm from "src/features/common/Header/RegisterForm"
import { RegisterUserPayload } from "src/features/common/users/types/net"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const Header = () => {
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
  return <Wrapper>
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
  </Wrapper>
}

export default Header
