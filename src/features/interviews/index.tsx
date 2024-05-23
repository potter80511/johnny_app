import React, { useEffect, useMemo, useState } from 'react';
import { fetchInterviews, updateInterviewById } from 'src/features/interviews/fetchers';
import { Interview, InterviewOptions } from 'src/features/interviews/types';
import Table, { TableData, TableHeadData } from 'src/features/interviews/components/Table';
import { statusOptions } from './constants';
import Board from 'src/components/Board';
import StatusOptionsContainer from 'src/features/interviews/components/StatusOptionsContainer';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import AlertDialogSlide from 'src/components/mui/AlertDialogSlide';
import RejectReasonsForm from './components/forms/RejectReasonsForm';

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
  const [dialogData, setDialogData] = useState<{
    isOpen: boolean;
    id: number
  }>({
    isOpen: false,
    id: 0
  })
  console.log(interviewList, 'interviewList')
  
  const getInterviews = async () => {
    try {
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {}
  }

  const handleUpdateInterview = async (id: number, payload: InterviewOptions) => {
    try {
      await updateInterviewById(id, payload)
      await getInterviews()
    } catch {}
  }

  const handleResetDialogData = () => setDialogData({
    id: 0,
    isOpen: false
  })


  const tableData: TableData<TableKeyType> = useMemo(() => {
    return interviewList.map((item) => {
      return {
        ...item,
        status: <StatusOptionsContainer
          id={item.id}
          componentName="InterviewStatusSelect"
          defaultValue={item.status}
          options={statusOptions}
          optionsMenuStyle={{ minWidth: 150 }}
          onOpenDialog={() => setDialogData({
            id: item.id,
            isOpen: true
          })}
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
    <AlertDialogSlide
      title="title"
      isDialogOpen={dialogData.isOpen}
      shouldHideButtons
      onClose={handleResetDialogData}
    >
      <RejectReasonsForm
        onSubmit={(reasons) => {
          handleUpdateInterview(dialogData.id, { rejectReason: reasons })
          handleResetDialogData()
        }}
      />
    </AlertDialogSlide>
  </div>
}

export default InterviewsIndex
