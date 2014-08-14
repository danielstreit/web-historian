var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers').headers;
var serveAssets = require('./http-helpers').serveAssets;
var urlParser = require('url').parse;
// require more modules/folders here!

var handleGet = function(req, res) {
  serveAssets(res, path.basename(req.url));
};

var handlePost = function(req, res) {
  var url = '';
  req.on('data', function(chunk) {
    url += chunk;
  });
  req.on('end', function() {
    url = url.split('=')[1];
    archive.addUrlToList(url, function(added){
      if (added) {
        serveAssets(res, 'loading.html');
      } else {
        serveAssets(res, url);
      }
    });
  });
};

var actionMap = {
  'GET': handleGet,
  'POST': handlePost
};

exports.handleRequest = function (req, res) {
  actionMap[req.method](req, res);
};
