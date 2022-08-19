import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors';
import authService from '../services/authService';
import matchesService from '../services/matchesService';

const matchesController = {
  async listMatches(req: Request, res:Response, _next: NextFunction) {
    const { inProgress } = req.query;
    if (inProgress) {
      const inProgressToBool = inProgress === 'true';
      const matchesList = await matchesService.findAllByQuery(inProgressToBool);
      return res.status(200).json(matchesList);
    }
    const matchesList = await matchesService.findAll();
    return res.status(200).json(matchesList);
  },

  async add(req: Request, res:Response, _next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) throw new ValidationError('Token not found');
    await authService.validateToken(token);
    const newMatch = await matchesService.add(req.body);
    return res.status(201).json(newMatch);
  }

};

export default matchesController;
