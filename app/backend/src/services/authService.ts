import { JwtPayload } from 'jsonwebtoken';
import * as Jwt from 'jsonwebtoken';
import { TokenInterface } from '../interfaces';
import { NotFoundError } from '../errors';

const authService = {
  async createToken(payload: JwtPayload) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = Jwt.sign({ data: payload }, secret);
    return token;
  },

  async validateToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const decoded = Jwt.verify(token, secret);    
      return decoded as TokenInterface;
    } catch (error) {
      throw new NotFoundError('Invalid token');
    }
  },
};

export default authService;