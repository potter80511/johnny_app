import React, { useEffect, useState } from 'react';
import { fetchInterviews } from 'src/features/interviews/fetchers';
import { Interview } from 'src/features/interviews/types';

const InterviewsIndex = () => {
  const [interviewList, setInterviewList] = useState<Interview[]>([])
  console.log(interviewList, 'interviewList')
  
  const getInterviews = async () => {
    try {
      const interviews = await fetchInterviews()
      setInterviewList(interviews)
    } catch {}
  }

  useEffect(() => {
    getInterviews()
  }, [])

  return <div>InterviewsIndex</div>
}

export default InterviewsIndex
