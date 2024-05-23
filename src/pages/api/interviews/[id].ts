import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';
import { RawInterview, RawInterviewOptions } from 'src/features/interviews/types/net/RawInterview';

const handleInterviewById = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RawInterview | null>>
) => {
  const connection = await pool.getConnection();

  if (req.method === 'PUT') {
    const { id } = req.query
    const { status, reject_reason } = JSON.parse(req.body) as RawInterviewOptions;
    try {
      await connection.query('UPDATE interviews SET status = ?, reject_reason = ?,  updated_date = NOW() WHERE id = ?', [status, reject_reason, id]);
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [id]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      res.status(200).json({ success: true, message: `Interview updated successfully`, data });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Update interview by id error:' + error, data: null });
    } finally {
      connection.release();
    }
  }
}

export default handleInterviewById
