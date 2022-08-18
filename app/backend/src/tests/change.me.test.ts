import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import authService from '../services/authService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => { 
  const mockLoginBody = {
    "email": "admin@admin.com",
    "password": "string"
  }
  const mockLoginBodyNotExist = {
    "email": "ademiro@admin.com",
    "password": "string"
  }
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzdHJpbmcxIn0sImlhdCI6MTY2MDg0NTc4Mn0.p2hgnkul8fEQo9ljiQulld53leWjzeTeFw0A9l1V7IQ';
  beforeEach(() => {
    sinon.stub(authService, "createToken").resolves(mockToken)
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockLoginBody)
    expect(response.status).to.equal(200);
  })

  it('should return status 401 when email is incorrect', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockLoginBodyNotExist)
    expect(response.status).to.equal(401);
  })

  it('should return a token', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockLoginBody)
    
    expect(response.body.token).to.equal(mockToken);

  })

})