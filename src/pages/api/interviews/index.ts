import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';
import { RawInterview } from 'src/features/interviews/types/net/RawInterview';

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RawInterview[]>>
) => {
  const connection = await pool.getConnection();

  if (req.method === 'GET') {
    try {
      const [rows] = await connection.query('SELECT * FROM interviews');
      res.status(200).json({data: rows as RawInterview[], success: true})
    } catch (error) {
      res.status(500).json({ success: false, message: `Fetching interviews error: ${error}`, data: [] });
    } finally {
      connection.release();
    }
  }
}

export default interviews
