import { useState } from 'react';
import { fetchInterviews, updateInterviewById } from 'src/features/interviews/fetchers';
import { Interview, InterviewOptions } from 'src/features/interviews/types';

const useInterviews = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  const [listLoading, setListLoading] = useState(false)
  console.log(interviewList, 'interviewList')

  const getInterviews = async () => {
    try {
      setListLoading(true)
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {} finally {
      setListLoading(false)
    }
  }

  const handleUpdateInterview = async (id: number, payload: InterviewOptions) => {
    try {
      await updateInterviewById(id, payload)
      await getInterviews()
    } catch {}
  }

  return {
    listLoading,
    interviewList,
    getInterviews,
    handleUpdateInterview
  }
}

export default useInterviews
