declare module 'react-click-n-hold'

type Callback<RawData> = {
  onSuccess: (data?: RawData) => void
  onError: (error: any) => void
}

type Fetcher<RawData, Payload = any> = (params: {payload?: Payload, callBack: Callback<RawData>}) => Promise<void>
