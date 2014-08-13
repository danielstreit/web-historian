var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var staticFiles = {
  '': 'index.html',
  'styles.css': 'styles.css',
  'loading.html': 'loading.html'
};

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var dir;
  var statusCode = 200;
  res.writeHead(statusCode, headers);

  var stream = fs.createReadStream(getPath(asset));
  stream.on('data', function(chunk) {
    res.write(chunk);
  });
  stream.on('end', function() {
    res.end();
  });
};

var getPath = function(asset) {
  if (staticFiles[asset]) {
    return './web/public/' + staticFiles[asset];
  }
  return './archives/sites/' + asset;
};



// As you progress, keep thinking about what helper functions you can put here!
