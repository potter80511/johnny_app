import { useState } from 'react'
import { OptionType } from 'src/types'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #333;
  transition: all .3s;
  &:hover {
    background-color: #222;
  }
`

type MenuStyle = {
  minWidth?: number
}

const OptionsWrapper = styled.div<{customStyle?: MenuStyle}>`
  position: absolute;
  left: 0;
  top: 100%;
  background: #444;
  z-index: 100;
  border-radius: 4px;
  overflow: hidden;
  padding: 4px;
  ${({ customStyle }) => css`
    min-width: ${customStyle?.minWidth && customStyle.minWidth + 'px'};
  `};
`
const Option = styled.div`
  padding: 4px;
  transition: all .3s;
  border-radius: 4px;
  &:not(:last-child) {
    border-bottom: 1px solid #333;
  }
  &:hover {
    background-color: #333;
  }
`

type OptionValue = string | number

const SelectOptions = ({
  id,
  defaultValue,
  options,
  onChange,
  optionsMenuStyle
}: {
  id: string,
  defaultValue: OptionValue
  options: OptionType[]
  onChange: (newValue: OptionValue) => void
  optionsMenuStyle?: MenuStyle
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<OptionValue>(defaultValue)

  const handleOnChange = (newValue: OptionValue) => {
    onChange(newValue)
    setCurrentValue(newValue)
  }

  return <Wrapper onClick={() => setIsOptionOpen(!isOptionOpen)}>
    <span>{options.find((item) => item.value === currentValue)?.label || '--'}</span>
    {isOptionOpen && <OptionsWrapper customStyle={optionsMenuStyle}>
      {options.map((o) => <Option
        key={`${id}-${o.value}`}
        onClick={() => onChange(o.value)}
      >
        {o.label}
      </Option>)}
    </OptionsWrapper>}
  </Wrapper>
}

export default SelectOptions
