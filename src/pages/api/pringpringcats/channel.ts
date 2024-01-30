// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

const channel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDrvBbitoDXcIHklICoeE6w_guJrwotF0k&id=UCrfpfIhOA_bH9QJvZNluv9w&part=snippet,contentDetails,statistics',
    )
    const rawData = await response.json()
    res.json({ data: rawData })
  } catch (error) {
    throw (error)
  }
}

export default channel
