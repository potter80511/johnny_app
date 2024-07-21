import bcrypt from 'bcrypt';
import pool from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'src/features/common/users/types';
import { RawUser, RegisterUserPayload } from 'src/features/common/users/types/net';
import { ResultSetHeader } from 'mysql2/promise';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<User | null>>
) {
  const requestBody = JSON.parse(req.body) as RegisterUserPayload;
  if (req.method === 'POST') {
    const { username, email, password } = requestBody;

    if (!username || !email || !password) {
      const statusCode = 400
      res.status(statusCode).json({
        message: 'All fields are required',
        success: false,
        data: null,
        status_code: statusCode
      });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const connection = await pool.getConnection();

      const insertQueryPayload = {
        ...requestBody,
        password: hashedPassword,
        account: email
      }

      const fieldKeys: string[] = Object.keys(insertQueryPayload)
      const values = Object.values(insertQueryPayload)
      const insertQuery = `INSERT INTO users (${fieldKeys.join(', ')}) VALUES (${fieldKeys.map((_) => '?').join(', ')})`;

      const [result] = await connection.execute<ResultSetHeader>(insertQuery, [...values]);
      connection.release();
      
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

      const data = Array.isArray(rows) && rows.length > 0 ? rows[0] as RawUser : null

      const statusCode = 201
      res.status(statusCode).json({
        success: true,
        message: 'User registered successfully',
        data,
        status_code: statusCode
       });
    } catch (error) {
      const statusCode = 500
      res.status(statusCode).json({
        success: false,
        message: 'Error registering user:' + error,
        data: null,
        status_code: statusCode
      });
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
}
