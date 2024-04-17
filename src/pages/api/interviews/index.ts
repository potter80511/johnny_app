import type { NextApiRequest, NextApiResponse } from 'next'

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    throw (error)
  }
}

export default interviews
