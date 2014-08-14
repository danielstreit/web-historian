var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if(err) console.log(err);
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(list) {
    var result = RegExp(url).test(list.join(''))
    return callback(result);
  });
};

exports.addUrlToList = function(url, callback){
  exports.isUrlInList(url, function(isInList) {
    if (!isInList) {
      fs.appendFile(exports.paths.list, url+'\n', function(err) {
        if (err) console.log('Add Url error: ', err);
        callback(true);
      });
    } else {
      callback(false);
    }
  });
};

exports.isURLArchived = function(url, callback){
  //for a given url in list, check to see if it has been downloaded
  //if not, download it!
  fs.readdir(exports.paths.archivedSites, function(err, files){
    var result = _.contains(files, url);
    callback(result);
  });

};

exports.downloadUrls = function() {
  exports.readListOfUrls(function(list) {
    list.forEach(function(url) {
      url && exports.isURLArchived(url, function(isArchived) {
        if (!isArchived) {
          exports.downloadUrl(url);
        }
      });
    });
  });
}

// exports.downloadUrls = function() {
//   exports.readListOfUrls(function(list){
//     var i = 0, k = list.length;
//     for(i; i < k; i++){
//       exports.isURLArchived(list[i], function(isArchived){
//         console.log(!isArchived, !!list[i], list[i]);
//         if(!isArchived && list[i]) {
//           exports.downloadUrl(list[i]);
//         }
//       })
//     }
//   })
// };

exports.downloadUrl = function(url){
  console.log('Downloading', url);
  http.get(url, path.join(exports.paths.archivedSites,url),
    function(err, result) {
      if(err) console.log(err);
    });
};
