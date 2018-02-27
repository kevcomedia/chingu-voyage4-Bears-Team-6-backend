var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('GET /', () => {
  it('should response without errors', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        done();
      })
  })
})
