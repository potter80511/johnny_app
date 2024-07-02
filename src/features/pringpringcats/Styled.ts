import { styled } from "styled-components"
import { lineCamp } from "src/styles/Styled"

export const Description = styled.pre<{ $lineCount?: number }>`
  ${({$lineCount}) => $lineCount !== undefined && lineCamp}
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 400px;
  overflow: auto;
  a {
    color: #3ea6ff !important;
  }
`
