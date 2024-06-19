import styled, { css } from 'styled-components';

export const CommonWrap = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`

export const lineCamp = css<{ $lineCount?: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $lineCount = 1 }) => $lineCount};
  -webkit-box-orient: vertical;
  overflow: hidden;
`
