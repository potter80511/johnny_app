import { ReactNode } from 'react';
import { Interview } from 'src/features/interviews/types';

type TableField = {
  id: number | string
  [key: string]: ReactNode
}

export type TableProps = {
  data: Array<TableField>
}

type KeyType = keyof Pick<Interview, 'companyName' | 'rejectReason'>

type ColumnBase = {
  headTitle: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

type TableHeadData = {
  [key in KeyType]: ColumnBase
}

const Table = (props: TableProps) => {
  const { data } = props
  const tableHeadData: TableHeadData = {
    companyName: {
      headTitle: '公司名稱',
      width: 100
    },
    rejectReason: {
      headTitle: '回絕原因',
    }
  }
  const columns: Array<ColumnBase & {
    fieldKey: string
  }> = Object.keys(tableHeadData).map((fieldKey) => {
    const currentColumn = tableHeadData[fieldKey as KeyType]
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
