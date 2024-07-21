// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PringPringCatsVideosPayload } from 'src/features/pringpringcats/types/net'
import { RawYoutubePlayListItemsResponse, RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net'
import { getAPIQueryStringByOption } from 'src/helpers/fetch'

const videosHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const qureyOptions = getAPIQueryStringByOption<
      PringPringCatsVideosPayload & {
        key: string;
        part: string[];
        playlistId: string;
        maxResults: number;
      }>({
        ...req.query as PringPringCatsVideosPayload,
        key: process.env.YOUTUBE_API_ACCESS_KEY || '',
        part: ['contentDetails'],
        playlistId: 'UUrfpfIhOA_bH9QJvZNluv9w',
        maxResults: 12
      })

    const playListItemsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems${qureyOptions}`,
    )
    const rawPlayListItemsData = await playListItemsResponse.json() as RawYoutubePlayListItemsResponse
    const videoIds = rawPlayListItemsData.items.map(({contentDetails}) => contentDetails.videoId)

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_ACCESS_KEY}&part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&hl=zh-tw`,
    )
    const rawVideosData = await videosResponse.json() as RawYoutubeVideoResponse
    res.json({ data: { ...rawVideosData, nextPageToken: rawPlayListItemsData.nextPageToken } })
  } catch (error) {
    console.log(error, 'error')
    throw (error)
  }
}

export default videosHandler
