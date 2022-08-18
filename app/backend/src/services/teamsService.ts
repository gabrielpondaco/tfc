import teamsModel from '../database/models/team';

const teamsService = {
  async findAll() {
    const teamList = await teamsModel.findAll();
    return teamList;
  },

  async getById(id: number) {
    const team = await teamsModel.findOne({
      where: { id }
    })
    return team;
  }
};

export default teamsService;