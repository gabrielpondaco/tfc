import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import authService from '../services/authService';

import matchesModel from '../database/models/match';
import matchesService from '../services/matchesService';

chai.use(chaiHttp);

const { expect } = chai;
