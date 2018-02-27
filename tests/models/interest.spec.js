var chai = require('chai');
var Interest = require('../../models/interest')
var expect = chai.expect;

describe('Interest model', function() {
  it('should be invalid if name empty', function() {
    var interest = new Interest();

    interest.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    })
  })
});
