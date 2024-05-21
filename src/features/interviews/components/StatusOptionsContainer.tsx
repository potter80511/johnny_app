import { useState } from 'react'
import SelectOptions, { SelectOptionsProps, OptionValue } from 'src/features/interviews/components/SelectOptions'

type StatusOptionsContainerProps = Omit<SelectOptionsProps, 'currentValue' | 'onChange'> &
  { defaultValue: OptionValue }

const StatusOptionsContainer = (props: StatusOptionsContainerProps ) => {
  const { defaultValue, ...rest } = props
  const [currentValue, setCurrentValue] = useState<OptionValue>(defaultValue)

  const handleOnChange = async (newValue: OptionValue) => {
    setCurrentValue(newValue)
  }

  return <SelectOptions
    currentValue={currentValue}
    onChange={handleOnChange}
    {...rest}
  />
}

export default StatusOptionsContainer
