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
    const requestBody = JSON.parse(req.body) as RawInterviewOptions;

    try {
      const fieldKeys: string[] = []
      const values = []
  
      for(const [key, value] of Object.entries(requestBody)) {
        fieldKeys.push(`${key} = ?`)
        values.push(value)
      }
      await connection.query(`UPDATE interviews SET ${fieldKeys.join(', ')},  updated_date = NOW() WHERE id = ?`, [...values, id]);
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [id]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      const statusCode = 200
      res.status(statusCode).json({
        success: true,
        message: `Interview updated successfully`,
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
  if (req.method === 'PUT') {
    const { id } = req.query
    const requestBody = JSON.parse(req.body) as RawInterviewOptions;

    try {
      const fieldKeys: string[] = []
      const values = []
  
      for(const [key, value] of Object.entries(requestBody)) {
        fieldKeys.push(`${key} = ?`)
        values.push(value)
      }
      await connection.query(`UPDATE interviews SET ${fieldKeys.join(', ')},  updated_date = NOW() WHERE id = ?`, [...values, id]);
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [id]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      const statusCode = 200
      res.status(statusCode).json({
        success: true,
        message: `Interview ${data?.company_name} updated successfully`,
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

  if (req.method === 'DELETE') {
    const { id } = req.query

    try {
      await connection.query('DELETE FROM interviews WHERE id = ?', [id]);
      
      const [rows] = await connection.query('SELECT * FROM interviews WHERE id = ?', [id]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawInterview : null
      const statusCode = 200
      res.status(statusCode).json({
        success: true,
        message: `Interview ${data?.company_name} updated successfully`,
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

  const statusCode = 400
  res.status(statusCode).json({
    success: false,
    message: `Method ${req.method} is not correct`,
    data: null,
    status_code: statusCode
  });
  return;
}

export default handleInterviewById
