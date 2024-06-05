import { useState } from 'react';
import { fetchInterviews, updateInterviewById, createInterview, deleteInterviewById } from 'src/features/interviews/fetchers';
import { Interview, InterviewOptions, InterviewPayload } from 'src/features/interviews/types';

const useInterviews = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  const [listLoading, setListLoading] = useState(false)

  const getInterviews = async () => {
    try {
      setListLoading(true)
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {} finally {
      setListLoading(false)
    }
  }

  const handleCreateInterview = async (payload: InterviewPayload) => {
    try {
      await createInterview(payload)
      await getInterviews()
    } catch {}
  }

  const handleUpdateInterview = async (id: number, payload: InterviewOptions) => {
    try {
      await updateInterviewById(id, payload)
      await getInterviews()
    } catch {}
  }

  const handlDeleteInterview = async (id: number) => {
    try {
      await deleteInterviewById(id)
      await getInterviews()
    } catch {}
  }

  return {
    listLoading,
    interviewList,
    getInterviews,
    handleCreateInterview,
    handleUpdateInterview,
    handlDeleteInterview
  }
}

export default useInterviews
