const async = require('async')
const chai = require('chai')
const chaiHttp = require('chai-http')
const http = require('http')

const { expect } = chai
chai.use(chaiHttp)

const mongoose = require('mongoose')
const User = require('../../models/user')

const app = require('../../app')

const server = http.createServer(app)

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test-weareyourteam')

describe('User registration', () => {
  const endpoint = '/api/auth/register'

  before((done) => {
    async.parallel(
      [
        // For some reason, this event won't fire, but it seems to be fine
        // without this anyway.I'm commenting it for now (and probably even
        // remove it altogether)

        // (callback) => {
        //   mongoose.connection.once('connected', callback)
        // },
        (callback) => {
          server.listen(3001, callback)
        },
      ],
      done,
    )
  })

  beforeEach((done) => {
    User.remove({}, done)
  })

  after((done) => {
    async.parallel(
      [
        // (callback) => {
        //   mongoose.connection.close(callback)
        // },
        (callback) => {
          server.close(callback)
        },
      ],
      done,
    )
  })

  it('registers successfully', (done) => {
    chai.request(server)
      .post(endpoint)
      .send({
        name: 'Sample',
        email: 'sample@sample.com',
        password: 'sample-password',
      })
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res).to.be.a.json
        expect(res.body).to.have.property('success').that.equals(true)
        expect(res.body)
          .to.have.property('email')
          .that.equals('sample@sample.com')
        // We'll handwave a little bit on the token part, and just say that it
        // matches this pattern. Not sure about whether `-` and `_` appear in
        // a JWT though
        expect(res.body)
          .to.have.property('token')
          .that.matches(/^[0-9A-Za-z\-_]+\.[0-9A-Za-z\-_]+\.[0-9A-Za-z\-_]+/)
        done()
      })
      .catch(done)
  })

  it('rejects registration if email is already registered', (done) => {
    const dummyUserInfo = {
      name: 'Sample',
      email: 'sample@sample.com',
      password: 'sample-password',
    }
    async.waterfall(
      [
        // First (successful) registration
        (callback) => {
          chai.request(server).post(endpoint).send(dummyUserInfo).end(callback)
        },
        // Registration attempt with same email
        (res, callback) => {
          chai.request(server).post(endpoint).send(dummyUserInfo).end(callback)
        },
      ],
      (err) => {
        expect(err).to.exist
        expect(err).to.have.status(422)
        expect(err).to.be.a.json
        expect(err.body).to.have.property('success').that.equals(false)
        expect(err.body)
          .to.have.property('message')
          .that.equals('Email is already registered')
        done()
      },
    )
  })

  it('rejects registration if password is less than 10 characters long', (done) => {
    chai.request(server)
      .post(endpoint)
      .send({
        name: 'Sample',
        email: 'sample@sample.com',
        password: '123456789',
      })
      .catch((err) => {
        expect(err).to.have.status(422)
        expect(err).to.be.a.json
        expect(err.body).to.have.property('success').that.equals(false)
        expect(err.body)
          .to.have.property('message')
          .that.equals('Password should be at least 10 characters long')
        done()
      })
      .catch(done)
  })

  it('rejects registration if email is blank', (done) => {
    chai.request(server)
      .post(endpoint)
      .send({
        name: 'Sample',
        email: '',
        password: 'sample-password',
      })
      .catch((err) => {
        expect(err).to.have.status(422)
        expect(err).to.be.a.json
        expect(err.body).to.have.property('success').that.equals(false)
        expect(err.body)
          .to.have.property('message')
          .that.equals('Email cannot be blank')
        done()
      })
      .catch(done)
  })

  describe('Invalid email address', () => {
    // List from https://stackoverflow.com/a/297494
    const invalidEmails = [
      'me@',
      '@example.com',
      'me.@example.com',
      '.me@example.com',
      'me@example..com',
      'me.example@com',
      'me\\@example.com',
    ]
    invalidEmails.forEach((invalidEmail) => {
      it(`rejects registering '${invalidEmail}'`, (done) => {
        chai.request(server)
          .post(endpoint)
          .send({
            name: 'Sample',
            email: invalidEmail,
            password: 'sample-password',
          })
          .catch((err) => {
            expect(err).to.have.status(422)
            expect(err).to.be.a.json
            expect(err.body).to.have.property('success').that.equals(false)
            expect(err.body)
              .to.have.property('message')
              .that.equals(`${invalidEmail} is not a valid email address`)
            done()
          })
          .catch(done)
      })
    })
  })
})
