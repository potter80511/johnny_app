// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RawYoutubePlayListsResponse } from 'src/features/pringpringcats/types/net'

const playlistsHandler = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const playListsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.YOUTUBE_API_ACCESS_KEY}&part=snippet,contentDetails&channelId=UCrfpfIhOA_bH9QJvZNluv9w&hl=zh-tw`,
    )
    const rawPlayListItemsData = await playListsResponse.json() as RawYoutubePlayListsResponse
    res.json({ data: rawPlayListItemsData })
  } catch (error) {
    throw (error)
  }
}

export default playlistsHandler
