var SHA1PRNG = require('./');
var assert = require('assert');
describe('SHA1PRNG', function() {
  describe('use with seed', function() {
    it('1234567887654321 should euqals to hex e24db22e5bd621885d30cb9495f9efd2', function() {
      assert.equal(SHA1PRNG('1234567887654321').toString('hex'), 'e24db22e5bd621885d30cb9495f9efd2');
    });
  });
});
