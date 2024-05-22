import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';
import { RawInterview } from 'src/features/interviews/types/net/RawInterview';

const handleInterviewById = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const connection = await pool.getConnection();

  if (req.method === 'PUT') {
    const { id } = req.query
    const { status } = JSON.parse(req.body);
    try {
      const [result] = await connection.query('UPDATE interviews SET status = ? WHERE id = ?', [status, id]);
      res.status(200).json({ success: true, message: `Interview updated successfully`, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Update interview by id error:' + error, data: [] });
    } finally {
      connection.release();
    }
  }
}

export default handleInterviewById
