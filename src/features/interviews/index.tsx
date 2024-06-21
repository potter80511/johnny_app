import React, { ReactNode, useEffect, useMemo, useState } from 'react';
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
import { DialogInfoName } from 'src/features/interviews/enum';
import EditDeleteTools from 'src/components/EditDeleteTools';

const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 16px;
`

const defaultDialogData: {
  isOpen: boolean;
  id: number;
  formName: DialogInfoName;
} = {
  isOpen: false,
  id: 0,
  formName: DialogInfoName.CreateInterview
}

const InterviewsIndex = () => {
  const [dialogData, setDialogData] = useState(defaultDialogData)
  
  const {
    listLoading,
    interviewList,
    getInterviews,
    handleCreateInterview,
    handleUpdateInterview,
    handlDeleteInterview
  } = useInterviews()

  const handleCloseDialogData = () => setDialogData({...dialogData, isOpen: false})

  const tableData: TableData<TableKeyType> = useMemo(() => {
    return interviewList.map((item) => {
      return {
        ...item,
        interviewFlow: item.interviewFlow?.join(' > '),
        status: <StatusOptionsContainer
          id={item.id}
          componentName="InterviewStatusSelect"
          defaultValue={item.status}
          options={statusOptions}
          optionsMenuStyle={{ minWidth: 150 }}
          onOpenDialog={() => setDialogData({
            id: item.id,
            isOpen: true,
            formName: DialogInfoName.RejectReason
          })}
        />,
        editDelete: <EditDeleteTools
          deleteProps={{
            onClick: () => setDialogData({
              id: item.id,
              isOpen: true,
              formName: DialogInfoName.DeleteInterview
            }),
            color: '#f50057'
          }}
          editProps={{onClick: () => {}}}
        />
      }
    })
  }, [interviewList])

  const boardContentDisplay = useMemo(() => {
    return listLoading
      ? <Loading size={24}/>
      : <div>
          <ButtonWrapper>
            <Button variant="outlined" onClick={() => setDialogData({
              id: 0,
              isOpen: true,
              formName: DialogInfoName.CreateInterview
            })}>
              <FontAwesomeIcon icon={faPlus} size="xs" style={{marginRight: 4}} />
              新增
            </Button>
          </ButtonWrapper>
          <Table data={tableData} tableHeadData={tableHeadData} />
        </div>
  }, [listLoading, tableData])

  const dialogFormInfo: {
    [key in DialogInfoName]: {
      title: string;
      form: ReactNode;
      dialogSubmit?: {
        onSubmit: () => void
        text: string
      }
    }
  } = useMemo(() => {
    const currentComponayName = interviewList.find((item) => item.id === dialogData.id)?.companyName || ''
    return {
      [DialogInfoName.RejectReason]: {
        title: '請填寫回絕原因',
        form: <RejectReasonsForm
          onSubmit={(reasons) => {
            handleUpdateInterview(dialogData.id, { rejectReason: reasons })
            handleCloseDialogData()
          }}
        />
      },
      [DialogInfoName.CreateInterview]: {
        title: '新增面試資料',
        form: <CreateInterviewForm
          onSubmit={(formData) => {
            handleCreateInterview({ ...formData, userId: 1 })
            handleCloseDialogData()
          }}
        />
      },
      [DialogInfoName.DeleteInterview]: {
        title: `確定要刪除${currentComponayName}的面試資料嗎？`,
        form: null,
        dialogSubmit: {
          onSubmit: () => handlDeleteInterview(dialogData.id),
          text: '刪除'
        }
      },
    }
  }, [dialogData, interviewList])

  useEffect(() => {
    getInterviews()
  }, [])

  return <div>
    <h2>Interviews</h2>
    <Board title="Records">
      {boardContentDisplay}
    </Board>
    <AlertDialogSlide
      title={dialogFormInfo[dialogData.formName].title}
      isDialogOpen={dialogData.isOpen}
      shouldHideButtons={!dialogFormInfo[dialogData.formName].dialogSubmit}
      onYes={dialogFormInfo[dialogData.formName].dialogSubmit?.onSubmit}
      yesText={dialogFormInfo[dialogData.formName].dialogSubmit?.text}
      onClose={handleCloseDialogData}
    >
      {dialogFormInfo[dialogData.formName].form}
    </AlertDialogSlide>
  </div>
}

export default InterviewsIndex
