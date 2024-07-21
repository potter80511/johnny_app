declare module 'react-click-n-hold'

type APIResponse<Data = any> = {
  message: string
  success: boolean
  data: Data
  status_code: 200 | 201 | 401 | 400 | 405 | 500
}

type ErrorOutput = {
  message: string
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
