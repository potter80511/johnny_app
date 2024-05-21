import React, { useEffect, useMemo, useState } from 'react';
import { fetchInterviews } from 'src/features/interviews/fetchers';
import { Interview } from 'src/features/interviews/types';
import Table, { TableData, TableHeadData } from 'src/features/interviews/components/Table';
import { statusOptions } from './constants';
import Board from 'src/components/Board';
import StatusOptionsContainer from './components/StatusOptionsContainer';

const tableHeadData: TableHeadData = {
  companyName: {
    headTitle: '公司名稱',
    width: 100
  },
  status: {
    headTitle: '狀態',
  },
  rejectReason: {
    headTitle: '回絕原因',
  }
}

const InterviewsIndex = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  console.log(interviewList, 'interviewList')
  
  const getInterviews = async () => {
    try {
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {}
  }


  const tableData: TableData = useMemo(() => {
    return interviewList.map((item) => {
      return {
        ...item,
        status: <StatusOptionsContainer
          id="InterviewStatusSelect"
          defaultValue={item.status}
          options={statusOptions}
          optionsMenuStyle={{ minWidth: 150 }}
        />
      }
    })
  }, [interviewList])

  useEffect(() => {
    getInterviews()
  }, [])

  return <div>
    <h2>Interviews</h2>
    <Board title="Records">
      <Table data={tableData} tableHeadData={tableHeadData} />
    </Board>
  </div>
}

export default InterviewsIndex
