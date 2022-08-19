import { Request, Response } from 'express';
import matchesService from '../services/matchesService';
import leaderboardService from '../services/leaderboardService';
import teamsService from '../services/teamsService';

const leaderboardController = {
  async leaderboard(req: Request, res: Response) {
    const teamsList = await teamsService.findAll();
    const leaderboard = await Promise.all(teamsList.map(async (team) => {
      if (req.url.includes('home')) {
        const matchesList = await leaderboardService.findHomeMatches(team.id);
        const leaderBoard = leaderboardService.createLeaderBoardHome(matchesList, team?.teamName)
        return leaderBoard;
      }
      if (req.url.includes('away')) {
        const matchesList = await leaderboardService.findAwayMatches(team.id);
        const leaderBoard = leaderboardService.createLeaderBoardAway(matchesList, team?.teamName);
        return leaderBoard;
      }
      const homeMatchesList = await leaderboardService.findHomeMatches(team.id);
      const leaderBoardHome = await leaderboardService.createLeaderBoardHome(homeMatchesList, team?.teamName)
      const awayMatchesList = await leaderboardService.findAwayMatches(team.id);
      const leaderBoardAway = await leaderboardService.createLeaderBoardAway(awayMatchesList, team?.teamName);
      const genericLeaderboard = await leaderboardService.groupLeaderboards(leaderBoardHome, leaderBoardAway);
      return genericLeaderboard;
    }))
    const sortedLeaderboard = await leaderboardService.sortLeaderboardArray(leaderboard);
    return res.status(200).json(sortedLeaderboard);
  }
};

export default leaderboardController;
