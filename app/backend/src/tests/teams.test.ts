import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import authService from '../services/authService';

chai.use(chaiHttp);
import teamsModel from '../database/models/team';

const { expect } = chai;

describe('Teams', () => { 

  beforeEach(() => {
    sinon.stub(teamsModel, "findAll").resolves()
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async  () => {
    const response = await chai.request(app)
      .get('/teams');
   
    expect(response.status).to.equal(200);
  })

  it('should return status 200', async  () => {
    const response = await chai.request(app)
      .get('/teams/1')
      
    expect(response.status).to.equal(200);
  })
})