import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'src/features/common/users/types';

const SECRET_KEY = 'your_secret_key'; // 請使用環境變數來存儲你的密鑰

function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<User | null>>
) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      const statusCode = 401
      res.status(statusCode).json({
        message: 'No token provided',
        success: false,
        data: null,
        status_code: statusCode
      });
      return;
    }

    try {
      const decoded = await verifyToken(token) as User;
      const statusCode = 200
      res.status(statusCode).json({
        message: 'Login token verified Success!',
        success: true,
        status_code: statusCode,
        data: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          account: decoded.account,
        }
      });
    } catch (error) {
      const statusCode = 401
      console.error('Error verifying token:', error);
      res.status(statusCode).json({
        message: 'Invalid token',
        success: false,
        data: null,
        status_code: statusCode
      });
    }
  } else {
    const statusCode = 401
    res.status(statusCode).json({
      message: 'Method not allowed',
      success: false,
      data: null,
      status_code: statusCode
    });
  }
}
