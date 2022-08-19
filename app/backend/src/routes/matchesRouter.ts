import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.listMatches);
matchesRouter.post('/', matchesController.add);

export default matchesRouter;
