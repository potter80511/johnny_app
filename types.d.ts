declare module 'react-click-n-hold'

type APIStatusCode = 200 | 201 | 401 | 400 | 405 | 500

type APIResponse<Data = any> = {
  message: string
  success: boolean
  data: Data
  status_code: APIStatusCode
}

type ErrorType = 'error' | 'warning'
type ErrorOutput = {
  message: string
  type: ErrorType
}

type Callback<OutputData> = {
  onSuccess: (data: OutputData) => void
  onError: (error: ErrorOutput) => void
}

type Fetcher<OutputData, InputData = any> = (
  params: {
    inputData: InputData;
    callBack: Callback<OutputData>
  }
) => Promise<void>

type APIResponse<Data = any> = {
  message?: string
  success: boolean
  data: Data
}
