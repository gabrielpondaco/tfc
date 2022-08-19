import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.listMatches);
matchesRouter.post('/', matchesController.add);
matchesRouter.patch('/:id/', matchesController.update);
matchesRouter.patch('/:id/finish', matchesController.finishMatch);


export default matchesRouter;
