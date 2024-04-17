import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../../db';

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const connection = await pool.getConnection();

  if (req.method === 'GET') {
    try {
      const [rows] = await connection.query('SELECT * FROM interviews');
      res.status(200).json(rows)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching interviews' });
    } finally {
      connection.release();
    }
  }

  if (req.method === 'POST') {
    const { name, age } = req.body;

    try {
      // await connection.query('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
      res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding interviews' });
    } finally {
      connection.release();
    }
  }
}

export default interviews
