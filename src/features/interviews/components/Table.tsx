import { ReactNode } from 'react';
import { Interview } from 'src/features/interviews/types';

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
  return <table>
    <thead>
      <tr>{columns.map(({ headTitle, fieldKey, width, align }) =>
          <th
            key={fieldKey}
            style={{ width, textAlign: align }}
          >{headTitle}
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => {
        return <tr key={item.id}>
          {columns.map(({fieldKey, width}) => {
            return <td key={`table-td-${fieldKey}`} style={{width}}>{item[fieldKey]}</td>
          })}
        </tr>
      })}
    </tbody>
  </table>
}

export default Table
