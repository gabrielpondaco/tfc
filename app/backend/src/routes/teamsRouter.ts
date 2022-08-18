import { Router } from 'express';
import teamsController from '../controller/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.listTeams);
teamsRouter.get('/:id', teamsController.getById);
export default teamsRouter;
