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
      res.status(400).json({
        message: 'All fields are required',
        success: false,
        data: null
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

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data,
       });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error registering user:' + error,
        data: null
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: null
    });
  }
}
