// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RawYoutubeSearchResponse, RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net'
import { getAPIQueryStringByOption } from 'src/helpers/fetch'

const topFiftyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RawYoutubeVideoResponse | null>>
) => {
  try {
    const qureyOptions = getAPIQueryStringByOption<{
        key: string;
        channelId: string;
        maxResults: number;
        order: 'viewCount';
      }>({
        key: process.env.YOUTUBE_API_ACCESS_KEY || '',
        channelId: 'UCrfpfIhOA_bH9QJvZNluv9w',
        maxResults: 50,
        order: 'viewCount'
      })

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search${qureyOptions}`,
    )
    const serachResponseData = await searchResponse.json() as RawYoutubeSearchResponse
    const videoIds = serachResponseData.items.map(({id}) => id.videoId)

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_ACCESS_KEY}&part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&hl=zh-tw`,
    )
    const rawVideosData = await videosResponse.json() as RawYoutubeVideoResponse
    res.json({
      data: rawVideosData,
      message: 'fetch topFifty success',
      success: true
    })
  } catch (error) {
    console.log(error, 'error')
    res.json({
      data: null,
      message: String(error),
      success: false
    })
  }
}

export default topFiftyHandler
