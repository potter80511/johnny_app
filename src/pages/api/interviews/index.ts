import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const connection = await pool.getConnection();

  if (req.method === 'GET') {
    try {
      const [rows] = await connection.query('SELECT * FROM interviews');
      res.status(200).json({data: rows, success: true})
    } catch (error) {
      res.status(500).json({ success: false, message: 'Fetching interviews error' });
    } finally {
      connection.release();
    }
  }

  if (req.method === 'POST') {
    const { name, age } = req.body;

    try {
      // await connection.query('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
      res.status(200).json({ message: 'Interview added successfully', success: true });
    } catch (error) {
      res.status(500).json({ message: 'Adding interviews error', success: false });
    } finally {
      connection.release();
    }
  }
}

export default interviews
