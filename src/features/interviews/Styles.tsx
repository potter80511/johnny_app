import styled, { css } from 'styled-components'

export const TableWrapper = styled.table`
  background: #171717;
  padding: 16px 0;
  border-collapse: collapse;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  width: 100%;
`
export const TbodyTr = styled.tr`
  transition: all .3s;
  border-top: 1px solid #3e444e;
  padding: 4px 0;
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
