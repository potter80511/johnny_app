import { Button } from "@mui/material"
import { useState } from "react"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import { styled } from "styled-components"

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
      test
    </AlertDialogSlide>
  </Wrapper>
}

export default Header
