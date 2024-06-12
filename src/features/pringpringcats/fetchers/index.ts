import fetcher from "src/fetcher"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"

export const fetchPringPringCatsChannel: Fetcher<string> = async (params) => {
  const { callBack } = params
  try {
    const rawData = await fetcher('/pringpringcats/channel')
    callBack.onSuccess(rawData)
  } catch(error) {
    callBack.onError(error)
  }
}

export const fetchPringPringCatsVideos: Fetcher<{data: RawYoutubeVideoResponse}, { pageToken?: string }> = async (params) => {
  const { payload, callBack } = params
  const options = payload?.pageToken ? `?pageToken=${payload.pageToken}` : ''

  try {
    const rawData = await fetcher(`/pringpringcats/videos${options}`)
    callBack.onSuccess(rawData)
  } catch(error) {
    callBack.onError(error)
  }
}
