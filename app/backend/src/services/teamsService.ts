import teamsModel from '../database/models/team';

const teamsService = {
  async findAll() {
    const teamList = await teamsModel.findAll();
    return teamList;
  }
};

export default teamsService;