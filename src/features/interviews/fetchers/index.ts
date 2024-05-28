import { RawInterview, RawInterviewOptions } from 'src/features/interviews/types/net/RawInterview';
import { createInterviewsFromNet, createInterviewsOpitonsToNet, createInterviewsPayloadToNet } from 'src/features/interviews/factories';
import { InterviewOptions, InterviewPayload } from 'src/features/interviews/types';

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

export const createInterview = async (payload: InterviewPayload) => {
  const requestBody = createInterviewsPayloadToNet(payload)
  try {
    const response = await fetch(`/api/interviews/create`, { method: 'POST', body: JSON.stringify(requestBody) })
    const rawResponseData: APIResponse<RawInterview> = await response.json()

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

export const updateInterviewById = async (id: number, payload: InterviewOptions) => {
  const requestBody = createInterviewsOpitonsToNet(payload)
  try {
    const response = await fetch(`/api/interviews/${id}`, { method: 'PUT', body: JSON.stringify(requestBody) })
    const rawResponseData: APIResponse<RawInterview> = await response.json()

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
