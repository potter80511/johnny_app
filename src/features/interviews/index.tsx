import React, { useEffect, useMemo, useState } from 'react';
import { fetchInterviews } from 'src/features/interviews/fetchers';
import { Interview } from 'src/features/interviews/types';
import Table, { TableData, TableHeadData } from 'src/features/interviews/components/Table';
import { statusOptions } from './constants';
import Board from 'src/components/Board';
import StatusOptionsContainer from 'src/features/interviews/components/StatusOptionsContainer';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

type TableKeyType = keyof Pick<Interview, 'companyName' | 'rejectReason' | 'status' | 'currentTestLevel' | 'interviewFlow'> | 'edit'

const tableHeadData: TableHeadData<TableKeyType> = {
  companyName: {
    headTitle: '公司名稱'
  },
  rejectReason: {
    headTitle: '回絕原因',
  },
  interviewFlow: {
    headTitle: '流程'
  },
  currentTestLevel: {
    headTitle: '當前關卡'
  },
  status: {
    headTitle: '狀態',
    width: 100
  },
  edit: {
    headTitle: '',
    width: 30,
    align: 'center'
  }
}

const EditButton = styled.button`
  svg {
    color: white;
  }
`

const InterviewsIndex = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  console.log(interviewList, 'interviewList')
  
  const getInterviews = async () => {
    try {
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {}
  }


  const tableData: TableData<TableKeyType> = useMemo(() => {
    return interviewList.map((item) => {
      return {
        ...item,
        status: <StatusOptionsContainer
          id="InterviewStatusSelect"
          defaultValue={item.status}
          options={statusOptions}
          optionsMenuStyle={{ minWidth: 150 }}
        />,
        edit: <EditButton type="button">
          <FontAwesomeIcon icon={faPenToSquare} />
        </EditButton>
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
