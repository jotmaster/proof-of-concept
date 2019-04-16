const multer = require('multer');
const { use_auth0 } = require('../config');
const thumbnail_upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5242880,
		files: 1
	}
});

module.exports = (api, callback) => {
	const handleThumbnails = (req, res) => {
		api._processThumbnails(req.file)
			.then(thumbnails => callback(res, { data: thumbnails }))
			.catch(err => callback(res, { error: err }));
	};

	api.express
		.get('/', (_, res) => {
			callback(res, { data: 'Welcome to Sinapsis.co Node API' });
		})
		.get('*', (_, res) => {
			callback(res, {
				error: {
					message: 'Wrong request',
					code: 404
				}
			});
		});

	if (use_auth0) {
		api.express.post(
			'/thumbnail',
			api.getJwt(),
			thumbnail_upload.single('image'),
			handleThumbnails
		);
	} else {
		api.express.post(
			'/thumbnail',
			thumbnail_upload.single('image'),
			handleThumbnails
		);
	}
};
