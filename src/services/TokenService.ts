import jwt from 'jsonwebtoken';

interface Payload {
  username: string;
  phone_number: string,
  address: string,
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export default class TokenService {
  public generateToken(payload: Payload): string {
    console.log("SECRET_KEY TokenService", JWT_SECRET)
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}
