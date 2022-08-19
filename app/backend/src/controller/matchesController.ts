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
    await matchesService.validateTeams(req.body);
    const newMatch = await matchesService.add(req.body);
    return res.status(201).json(newMatch);
  },

  async finishMatch(req: Request, res: Response ) {
    const { id } = req.params;
    await matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: "Finished" });
  },

  async update(req: Request, res: Response ) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesService.update(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'updated' });
  }

};

export default matchesController;
