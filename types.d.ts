declare module 'react-click-n-hold'

type APIResponse<Data = any> = {
  message?: string
  success: boolean
  data: Data
}

type Callback<RawData> = {
  onSuccess: (data: RawData) => void
  onError: (error: any) => void
}

type Fetcher<RawData, Payload = any> = (params: {payload?: Payload, callBack: Callback<RawData>}) => Promise<void>

type APIResponse<Data = any> = {
  message?: string
  success: boolean
  data: Data
}
