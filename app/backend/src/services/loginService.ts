import * as Joi from 'joi';
import { ILoginBody } from '../interfaces';
import runSchema from '../utils/utils';
import usersModel from '../database/models/user';


const loginService = {
  validateBody: runSchema(Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }).messages({
        'string.empty': 'All fields must be filled',
        'any.required': 'All fields must be filled'
      })),

  async findUser(email: string) {
    const user = await usersModel.findOne({
      where: { email: email }
    });
    return user;
  }
};

export default loginService;