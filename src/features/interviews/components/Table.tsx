import { ReactNode } from 'react';
import { TableWrapper, TbodyTr, Td, Th } from 'src/features/interviews/Styles';

type TableFieldBase<KeyName extends string> = Record<KeyName, ReactNode>

type TableField<KeyName extends string> = TableFieldBase<KeyName> & {
  id: number | string
}

export type TableData<KeyName extends string> = Array<TableField<KeyName>>

type ColumnBase = {
  headTitle: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

export type TableHeadData<KeyName extends string> = Record<KeyName, ColumnBase>

export type TableProps = {
  tableHeadData: TableHeadData<string>
  data: TableData<string>
}

const Table = (props: TableProps) => {
  const { data, tableHeadData } = props
  
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
          {columns.map(({fieldKey, width, align}) => {
            return <Td
              key={`table-td-${fieldKey}`}
              style={{width, textAlign: align}}
            >{item[fieldKey]}</Td>
          })}
        </TbodyTr>
      })}
    </tbody>
  </TableWrapper>
}

export default Table
