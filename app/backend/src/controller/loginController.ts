import { NextFunction, Request, Response } from 'express';
import authService from '../services/authService';
import loginService from '../services/loginService';
import { NotFoundError, ValidationError } from '../errors';

const loginController = {
  async login(req: Request, res:Response, _next: NextFunction) {
    await loginService.validateBody(req.body);
    const userExists = await loginService.findUser(req.body.email);
    if (!userExists) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = await authService.createToken(req.body);
    return res.status(200).json({ token });
  },

  async validate(req: Request, res:Response) {
      const token = req.headers.authorization;
      if (!token) throw new ValidationError('Token not found');
      const { data: { email } } = await authService.validateToken(token);
      const user = await loginService.findUser(email);
      if(!user) throw new NotFoundError('User not found');
      return res.status(200).json({ role: user.role });
  }
};

export default loginController;
