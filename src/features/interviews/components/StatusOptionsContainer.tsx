import { useState } from 'react'
import SelectOptions, { SelectOptionsProps, OptionValue } from 'src/features/interviews/components/SelectOptions'
import { updateInterviewById } from 'src/features/interviews/fetchers'
import { InterviewStatus } from 'src/features/interviews/enum';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

type StatusOptionsContainerProps = Omit<SelectOptionsProps, 'currentValue' | 'onChange'> &
  {
    defaultValue: OptionValue;
    id: number;
    onOpenDialog: () => void
  }

const Wrapper = styled.div`
  position: relative;
`
const IconWrapper = styled.div`
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const StatusOptionsContainer = (props: StatusOptionsContainerProps ) => {
  const { defaultValue, componentName, id, onOpenDialog, ...rest } = props
  const [currentValue, setCurrentValue] = useState<OptionValue>(defaultValue)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = async (newValue: OptionValue<InterviewStatus>) => {
    setIsLoading(true)
    try {
      await updateInterviewById(id, {status: newValue})
      setCurrentValue(newValue)
      onOpenDialog()
    } catch {} finally {
      setIsLoading(false)
    }
  }

  return <Wrapper>
    {isLoading && <IconWrapper className="flex-center">
        <FontAwesomeIcon icon={faSpinner} spinPulse />
      </IconWrapper>
    }
    <SelectOptions
      currentValue={currentValue}
      onChange={(newValue) => handleOnChange(newValue as OptionValue<InterviewStatus>)}
      componentName={componentName}
      {...rest}
    />
  </Wrapper>
}

export default StatusOptionsContainer
