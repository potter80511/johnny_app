import React, { useEffect, useMemo, useState } from 'react';
import { TableKeyType } from 'src/features/interviews/types';
import Table, { TableData } from 'src/features/interviews/components/Table';
import { statusOptions, tableHeadData } from 'src/features/interviews/constants';
import Board from 'src/components/Board';
import StatusOptionsContainer from 'src/features/interviews/components/StatusOptionsContainer';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import AlertDialogSlide from 'src/components/mui/AlertDialogSlide';
import RejectReasonsForm from 'src/features/interviews/components/forms/RejectReasonsForm';
import Loading from 'src/components/Loading';
import useInterviews from './hooks';
import { Button } from '@mui/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateInterviewForm from 'src/features/interviews/components/forms/CreateInterviewForm';

const EditButton = styled.button`
  svg {
    color: white;
  }
`
const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 16px;
`

const InterviewsIndex = () => {
  const [dialogData, setDialogData] = useState<{
    isOpen: boolean;
    id: number
  }>({
    isOpen: false,
    id: 0
  })
  
  const {
    listLoading,
    interviewList,
    getInterviews,
    handleCreateInterview,
    handleUpdateInterview
  } = useInterviews()
  

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

  const boardContentDisplay = useMemo(() => {
    return listLoading
      ? <Loading size={24}/>
      : <div>
          <ButtonWrapper>
            <Button variant="outlined">
              <FontAwesomeIcon icon={faPlus} size="xs" style={{marginRight: 4}} />
              新增
            </Button>
          </ButtonWrapper>
          <Table data={tableData} tableHeadData={tableHeadData} />
        </div>
  }, [listLoading, tableData])

  useEffect(() => {
    getInterviews()
  }, [])

  return <div>
    <h2>Interviews</h2>
    <Board title="Records">
      {boardContentDisplay}
    </Board>
    <AlertDialogSlide
      title="請填寫回絕原因"
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
    <AlertDialogSlide
      title="新增面試資料"
      isDialogOpen={true}
      shouldHideButtons
      onClose={handleResetDialogData}
    >
      <CreateInterviewForm
        onSubmit={(companyName) => {
          handleCreateInterview({ companyName })
          handleResetDialogData()
        }}
      />
    </AlertDialogSlide>
  </div>
}

export default InterviewsIndex
