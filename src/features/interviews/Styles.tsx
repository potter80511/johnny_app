import styled, { css } from 'styled-components'

export const TableWrapper = styled.table`
  background: #171717;
  padding: 16px 0;
  border-collapse: collapse; 
`
export const TbodyTr = styled.tr`
  transition: all .3s;
  border-top: 1px solid #272C34;
  padding: 4px 0;
  &:hover {
    background-color: #272C34;
  }
`
const baseCell = css`
  padding: 8px;
`
export const Th = styled.th`
  ${baseCell};
`
export const Td = styled.td`
  ${baseCell};
`
