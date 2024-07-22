import { useState } from 'react'
import SelectOptions, { SelectOptionsProps, OptionValue } from 'src/features/interviews/components/SelectOptions'
import { updateInterviewById } from 'src/features/interviews/fetchers'
import styled from 'styled-components';
import Loading from 'src/components/Loading';

type CurrentTestLevelContainerProps = Omit<SelectOptionsProps, 'onChange'> &
  {
    id: number
    onChangeSuccess: () => void;
  }

const Wrapper = styled.div`
  position: relative;
`

const CurrentTestLevelOptionsContainer = (props: CurrentTestLevelContainerProps ) => {
  const { id,
    componentName,
    currentValue,
    onChangeSuccess,
    ...rest
  } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = async (newValue: OptionValue<number>) => {
    setIsLoading(true)
    try {
      await updateInterviewById(id, {currentTestLevel: newValue})
      onChangeSuccess()
    } catch {} finally {
      setIsLoading(false)
    }
  }

  return <Wrapper>
    {isLoading && <Loading size={12} shouldMask/>}
    <SelectOptions
      currentValue={currentValue}
      onChange={(newValue) => handleOnChange(newValue as OptionValue<number>)}
      componentName={componentName}
      {...rest}
    />
  </Wrapper>
}

export default CurrentTestLevelOptionsContainer
