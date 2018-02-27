const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

const { expect } = chai

chai.use(chaiHttp)

describe('GET /', () => {
  it('should response without errors', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null
        done()
      })
  })
})
