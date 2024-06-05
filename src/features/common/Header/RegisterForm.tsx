import { Button, TextField } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components"

type Form = {
  username: string
  email: string
  password: string
}

const InputWrapper = styled.div`
  margin-bottom: 32px;
  max-width: 500px;
  width: 500px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    register,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<Form>({
    defaultValues: { email: '', password: '', username: '' },
  })

  const onSubmit: SubmitHandler<Form> = (formData: Form) => {
    console.log(formData, 'formData')
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <InputWrapper>
      <TextField
        variant="filled"
        label="User Name"
        fullWidth
        error={!!errors?.username}
        helperText={errors?.username?.message || ''}
        {...register('username', { maxLength: 20 })}
      />
    </InputWrapper>
    <InputWrapper>
      <TextField
        variant="filled"
        label="*Email"
        fullWidth
        error={!!errors?.email}
        helperText={errors?.email?.message || ''}
        {...register('email', { required: { value: true, message: '必填' }, maxLength: 20, minLength: 2 })}
      />
    </InputWrapper>
    <InputWrapper>
      <TextField
        variant="filled"
        label="*Password"
        fullWidth
        error={!!errors?.password}
        helperText={errors?.password?.message || ''}
        {...register('password', { required: { value: true, message: '必填' }, maxLength: 20, minLength: 2 })}
      />
    </InputWrapper>
    <ButtonWrapper>
      <Button variant="contained" type="submit">註冊</Button>
    </ButtonWrapper>
  </form>
}

export default RegisterForm
