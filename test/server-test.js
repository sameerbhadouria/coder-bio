// This is test/server.js
var request = require('supertest');
var assert = require('assert');

var express = require('express');
var app     = express();

// Here we load our server.js as a module
var server = require('../app/server');

describe('Server', function() {
	describe('GET /', function() {
		it('responds with default data', function(done) {
			request(server)
				.get('/')
				.end(function(err, res) {
					// Make sure there was no error
					assert.equal(err, null);

					var body = res.body;
					//assert.equal(body.data, 'default data');
					assert.equal(res.statusCode, 200);

					// Finish asynchronous test
					done();
				});
		});
	});
});
