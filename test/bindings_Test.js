var assert = chai.assert;

describe('silly test', function() {
    it('should just return 1', function() {
        var actual = sillyFunction();
        assert.equal(actual, 1);
    });
});