import { Interview } from 'src/features/interviews/types';

export type TableProps = {
  data: Array<Interview>
}

type KeyType = keyof Pick<Interview, 'companyName' | 'rejectReason'>

const Table = (props: TableProps) => {
  const { data } = props
  const headTitlteData: { [key in KeyType]: string } = {
    companyName: '公司名稱',
    rejectReason: '回絕原因',
  }
  const columns: Array<{
    fieldKey: string
    headTitle: string
  }> = Object.keys(headTitlteData).map((fieldKey) => {
    return {
      fieldKey,
      headTitle: headTitlteData[fieldKey as KeyType]
    }
  })
  return <table>
    <thead>
      <tr>{columns.map(({ headTitle, fieldKey: filedKey }) => <th key={filedKey}>{headTitle}</th>)}</tr>
    </thead>
    <tbody>
      {data.map((item) => {
        return <tr key={item.id}>
          {columns.map(({fieldKey: filedKey}) => {
            return <td key={`table-td-${filedKey}`}>{item[filedKey as keyof Interview]}</td>
          })}
        </tr>
      })}
    </tbody>
  </table>
}

export default Table
