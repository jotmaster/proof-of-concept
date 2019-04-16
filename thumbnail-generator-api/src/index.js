const Api = require('./api');

const api = new Api();
process.on('SIGINT', api.stop);
process.on('SIGTERM', api.stop);
api.start();
