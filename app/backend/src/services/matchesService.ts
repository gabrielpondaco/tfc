import matchesModel from '../database/models/match';
import teamsModel from '../database/models/team';
import { IMatch } from '../interfaces';

const matchesService = {
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
  }
};

export default matchesService;