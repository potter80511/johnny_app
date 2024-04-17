import { RawInterview } from 'src/features/interviews/types/net/RawInterview';
import { createInterviewsFromNet } from 'src/features/interviews/factories';

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
