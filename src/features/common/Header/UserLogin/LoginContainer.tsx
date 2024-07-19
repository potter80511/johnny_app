import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import AlertDialogSlide from "src/components/mui/AlertDialogSlide"
import { styled } from "styled-components"
import { fetchToLogin } from "src/features/common/users/fetchers"
import { useCookies } from "react-cookie"

const LoginContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

  const handleLogin = (account: string, password: string) => {
    fetchToLogin({
      inputData: { account, password },
      callBack: {
        onSuccess: ({message, data: {token, user}}) => {
          console.log(message, 'onSuccess')
          console.log(user, 'user')
          setCookie('user_token', token)
        },
        onError: ({message}) => {
          console.log(message, 'onError')
        },
      }
    })
  }

  return <>
    <Button variant="contained" size="small" onClick={() => handleLogin('test@test.com', '123456')}>Login</Button>
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
