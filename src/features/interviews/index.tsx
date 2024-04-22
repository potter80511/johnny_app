import React, { useEffect, useMemo, useState } from 'react';
import { fetchInterviews } from 'src/features/interviews/fetchers';
import { Interview } from 'src/features/interviews/types';
import Table, { TableProps } from 'src/features/interviews/components/Table';

const InterviewsIndex = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  console.log(interviewList, 'interviewList')
  
  const getInterviews = async () => {
    try {
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {}
  }

  // const tableData: TableProps = useMemo(() => {
  //   const headTitlteData: { [key: keyof Interview]: string } = {
  //     companyName: '公司名稱',
  //     rejectReason: '公司名稱',
  //   }
  //   return {
  //     columns: interviewList.map(({companyName}) => {
  //       return {

  //       }
  //     })
  //   }
  // }, [interviewList])

  useEffect(() => {
    getInterviews()
  }, [])

  return <div>
    <h2>Interviews</h2>
    <Table data={interviewList} />
  </div>
}

export default InterviewsIndex
