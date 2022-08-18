import { NextFunction, Request, Response } from 'express';
import teamsService from '../services/teamsService';

const teamsController = {
  async listTeams(req: Request, res:Response, _next: NextFunction) {
    const teamsList = await teamsService.findAll();
    return res.status(200).json(teamsList);
  },

  async getById(req: Request, res:Response) {
    const { id } = req.params;
    const team = await teamsService.getById(Number(id));
    return res.status(200).json(team);
  }
};

export default teamsController;
