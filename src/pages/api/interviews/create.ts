import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';
import { RawInterview, RawInterviewPayload } from 'src/features/interviews/types/net/RawInterview';
import { ResultSetHeader } from 'mysql2/promise';

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RawInterview | null>>
) => {
  const connection = await pool.getConnection();
  if (req.method === 'POST') {
    const requestBody = JSON.parse(req.body) as RawInterviewPayload;

    try {
      const fieldKeys: string[] = Object.keys(requestBody)
      const values = Object.values(requestBody)
  
      const insertQuery = `INSERT INTO interviews (${fieldKeys.join(', ')}, created_date) VALUES
      (${fieldKeys.map((_) => '?').join(', ')}, NOW())`
      const [result] = await connection.execute<ResultSetHeader>(insertQuery, [...values]);
      console.log(result, 'result')
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [result.insertId]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      res.status(200).json({ success: true, message: `Interview updated successfully`, data });

    } catch (error) {
      res.status(500).json({ success: false, message: 'Update interview by id error:' + error, data: null });
    } finally {
      connection.release();
    }
  }
}

export default interviews
