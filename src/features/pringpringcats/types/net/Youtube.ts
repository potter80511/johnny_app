export type YoutubeResponse<Data = any> = {
  data?: Data
  error?: {
    code: number
    message: string
    errors: Array<any>
    status: 'PERMISSION_DENIED'
  }
}
