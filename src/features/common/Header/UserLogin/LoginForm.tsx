import { Button, TextField } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components"
import { UserContext } from "src/features/common/users/hooks"
import Flex from "src/components/Flex"
import { useContext } from "react"

type Form = {
  email: string
  password: string
}

const InputWrapper = styled.div`
  margin-bottom: 32px;
  max-width: 500px;
  width: 500px;
`

const LoginForm = ({
  onSubmitLoginData
}: {
  onSubmitLoginData: SubmitHandler<Form>;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { email: '', password: '' },
  })

  const { setLoginModalType } = useContext(UserContext);

  return <form onSubmit={handleSubmit(onSubmitLoginData)}>
    <InputWrapper>
      <TextField
        variant="filled"
        label="*Email"
        fullWidth
        error={!!errors?.email}
        helperText={errors?.email?.message}
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
        onClick={() => setLoginModalType('register')}
      >註冊</Button>
      <Button variant="contained" type="submit">登入</Button>
    </Flex>
  </form>
}

export default LoginForm
