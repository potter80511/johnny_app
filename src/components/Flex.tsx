import { ReactNode } from "react"
import styled, { CSSProperties } from "styled-components";

type FlexProps = {
  className?: string
  children: ReactNode
  flexWrap?: CSSProperties['flexWrap']
  flexDirection?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  mr?: number
  mt?: number
  ml?: number
  mb?: number
}

const Wrapper = styled.div<FlexProps>`
  display: flex;
  flex-wrap: ${({ flexWrap }) => flexWrap};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  margin-right: ${({ mr }) => mr && mr + 'px'};
  margin-top: ${({ mt }) => mt && mt + 'px'};
  margin-left: ${({ ml }) => ml && ml + 'px'};
  margin-bottom: ${({ mb }) => mb && mb + 'px'};
`

const Flex = (props: FlexProps) => {
  const { children, className, justifyContent } = props
  return <Wrapper className={className} justifyContent={justifyContent}>{children}</Wrapper>
}

export default Flex
