// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type YoutubeResponse = {
  data?: any
  error?: {
    code: number
    message: string
    errors: Array<any>
    status: 'PERMISSION_DENIED'
  }
}

const channel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${process.env.YOUTUBE_API_ACCESS_KEY}&id=UCrfpfIhOA_bH9QJvZNluv9w&part=snippet,contentDetails,statistics,brandingSettings,localizations&hl=zh-tw`,
    )
    const rawData = await response.json() as YoutubeResponse
    if(rawData.error) {
      const { code, message, status } = rawData.error
      res.status(code).json({ success: false, message, status })
    }
    res.json({ success: true, data: rawData, message: 'fetch PringPringCats channel success' })
  } catch (error) {
    console.log(`channel:${error}`)
  }
}

export default channel
