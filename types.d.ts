declare module 'react-click-n-hold'

type APIStatusCode = 200 | 201 | 401 | 400 | 405 | 500

type APIResponse<Data = any, ErrorField = {}> = {
  message: string
  success: boolean
  data: Data
  status_code: APIStatusCode
  error?: {
    field: ErrorField
  }
}

type ErrorType = 'error' | 'warning'
type ErrorOutput<Field = {}> = {
  message: string
  type: ErrorType
  field?: Field
}

type Callback<OutputData, ErrorField = {}> = {
  onSuccess: (data: OutputData) => void
  onError: (error: ErrorOutput<ErrorField>) => void
}

type FetcherWithCallBack<OutputData, InputData = any, ErrorField = {}> = (
  params: {
    inputData: InputData;
    callBack: Callback<OutputData, ErrorField>
  }
) => Promise<void>
