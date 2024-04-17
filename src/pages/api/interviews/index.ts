import type { NextApiRequest, NextApiResponse } from 'next'

const interviews = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    try {
      // const [rows] = await connection.query('SELECT * FROM users');
      res.status(200).json({ name: 'John Doe' })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching interviews' });
    } finally {
      // connection.release();
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
      // connection.release();
    }
  }
}

export default interviews
