import fetcher from "src/fetcher"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import { getAPIQueryStringByOption } from "src/helpers/fetch"

export const fetchPringPringCatsChannel: Fetcher<string> = async (params) => {
  const { callBack } = params
  try {
    const rawData = await fetcher('/pringpringcats/channel')
    callBack.onSuccess(rawData)
  } catch(error) {
    callBack.onError(error)
  }
}

export type PringPringCatsVideosPayload = { pageToken?: string }

export const fetchPringPringCatsVideos: Fetcher<{data: RawYoutubeVideoResponse}, PringPringCatsVideosPayload> = async (params) => {
  const { payload, callBack } = params
  const options = getAPIQueryStringByOption(payload)

  try {
    const rawData = await fetcher(`/pringpringcats/videos${options}`)
    callBack.onSuccess(rawData)
  } catch(error) {
    callBack.onError(error)
  }
}
