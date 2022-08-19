import { Router } from 'express';
import leaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.leaderboard);
leaderboardRouter.get('/home', leaderboardController.leaderboard);
leaderboardRouter.get('/away', leaderboardController.leaderboard);

export default leaderboardRouter;
