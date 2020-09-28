'use strict';
var cron = require('node-cron');

const startVideoMiningJob = () => {
    cron.schedule('* * * * * *', () => {
        console.log('running a task1 every sec');
    });
}


module.exports = {
    startVideoMiningJob
}
