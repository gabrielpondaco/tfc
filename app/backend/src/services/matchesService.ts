import { NotValidBody, NotFoundError } from '../errors';
import matchesModel from '../database/models/match';
import teamsModel from '../database/models/team';
import { IMatch } from '../interfaces';
import teamsService from './teamsService';

const matchesService = {
  async validateTeams(match: IMatch) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) throw new NotValidBody("It is not possible to create a match with two equal teams");
    const homeTeamExists = await teamsService.getById(homeTeam);
    const awayTeamExists = await teamsService.getById(awayTeam);
    if (!homeTeamExists || !awayTeamExists) throw new NotFoundError("There is no team with such id!");
  },
  

  async findAll() {
    const teamList = await matchesModel.findAll({
      include: [
        {
          model: teamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    })
    return teamList;
  },

  async findAllByQuery(inProgress: boolean) {
    const teamList = await matchesModel.findAll({
      where: { inProgress },
      include: [
        {
          model: teamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    })
    return teamList;
  },

  async add(match: IMatch) {
    match.inProgress = true;
    const data = await matchesModel.create(match)
    return data;
  },

  async finishMatch(id: number) {
    await matchesModel.update({
      inProgress: false,
    }, {where: { id }})
    return true;
  },

  async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await matchesModel.update({
      awayTeamGoals,
      homeTeamGoals,
    }, { where: { id } });
  },

  async findByHomeTeam(id: number) {
    const matches = await matchesModel.findAll({
      where: { homeTeam: id, inProgress: false},
      raw: true
    });
    return matches;
  },
  async findByAwayTeam(id: number) {
    const matches = await matchesModel.findAll({
      where: { awayTeam: id, inProgress: false},
      raw: true
    });
    return matches;
  }
};

export default matchesService;