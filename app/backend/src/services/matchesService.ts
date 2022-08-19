import matchesModel from '../database/models/match';
import teamsModel from '../database/models/team';

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
  }
};

export default matchesService;