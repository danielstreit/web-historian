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
  var statusCode = asset === 'loading.html' ? 302 : 200
  getPath(asset, function(path){
    if (path === null) {
      return fileNotFound(res);
    }
    fs.readFile(path, 'utf8', function(err, file) {
      res.writeHead(statusCode, headers);
      res.end(file);
    });
  });
};

var fileNotFound = function(res){
  res.writeHead(404, headers);
  res.end('File not found');
}

var getPath = function(asset, callback) {
  if (staticFiles[asset]) {
    return callback(path.join(archive.paths.siteAssets, staticFiles[asset]));
  }
  archive.isUrlInList(asset, function(inList){
    if(inList) {
      return callback(path.join(archive.paths.archivedSites, asset));
    } else {
      return callback(null);
    }
  })
};


// As you progress, keep thinking about what helper functions you can put here!
