import { Button, TextField } from "@mui/material"
import { ReactNode, useMemo, useState } from "react"
import styled from "styled-components"
import { useForm, SubmitHandler } from "react-hook-form"
import { Interview, InterviewFlowName } from "src/features/interviews/types"
import Flex from "src/components/Flex"
import SelectOptions from "src/features/interviews/components/SelectOptions"
import { OptionType } from "src/types"
import { interviewFlowOptions } from "src/features/interviews/constants"
import { withTheme } from "@material-ui/core/styles"

type FormType = Pick<Interview, 'companyName' | 'titleName'>

const Form = styled.form`
  max-width: 500px;
  min-height: 500px;
  width: 500px;
  >div {
    margin-bottom: 16px;
  }
`
const InputGroup = styled(Flex)`
  gap: 16px;
  > div {
    flex: 1;
  }
`
const OptionOrder = withTheme(styled.span`
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background-color: ${({theme}) => theme.palette.info.dark};
`)

const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`

const CreateInterviewForm = ({ onSubmit }: {
  onSubmit: (data: FormType & { interviewFlow: InterviewFlowName[] }) => void
}) => {
  const {
    control,
    handleSubmit: handleRHFSubmit,
    register,
    clearErrors,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<FormType>({
    defaultValues: { companyName: '' },
  })

  const [interviewFlowData, setInterviewFlowData] = useState<InterviewFlowName[]>(['Resume Review'])

  const interviewFlowSelectOptions: Array<OptionType<ReactNode>> = useMemo(() => {
    return interviewFlowOptions.map((name) => {
      const index = interviewFlowData.findIndex((flow) => flow === name)
      const order = index !== -1 ? <OptionOrder>{index + 1}</OptionOrder> : null
      return {
        label: <span>
          {order}
          {name}
        </span>,
        value: name
      }
    })
  }, [interviewFlowData])

  const handleSubmit: SubmitHandler<FormType> = (formData: FormType) => {
    console.log(formData, 'formData')
    onSubmit({
      ...formData,
      interviewFlow: interviewFlowData
    })
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
    <div>
      <SelectOptions
        componentName="interviewFlowSelectOptions"
        shouldNotCloseWhenClickInside
        options={interviewFlowSelectOptions}
        displayLabel={interviewFlowData.length > 0
          ? interviewFlowData.join(', ')
          : '選擇流程'
        }
        onChange={(newValue) => {
          const isSelected = interviewFlowData.includes(newValue as InterviewFlowName)
          setInterviewFlowData(
            isSelected
              ? interviewFlowData.filter((name) => name !== newValue)
              : [...interviewFlowData, newValue as InterviewFlowName]
          )
        }}
      />
    </div>
    <ButtonWrapper>
      <Button variant="contained" type="submit">送出</Button>
    </ButtonWrapper>
  </Form>
}

export default CreateInterviewForm
