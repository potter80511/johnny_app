import { ReactNode } from 'react';
import { Interview } from 'src/features/interviews/types';
import { TableWrapper, TbodyTr, Td, Th } from 'src/features/interviews/Styles';

type TableField = {
  id: number | string
  [key: string]: ReactNode
}

export type TableData = Array<TableField>

type ColumnBase = {
  headTitle: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

export type TableHeadData = {
  [key: string]: ColumnBase
}

export type TableProps = {
  tableHeadData: TableHeadData
  data: TableData
}

type KeyType = keyof Pick<Interview, 'companyName' | 'rejectReason'>


const Table = (props: TableProps) => {
  const { data, tableHeadData } = props
  console.log(data, 'data')
  
  const columns: Array<ColumnBase & {
    fieldKey: string
  }> = Object.keys(tableHeadData).map((fieldKey) => {
    const currentColumn = tableHeadData[fieldKey]
    return {
      fieldKey,
      headTitle: currentColumn.headTitle,
      width: currentColumn.width,
      align: currentColumn.align || 'left',
    }
  })
  return <TableWrapper>
    <thead>
      <tr>{columns.map(({ headTitle, fieldKey, width, align }) =>
          <Th
            key={fieldKey}
            style={{ width, textAlign: align }}
          >{headTitle}
          </Th>
        )}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => {
        return <TbodyTr key={item.id}>
          {columns.map(({fieldKey, width}) => {
            return <Td key={`table-td-${fieldKey}`} style={{width}}>{item[fieldKey]}</Td>
          })}
        </TbodyTr>
      })}
    </tbody>
  </TableWrapper>
}

export default Table
