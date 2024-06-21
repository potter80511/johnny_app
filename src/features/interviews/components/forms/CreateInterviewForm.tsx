import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { useForm, SubmitHandler } from "react-hook-form"
import { Interview } from "src/features/interviews/types"
import Flex from "src/components/Flex"

type Form = Pick<Interview, 'companyName' | 'titleName'>

const Form = styled.form`
  max-width: 500px;
  width: 500px;
`
const InputGroup = styled(Flex)`
  gap: 16px;
  > div {
    flex: 1;
  }
`
const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`

const CreateInterviewForm = ({ onSubmit }: {
  onSubmit: (data: Form) => void
}) => {
  const {
    control,
    handleSubmit: handleRHFSubmit,
    register,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<Form>({
    defaultValues: { companyName: '' },
  })

  const handleSubmit: SubmitHandler<Form> = (formData: Form) => {
    console.log(formData, 'formData')
    onSubmit(formData)
  }

  return <Form onSubmit={handleRHFSubmit(handleSubmit)}>
    <InputGroup>
      <TextField
        variant="filled"
        label="職稱"
        {...register('titleName')}
      />
      <TextField
        variant="filled"
        label="公司名稱"
        error={!!errors?.companyName}
        helperText={errors?.companyName?.message || ''}
        {...register('companyName', {
          required: { value: true, message: '必填' },
          minLength: {value: 2, message: '字數至少2個字'},
        })}
      />
    </InputGroup>
    <ButtonWrapper>
      <Button variant="contained" type="submit">送出</Button>
    </ButtonWrapper>
  </Form>
}

export default CreateInterviewForm
