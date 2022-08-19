import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';
import teamsService from '../services/teamsService';

const leaderboardController = {
  async homeLeaderboard(req: Request, res: Response) {
    const teamsList = await teamsService.findAll();
    const homeLeaderboard = await Promise.all(teamsList.map(async (team) => {
      const matchesList = await leaderboardService.findHomeMatches(team.id);
      const leaderBoard = leaderboardService.createLeaderBoardHome(matchesList, team?.teamName);
      return leaderBoard;
    }))
    const sortedLeaderboard = await leaderboardService.sortLeaderboardArray(homeLeaderboard);
    return res.status(200).json(sortedLeaderboard);
  }
};

export default leaderboardController;
