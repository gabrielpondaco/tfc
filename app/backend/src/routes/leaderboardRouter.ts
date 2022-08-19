import { Router } from 'express';
import leaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.homeLeaderboard);

export default leaderboardRouter;
