import { Router } from 'express';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.listMatches);
export default matchesRouter;
