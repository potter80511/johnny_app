import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginUserPayload, RawUser } from 'src/features/common/users/types/net';
import { Form as LoginFormType } from "src/features/common/Header/UserLogin/LoginForm"

const SECRET_KEY = 'your_secret_key'; // 請使用環境變數來存儲你的密鑰

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<
    { token: string, user: RawUser } | null,
    Partial<LoginFormType>>
  >
) {
  if (req.method === 'POST') {
    const { account, password } = JSON.parse(req.body) as LoginUserPayload;

    if (!account || !password) {
      const statusCode = 400
      res.status(statusCode).json({
        message: 'Email and password are required',
        success: false,
        data: null,
        status_code: statusCode,
      });
      return;
    }

    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [account]);
      connection.release();

      if (!Array.isArray(rows) || rows.length === 0) {
        const statusCode = 401
        res.status(statusCode).json({
          message: '找不到此帳號',
          success: false,
          data: null,
          status_code: statusCode,
          error: {
            field: {
              email: '找不到此帳號'
            }
          }
        });
        return;
      }

      const user = rows[0] as RawUser;
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const statusCode = 401
        res.status(statusCode).json({
          message: '密碼不正確',
          success: false,
          data: null,
          status_code: statusCode,
          error: {
            field: {
              password: '密碼不正確'
            }
          }
        });
        return;
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        account: user.account,
      }, SECRET_KEY, { expiresIn: '1h' });

      const statusCode = 200
      res.status(statusCode).json({
        message: 'Login successful',
        success: true,
        data: { token, user:  user},
        status_code: statusCode
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      const statusCode = 500
      res.status(statusCode).json({
        success: false,
        message: 'Error logging in user',
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
