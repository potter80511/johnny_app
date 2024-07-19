import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginUserPayload, RawUser } from 'src/features/common/users/types/net';

const SECRET_KEY = 'your_secret_key'; // 請使用環境變數來存儲你的密鑰

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<{ token: string, user: RawUser } | null>>
) {
  if (req.method === 'POST') {
    const { account, password } = JSON.parse(req.body) as LoginUserPayload;

    if (!account || !password) {
      res.status(400).json({
        message: 'Email and password are required',
        success: false,
        data: null
      });
      return;
    }

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [account]);
      connection.release();

      if (!Array.isArray(rows) || rows.length === 0) {
        res.status(401).json({
          message: '找不到此帳號',
          success: false,
          data: null
        });
        return;
      }

      const user = rows[0] as RawUser;
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          message: '密碼不正確',
          success: false,
          data: null
        });
        return;
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        account: user.account,
      }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful',
        success: true,
        data: { token, user:  user},
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({
        success: false,
        message: 'Error logging in user',
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
