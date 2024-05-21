import { useRef, useState } from 'react'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { OptionType } from 'src/types'
import styled, { css } from 'styled-components'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
  position: relative;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #222;
  transition: all .3s;
  gap: 8px;
  &:hover {
    background-color: #333;
  }

  svg {
    color: #fff;
    font-size: 12px;
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
  padding: 8px 4px;
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
  currentValue,
  options,
  onChange,
  optionsMenuStyle
}: {
  id: string,
  currentValue: OptionValue
  options: OptionType[]
  onChange: (newValue: OptionValue) => void
  optionsMenuStyle?: MenuStyle
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false)

  const clickRef = useRef(null)
  useOnClickOutside(clickRef, () => setIsOptionOpen(false))

  return <Wrapper className="flex-between" onClick={() => setIsOptionOpen(!isOptionOpen)} ref={clickRef}>
    <span>{options.find((item) => item.value === currentValue)?.label || '--'}</span>
    <FontAwesomeIcon icon={faChevronDown} />
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
