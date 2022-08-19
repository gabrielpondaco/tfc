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
import matchesService from '../services/matchesService';
import Match from '../database/models/match';

const { expect } = chai;

describe('Matches', () => { 
  const mockEqualTeams = {
    "homeTeam": 8,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }

  const mockBody = {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }

  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzdHJpbmcxIn0sImlhdCI6MTY2MDg0NTc4Mn0.p2hgnkul8fEQo9ljiQulld53leWjzeTeFw0A9l1V7IQ';

  beforeEach(() => {
    sinon.stub(matchesModel, "findAll").resolves()
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return list of matches', async () => {
    // sinon.stub(matchesService, "findAllByQuery").resolves()
    const response = await chai.request(app)
      .get('/matches?inProgress=true');
      expect(response.status).to.equal(200);
  });

  it('should return status 200', async  () => {
    const response = await chai.request(app)
      .get('/matches');
   
    expect(response.status).to.equal(200);
  });

  it('shouldnt allow to add with two equal teams', async () => {
    const response = await chai.request(app)
      .post('/matches')
      .send(mockEqualTeams);
      expect(response.status).to.equal(400);
  })

  it('should allow to add match', async () => {
    const mockResponseObj = {
      ...mockBody,
      id: 56,
      inProgress: true
    }
    // sinon.stub(matchesService, "add").resolves(mockResponseObj as Match)
    const response = await chai.request(app)
      .post('/matches')
      .send(mockBody)
      .set({'Authorization': mockToken });
      
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(mockResponseObj);
  });

  it('should allow to update match', async () => {
    // sinon.stub(matchesService, "finishMatch").resolves()
    const response = await chai.request(app)
      .patch('/matches/:id/finish');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: "Finished" });
  });

  it('should allow to update match', async () => {
    const mockBody = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }
    // sinon.stub(matchesService, "update").resolves()
    const response = await chai.request(app)
      .patch('/matches/:id')
      .send(mockBody);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'updated' });
  })
  
})