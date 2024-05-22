import { useState } from 'react'
import SelectOptions, { SelectOptionsProps, OptionValue } from 'src/features/interviews/components/SelectOptions'
import { updateInterviewById } from '../fetchers'
import { InterviewStatus } from '../enum';

type StatusOptionsContainerProps = Omit<SelectOptionsProps, 'currentValue' | 'onChange'> &
  { defaultValue: OptionValue; id: number }

const StatusOptionsContainer = (props: StatusOptionsContainerProps ) => {
  const { defaultValue, componentName, id, ...rest } = props
  const [currentValue, setCurrentValue] = useState<OptionValue>(defaultValue)

  const handleOnChange = async (newValue: OptionValue<InterviewStatus>) => {
    try {
      const result = await updateInterviewById(id, newValue)
      console.log(result, 'result')
      setCurrentValue(newValue)
    } catch {}
  }

  return <SelectOptions
    currentValue={currentValue}
    onChange={(newValue) => handleOnChange(newValue as OptionValue<InterviewStatus>)}
    componentName={componentName}
    {...rest}
  />
}

export default StatusOptionsContainer
