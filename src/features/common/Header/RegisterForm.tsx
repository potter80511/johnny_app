import { Button, TextField } from "@mui/material"
import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components"
import { RegisterUserPayload } from "src/features/common/users/types/net"
import { fetchToRegister } from "src/features/common/users/fetchers"

type Form = RegisterUserPayload

const InputWrapper = styled.div`
  margin-bottom: 32px;
  max-width: 500px;
  width: 500px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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
    fetchToRegister({
      inputData: formData,
      callBack: {
        onSuccess: (res) => {
          onClose()
          console.log(res.message, 'resresresresres')
        },
        onError: (err) => {
          console.log(err.message, 'errerrerrerr')
          setRegisterRequestError({
            email: err.message
          })
        }
      }
    })
  }

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
    <ButtonWrapper>
      <Button variant="contained" type="submit">註冊</Button>
    </ButtonWrapper>
  </form>
}

export default RegisterForm
