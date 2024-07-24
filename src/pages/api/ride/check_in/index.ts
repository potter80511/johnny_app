import pool from '../../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'src/features/common/users/types';
import { ResultSetHeader } from 'mysql2/promise';
import { CreateRideCheckedInPayload, RawRideCheckedInData } from 'src/features/ride_check_in/types/net';
import { verifyToken } from 'src/helpers/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<RawRideCheckedInData | RawRideCheckedInData[] | null>>
) {
  const connection = await pool.getConnection();
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Token not provided',
      success: false,
      data: null,
      status_code: 401
    });
  }

  try {
    // 驗證 token 並獲取使用者資訊
    const decoded = await verifyToken(token) as User;
    if(req.method === 'GET'){

      try {
        const [rows] = await connection.execute('SELECT * FROM ride_check_in WHERE user_id = ?', [decoded.id]);

        res.status(200).json({
          data: rows as RawRideCheckedInData[],
          success: true,
          message: 'Get RideCheckedInData success!',
          status_code: 200
        })
      } catch(error: any) {
        res.status(500).json({
          message: error.message,
          success: false,
          data: null,
          status_code: 500
        });
      }
    } else if (req.method === 'POST') {
      const requestBody = JSON.parse(req.body) as CreateRideCheckedInPayload;

      try {
        const insertQueryPayload = {
          ...requestBody,
          user_id: decoded.id
        }
  
        // 插入打卡記錄到資料庫
        const fieldKeys: string[] = Object.keys(insertQueryPayload)
        const values = Object.values(insertQueryPayload)
        const insertQuery = `INSERT INTO ride_check_in (${fieldKeys.join(', ')}) VALUES (${fieldKeys.map((_) => '?').join(', ')})`;
  
        const [result] = await connection.execute<ResultSetHeader>(insertQuery, [...values]);
        const [rows] = await connection.execute('SELECT * FROM ride_check_in WHERE id = ?', [result.insertId]);
  
        const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawRideCheckedInData : null
        
        const statusCode = 200
        res.status(statusCode).json({
          success: true,
          message: 'Check in successfully',
          data,
          status_code: statusCode
         });
      } catch (error: any) {
        res.status(500).json({
          message: error.message as string,
          success: false,
          data: null,
          status_code: 500
         });
      } finally {
        connection.release();
      }
    } else {
      const statusCode = 405
      res.status(statusCode).json({
        success: false,
        message: 'Method not allowed',
        data: null,
        status_code: statusCode
      });
    }
  } catch {
    res.status(401).json({
      message: 'Token verification failed',
      success: false,
      data: null,
      status_code: 401
    });
  }
}
