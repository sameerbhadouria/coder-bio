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

app.get('/search', function(req, resp) {
	var result = {};

	email = req.email;

	scrapeDataFromPage('http://stackoverflow.com/users/569413/' + email, 
		'span.reputation-score', function(scrapedData) {
			result.stackoverflowScore = scrapedData;

			scrapeDataFromPage('http://github.com/' + email, 
				'.stats li strong', function(scrapedData) {
					result.githubFollowers = scrapedData;

					scrapeDataFromPage('http://www.linkedin.com/pub/david-silver/0/607/99b', 
						'.overview-connections strong', function(scrapedData) {
							result.linkedinConnections = scrapedData;
							resp.end(JSON.stringify(result));
					});
			});
	});
});

scrapeDataFromPage = function(pageLink, dataToBeScraped, callback) {
	request({uri: pageLink}, function(err, response, body) {
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
				var result = $(dataToBeScraped).first().text();
				console.log(result);
				callback(result);
		});
	});
}

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
