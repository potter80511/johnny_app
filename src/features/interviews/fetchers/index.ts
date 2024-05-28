import { RawInterview, RawInterviewOptions } from 'src/features/interviews/types/net/RawInterview';
import { createInterviewsFromNet, createInterviewsOpitonsToNet } from 'src/features/interviews/factories';
import { InterviewOptions } from '../types';

export const fetchInterviews = async () => {
  try {
    const response = await fetch('/api/interviews')
    const rawResponseData: APIResponse<RawInterview[]> = await response.json()

    if(rawResponseData.success) {
      return createInterviewsFromNet(rawResponseData.data)
    } else {
      throw new Error(rawResponseData.message)
    }
  } catch(error) {
    console.log(error)
    throw error
  }
}

export const updateInterviewById = async (id: number, payload: InterviewOptions) => {
  const requestBody = createInterviewsOpitonsToNet(payload)
  try {
    const response = await fetch(`/api/interviews/${id}`, { method: 'PUT', body: JSON.stringify(requestBody) })
    const rawResponseData: APIResponse<RawInterview> = await response.json()
    console.log(rawResponseData, 'rawResponseData');

    if(rawResponseData.success) {
      return rawResponseData.data
    } else {
      throw new Error(rawResponseData.message)
    }
  } catch(error) {
    console.log(error)
    throw error
  }
}