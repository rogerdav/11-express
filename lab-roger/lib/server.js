'use strict';

const express = require('express');
const errorHandler = require('./error-handler');

const app = express();
const router = express.Router();
app.use('/api/v1', router);


//This sets up the routes

require('../route/route-car')(router);
app.use('/{0}', (req, res) => errorHandler(new Error('Path error. Route not found. roger'), res));

// server controls

const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server is runnning cannot start a running server'));
  server.isOn = true;
  server.http = app.listen(port, callback);
};

server.stop = function(port, callback) {
  if(!server.isON) return callback(new Error('Server not running, cannot stop a stopped server'));
  server.isOn = false;
  server.http.close(callback);
};
