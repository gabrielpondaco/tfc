import * as Joi from 'joi';
import runSchema from '../utils/utils';
import usersModel from '../database/models/user';
import matchesService from './matchesService';
import Match from '../database/models/match';
import { ILeaderboard } from '../interfaces';


const leaderboardService = {

  async findHomeMatches(id: number) {
    const matches = await matchesService.findByHomeTeam(id);
    return matches;
  },

  async findAwayMatches(id: number) {
    const matches = await matchesService.findByAwayTeam(id);
    return matches;
  },

  async createLeaderBoardHome(matchesList: Match[], teamName: string) {
    const leaderBoard = {
      "name": teamName,
      "totalPoints": 0,
      "totalGames": 0,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 0,
      "goalsOwn": 0,
      "goalsBalance": 0,
      "efficiency": "100.00"
    };
    matchesList.forEach((each) => {
      leaderBoard.totalGames += 1;
      if (each.homeTeamGoals > each.awayTeamGoals) leaderBoard.totalVictories += 1;
      if (each.homeTeamGoals === each.awayTeamGoals) leaderBoard.totalDraws += 1;
      if (each.homeTeamGoals < each.awayTeamGoals) leaderBoard.totalLosses += 1;
      leaderBoard.goalsFavor += each.homeTeamGoals;
      leaderBoard.goalsOwn += each.awayTeamGoals;
    });
    leaderBoard.goalsBalance = leaderBoard.goalsFavor - leaderBoard.goalsOwn;
    leaderBoard.totalPoints = (leaderBoard.totalVictories * 3) + leaderBoard.totalDraws;
    leaderBoard.efficiency = ((leaderBoard.totalPoints / (leaderBoard.totalGames * 3) * 100)).toFixed(2);
    return leaderBoard;
  },

  async createLeaderBoardAway(matchesList: Match[], teamName: string) {
    const leaderBoard = {
      "name": teamName,
      "totalPoints": 0,
      "totalGames": 0,
      "totalVictories": 0,
      "totalDraws": 0,
      "totalLosses": 0,
      "goalsFavor": 0,
      "goalsOwn": 0,
      "goalsBalance": 0,
      "efficiency": "100.00"
    };
    matchesList.forEach((each) => {
      leaderBoard.totalGames += 1;
      if (each.homeTeamGoals < each.awayTeamGoals) leaderBoard.totalVictories += 1;
      if (each.homeTeamGoals === each.awayTeamGoals) leaderBoard.totalDraws += 1;
      if (each.homeTeamGoals > each.awayTeamGoals) leaderBoard.totalLosses += 1;
      leaderBoard.goalsFavor += each.awayTeamGoals;
      leaderBoard.goalsOwn += each.homeTeamGoals;
    });
    leaderBoard.goalsBalance = leaderBoard.goalsFavor - leaderBoard.goalsOwn;
    leaderBoard.totalPoints = (leaderBoard.totalVictories * 3) + leaderBoard.totalDraws;
    leaderBoard.efficiency = ((leaderBoard.totalPoints / (leaderBoard.totalGames * 3) * 100)).toFixed(2);
    return leaderBoard;
  },

  async sortLeaderboardArray(homeLeaderboard: ILeaderboard[]) {
    const sortedArray = homeLeaderboard.sort((n1: ILeaderboard,n2:ILeaderboard) => {
      if (n1.totalPoints > n2.totalPoints) return -1;
      if (n1.totalPoints < n2.totalPoints) return 1;
      if (n1.goalsBalance > n2.goalsBalance) return -1;
      if (n1.goalsBalance < n2.goalsBalance) return 1;
      if (n1.goalsFavor > n2.goalsFavor) return -1;
      if (n1.goalsFavor < n2.goalsFavor) return 1;
      if (n1.goalsOwn > n2.goalsOwn) return 1;
      if (n1.goalsOwn < n2.goalsOwn) return -1;
    return 0;
  });
  return sortedArray;
  }
};

export default leaderboardService;