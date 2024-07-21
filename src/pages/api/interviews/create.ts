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

    const { interview_flow, current_test_level,...restRequestBody } = requestBody

    try {
      const fieldKeys: string[] = Object.keys(restRequestBody)
      const values = Object.values(restRequestBody)
  
      const insertQuery =
        `INSERT INTO interviews (${fieldKeys.join(', ')}, interview_flow, current_test_level, created_date) VALUES (${fieldKeys.map((_) => '?').join(', ')}, JSON_ARRAY(${interview_flow?.map((fow) => `'${fow}'`).join(', ')}), 0, NOW())`

      const [result] = await connection.execute<ResultSetHeader>(insertQuery, [...values]);
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [result.insertId]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      const statusCode = 201
      res.status(statusCode).json({
        success: true,
        message: `Interview created successfully`,
        data,
        status_code: statusCode
      });

    } catch (error) {
      const statusCode = 500
      res.status(statusCode).json({
        success: false,
        message: 'Update interview by id error:' + error,
        data: null,
        status_code: statusCode
      });
    } finally {
      connection.release();
    }
  }
}

export default interviews
