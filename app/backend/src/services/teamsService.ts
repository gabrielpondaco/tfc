import teamsModel from '../database/models/team';

const teamsService = {
  async findAll() {
    const teamList = await teamsModel.findAll({raw: true});
    return teamList;
  },

  async getById(id: number) {
    const team = await teamsModel.findOne({
      where: { id },
      raw: true
    })
    return team;
  }
};

export default teamsService;