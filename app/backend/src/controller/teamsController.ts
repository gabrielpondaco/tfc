import { NextFunction, Request, Response } from 'express';
import teamsService from '../services/teamsService';

const teamsController = {
  async listTeams(req: Request, res:Response, _next: NextFunction) {
    const teamsList = await teamsService.findAll();
    return res.status(200).json(teamsList);
  },
};

export default teamsController;
