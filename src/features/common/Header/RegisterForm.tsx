import { Button, TextField } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components"

type Form = {
  email: string
  password: string
}

const ButtonWrapper = styled.div``

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    register,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<Form>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<Form> = (formData: Form) => {
    console.log(formData, 'formData')
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      variant="filled"
      label="Email"
      fullWidth
      error={!!errors?.email}
      helperText={errors?.email?.message || ''}
      {...register('email', { required: { value: true, message: '欄位必填' }, maxLength: 20, minLength: 2 })}
    />
    <ButtonWrapper>
      <Button variant="contained" type="submit">註冊</Button>
    </ButtonWrapper>
  </form>
}

export default RegisterForm
