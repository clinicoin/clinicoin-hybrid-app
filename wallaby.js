module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
	    {pattern: 'node_modules/minilog/dist/minilog.js', instrument: false},
	    'www/lib/*.js',
	    'test/passwords.js',
	    'test/test_keys.js',
	    'test/test_utilities.js',

	    'www/src/*.js',
    ],

    tests: [
      'test/messagelist_test.js',

    ],

	testFramework: 'mocha',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

	debug: true
  };
};
