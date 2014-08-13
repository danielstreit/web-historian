var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
var postURL = require('./http-helpers').postURL;
// require more modules/folders here!

var handleGet = function(req, res) {
  serveAssets(res, path.basename(req.url));
};

var handlePost = function(req, res) {
  var site = '';
  req.on('data', function(chunk) {
    site += chunk;
  });
  req.on('end', function() {
    // if site already archived, take to archived site
    // else add site and take to loading
  });
};

var actionMap = {
  'GET': handleGet,
  'POST': handlePost
};

exports.handleRequest = function (req, res) {
  actionMap[req.method](req, res);
};
