const request = require('request');
const { auth0_audience, auth0_issuer } = require('../config');

module.exports = () =>
	request(
		{
			method: 'POST',
			url: `${auth0_issuer}oauth/token`,
			headers: { 'content-type': 'application/json' },
			body: {
				grant_type: 'client_credentials',
				client_id: 'k1H-6mkYqA43Oh-LFT0IoWikE2Wbw3Gy',
				client_secret:
					'ueZj8K1BfnSSWPfeSvMkzhXTkwUegvi5esB8ZMlfUKoDx1hkJttrF2jEONsALetQ',
				audience: auth0_audience
			},
			json: true
		},
		function(err, res, body) {
			if (error) throw new Error(error);

			console.log(body);
		}
	);
