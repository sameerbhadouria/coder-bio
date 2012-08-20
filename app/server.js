var express = require('express'),
	jsdom = require('jsdom'),
	request = require('request'),
	url = require('url'),
	app = module.exports = express();


app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(req, resp){
	resp.sendfile('app/index.html');
});

app.get('/stackoverflow', function(req, resp) {
	request({uri: 'http://stackoverflow.com/users/569413/dsilver829'}, function(err, response, body){

		var self = this;
		self.items = new Array();

		if (err && response.statusCode !== 200) {
		 console.log('Request error');
		}

		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-latest.js']
			}, 
			function (err, window) {
				var $ = window.jQuery;

				console.log($('span.reputation-score').first().text());
				// resp.write('David Silver');
				// respn.write('Reputation');
				resp.end($('span.reputation-score').first().text());
		});
	});
});

app.get('/github', function(req, resp){
	request({uri: 'http://github.com/dsilver829'}, function(err, response, body){

		var self = this;
		self.items = new Array();

		if (err && response.statusCode !== 200) {
		 console.log('Request error');
		}

		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-latest.js']
			}, 
			function (err, window) {
				var $ = window.jQuery;

				console.log($('.stats li strong').first().text());
				// resp.write('David Silver');
				// respn.write('Reputation');
				resp.end($('.stats li strong').first().text());
		});
	});
});

app.get('/linkedin', function(req, resp){
	request({uri: 'http://www.linkedin.com/pub/david-silver/0/607/99b'}, function(err, response, body){

		var self = this;
		self.items = new Array();

		if (err && response.statusCode !== 200) {
		 console.log('Request error');
		}

		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-latest.js']
			}, 
			function (err, window) {
				var $ = window.jQuery;

				console.log($('.overview-connections strong').first().text());
				// resp.write('David Silver');
				// respn.write('Reputation');
				resp.end($('.overview-connections strong').first().text());
		});
	});
})

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
