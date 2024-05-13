import React, { useEffect, useMemo, useState } from 'react';
import { fetchInterviews } from 'src/features/interviews/fetchers';
import { Interview } from 'src/features/interviews/types';
import Table, { TableData, TableHeadData } from 'src/features/interviews/components/Table';
import { statusOptions } from './constants';
import SelectOptions from 'src/features/interviews/components/SelectOptions';
import { InterviewStatus } from 'src/features/interviews/enum';

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

  const handleChangeStatus = (newValue: InterviewStatus) => {}


  const tableData: TableData = useMemo(() => {
    return interviewList.map((item) => {
      return {
        ...item,
        status: <SelectOptions
          id="InterviewStatusSelect"
          defaultValue={item.status}
          options={statusOptions}
          onChange={(newValue) => handleChangeStatus(newValue as InterviewStatus)}
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
    <Table data={tableData} tableHeadData={tableHeadData} />
  </div>
}

export default InterviewsIndex
