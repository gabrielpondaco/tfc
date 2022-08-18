import { Router } from 'express';
import teamsController from '../controller/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.listTeams);

export default teamsRouter;
