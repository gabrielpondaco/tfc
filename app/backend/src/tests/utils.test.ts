import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as Joi from 'joi';
import * as sinon from 'sinon';
import runSchema from '../utils/utils';

chai.use(chaiAsPromised);

describe("services/utils", () => {
  beforeEach(sinon.restore);
  const schema = Joi.object();

  describe("runSchema", () => {
    it("deve disparar um erro caso o joi dispare", () => {
      sinon.stub(schema, "validateAsync").rejects();
      chai.expect(runSchema(schema)({})).to.eventually.be.rejected;
    });

    it("deve retornar o objeto tratado se sucesso", () => {
      sinon.stub(schema, "validateAsync").resolves({});
      chai.expect(runSchema(schema)({})).to.eventually.deep.equal({});
    });
  });
});
