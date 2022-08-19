import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import authService from '../services/authService';

chai.use(chaiHttp);
import matchesModel from '../database/models/match';
import leaderboardService from '../services/leaderboardService';
import matchesService from '../services/matchesService';

const { expect } = chai;

describe('Leaderboard', () => { 
  beforeEach(() => {
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async  () => {
    const response = await chai.request(app)
      .get('/leaderboard');
   
    expect(response.status).to.equal(200);
  });

  
})