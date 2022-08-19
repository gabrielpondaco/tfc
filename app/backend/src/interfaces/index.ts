export interface ILoginBody {
  email: string,
  password: string,
}

export interface TokenInterface {
  data: {
    email: string,
    password: string,
  }
}

export interface IMatch {
  homeTeam: number, 
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface ILeaderboard {
    name: string;
    totalPoints: number;
    totalGames: number;
    totalVictories: number;
    totalDraws: number;
    totalLosses: number;
    goalsFavor: number;
    goalsOwn: number;
    goalsBalance: number;
    efficiency: string;
}