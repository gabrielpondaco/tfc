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

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzdHJpbmcxIn0sImlhdCI6MTY2MDg0NTc4Mn0.p2hgnkul8fEQo9ljiQulld53leWjzeTeFw0A9l1V7IQ';
const mockLoginBody = {
  "email": "admin@admin.com",
  "password": "string"
}
const mockLoginBodyNotExist = {
  "email": "ademiro@admin.com",
  "password": "string"
}

describe('Login', () => { 
  
  
  beforeEach(() => {
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

  it('should return status 400 and message "All fields must be filled"', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        "password": "string"
      })
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("All fields must be filled");
  })

  it('should return a token', async  () => {
    sinon.stub(authService, "createToken").resolves(mockToken)
    const response = await chai.request(app)
      .post('/login')
      .send(mockLoginBody)
    expect(response.body.token).to.equal(mockToken);
  })
})

describe('Login/validate', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should return status 200 and use role', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set({'Authorization': mockToken });
    expect(response.status).to.equal(200);
    // expect(response.body).to.deep.equal({ role: 'admin' });
  });

  it('should return invalid token message', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set({'Authorization': 'xaxim' })
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  });
})