import { styled } from "styled-components"
import { lineCamp } from "src/styles/Styled"

export const Description = styled.pre<{ $lineCount?: number }>`
  ${lineCamp}
  white-space: pre-wrap;
  a {
    color: #3ea6ff !important;
  }
`
