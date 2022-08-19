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