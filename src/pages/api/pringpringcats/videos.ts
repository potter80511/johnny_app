// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RawPringPringCatsPlayListItemsResponse } from 'src/features/pringpringcats/types/net'

const videosHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const playListItemsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_ACCESS_KEY}&part=snippet,contentDetails&playlistId=UUrfpfIhOA_bH9QJvZNluv9w&maxResults=50`,
    )
    const rawPlayListItemsData = await playListItemsResponse.json() as RawPringPringCatsPlayListItemsResponse
    console.log(rawPlayListItemsData, 'rawPlayListItemsData')
    const videoIds = rawPlayListItemsData.items.map(({contentDetails}) => contentDetails.videoId)

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_ACCESS_KEY}&part=snippet,contentDetails&id=${videoIds.join(',')}&hl=zh-tw`,
    )
    const rawVideosData = await videosResponse.json()
    res.json({ data: rawVideosData })
  } catch (error) {
    throw (error)
  }
}

export default videosHandler
