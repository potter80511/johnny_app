import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { css } from 'styled-components';

type StyleOption = {
  size?: 12 | 16 | 24 | 32
  shouldMask?: boolean
}

const Wrapper = styled.div<StyleOption>`
  z-index: 1;
  width: 100%;
  height: 100%;
  svg {
    font-size: ${({size = 16}) => size + 'px'};
  }
  ${({shouldMask = false}) => shouldMask && css`
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    left: 0;
    top: 0;
  `};
`

const Loading = ({ size, shouldMask }: StyleOption) => {
  return <Wrapper className="flex-center" size={size} shouldMask={shouldMask}>
    <FontAwesomeIcon icon={faSpinner} spinPulse />
  </Wrapper>
}

export default Loading
