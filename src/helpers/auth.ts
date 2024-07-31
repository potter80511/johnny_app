import jwt from 'jsonwebtoken';

const secretKey = process.env.JWTOKEN_SECRET_KEY || ''

export function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
