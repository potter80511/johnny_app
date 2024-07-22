import { Button, TextField } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components"
import { RegisterUserPayload } from "src/features/common/users/types/net"
import { fetchToRegister } from "src/features/common/users/fetchers"
import { UserContext } from "src/features/common/users/hooks"
import Flex from "src/components/Flex"
import { useContext } from "react"
import useLogin from "src/features/common/users/hooks/useLogin"

type Form = RegisterUserPayload

const InputWrapper = styled.div`
  margin-bottom: 32px;
  max-width: 500px;
  width: 500px;
`

const RegisterForm = ({
  registerRequestError,
  setRegisterRequestError,
  onClose
}: {
  registerRequestError: Form
  setRegisterRequestError: (formError: Partial<Form>) => void
  onClose: () => void
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { email: '', password: '', username: '' },
  })

  const { handleLogin } = useLogin()

  const onSubmit: SubmitHandler<Form> = (formData: Form) => {
    fetchToRegister({
      inputData: formData,
      callBack: {
        onSuccess: () => {
          onClose()
          handleLogin(formData.email, formData.password)
        },
        onError: (err) => {
          setRegisterRequestError({
            email: err.message
          })
        }
      }
    })
  }

  const { setLoginModalType } = useContext(UserContext);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <InputWrapper>
      <TextField
        variant="filled"
        label="User Name"
        fullWidth
        error={!!errors?.username}
        helperText={errors?.username?.message || ''}
        {...register('username', {
          maxLength: {value: 20, message: '最多不可超過20個字'}
        })}
      />
    </InputWrapper>
    <InputWrapper>
      <TextField
        variant="filled"
        label="*Email"
        fullWidth
        error={!!errors?.email || !!registerRequestError.email}
        helperText={errors?.email?.message || registerRequestError.email || ''}
        {...register('email', {
          required: { value: true, message: '必填' },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Email格式不正確'
          },
        })}
      />
    </InputWrapper>
    <InputWrapper>
      <TextField
        variant="filled"
        label="*Password"
        fullWidth
        error={!!errors?.password}
        helperText={errors?.password?.message || ''}
        {...register('password', { required: { value: true, message: '必填' }, maxLength: {
          value: 20,
          message: '密碼最多不可超過20個字'
        },
        minLength: {
          value: 6,
          message: '密碼至少6個字'
        } })}
      />
    </InputWrapper>
    <Flex alignItems="center" justifyContent="flex-end" gap={12}>
      <Button
        variant="text"
        type="button"
        onClick={() => setLoginModalType('login')}
      >已有帳號請登入</Button>
      <Button variant="contained" type="submit">註冊</Button>
    </Flex>
  </form>
}

export default RegisterForm
