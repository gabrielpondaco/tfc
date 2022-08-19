import { NextFunction, Request, Response } from 'express';
import matchesService from '../services/matchesService';

const matchesController = {
  async listMatches(req: Request, res:Response, _next: NextFunction) {
    const matchesList = await matchesService.findAll();
    return res.status(200).json(matchesList);
  },

};

export default matchesController;
