import { NextFunction, Request, Response } from 'express';
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

};

export default matchesController;
