import * as sinon from 'sinon';
import * as chai from 'chai';
import teamsModel from '../database/models/team';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

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
      .get('/teams')
    expect(response.status).to.equal(200);
  })
})