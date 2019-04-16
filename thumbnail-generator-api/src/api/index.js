const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const sharp = require('sharp');
const {
	ports,
	auth0_audience,
	auth0_issuer,
	auth0_keys,
	supported_img_mimetype
} = require('../config');

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({ jwksUri: auth0_keys }),
	audience: auth0_audience,
	issuer: auth0_issuer,
	algorithms: ['RS256']
});

class Api {
	constructor() {
		const port =
			process.env.NODE_ENV === 'development'
				? ports.development
				: ports.production;

		if (!port)
			throw Error(
				`You need to specify the API's port number in the configuration file`
			);

		this.server = null;
		this.express = express();
		this.express.use(bodyParser.json());
		this.port = port;
		require('./views')(this, this._handleRequest);
	}
	start() {
		this.server = this.express.listen(this.port, () => {
			console.log(`API server started at port ${this.port}`);
		});
	}
	stop() {
		if (this.server) this.server.close();
	}
	getJwt() {
		return checkJwt;
	}
	_resizeImage(image, dimensions) {
		return sharp(image)
			.resize(dimensions.width, dimensions.height)
			.toBuffer();
	}
	_processThumbnails(file) {
		return new Promise((resolve, reject) => {
			if (!file) reject({ message: 'Image missing', code: 400 });
			else {
				if (supported_img_mimetype.includes(file.mimetype)) {
					Promise.all([
						this._resizeImage(file.buffer, {
							width: 400,
							height: 300
						}),
						this._resizeImage(file.buffer, {
							width: 160,
							height: 120
						}),
						this._resizeImage(file.buffer, {
							width: 120,
							height: 120
						})
					]).then(thumbnails => {
						resolve(
							thumbnails.map(thumbnail =>
								thumbnail.toString('base64')
							)
						);
					});
				} else {
					reject({
						message: 'Only JPG and PNG images are allowed',
						code: 415
					});
				}
			}
		});
	}
	_handleRequest(res, body) {
		if (res) {
			res.setHeader('Content-Type', 'application/json');

			if (body.error && body.error.code) res.status(body.error.code);

			res.json(body);
		}
	}
}

module.exports = Api;
