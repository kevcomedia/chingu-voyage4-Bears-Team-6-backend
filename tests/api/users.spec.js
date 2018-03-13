const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')

const { expect } = chai

chai.use(chaiHttp)

describe('GET /', () => {
  beforeEach(() => {
    // const user = User.create({
    //   username: 'tung',
    //   email: 'tung@teng.com',
    //   password: 'abcxyz'
    // })
  })

  it('should return status 401 if no token provided', (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        expect(err).to.have.status(401)
        done()
      })
  })

  it('should return all users if provide right token', (done) => {
    const token = '...'
    chai.request(server)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})
