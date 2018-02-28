const chai = require('chai')
const Interest = require('../../models/interest')

const { expect } = chai

describe('Interest model', () => {
  it('should be invalid if name empty', (done) => {
    const interest = new Interest()

    interest.validate((err) => {
      expect(err.errors.name).to.exist
      done()
    })
  })
})
