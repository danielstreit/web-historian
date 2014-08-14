var cronJob = require('cron').CronJob;
var archives = require('../helpers/archive-helpers');

new cronJob('*/3 * * * * *', function(){
    archives.downloadUrls();
}, null, true, "America/Los_Angeles");
