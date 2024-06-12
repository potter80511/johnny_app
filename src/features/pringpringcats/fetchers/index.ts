import fetcher from "src/fetcher"
import { RawYoutubePlayListsResponse, RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import { getAPIQueryStringByOption } from "src/helpers/fetch"
import { createYoutubePlaylistsFromNet } from "src/features/pringpringcats/factories"
import { YoutubeList } from "src/features/pringpringcats/types"

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

export const fetchPringPringCatsPlayLists: Fetcher<{data: Array<YoutubeList>}> = async (params) => {
  const { callBack } = params
  try {
    const rawData = await fetcher(`/pringpringcats/playlists`) as {data: RawYoutubePlayListsResponse}
    callBack.onSuccess({data: createYoutubePlaylistsFromNet(rawData.data)})
  } catch(error) {
    callBack.onError(error)
  }
}
