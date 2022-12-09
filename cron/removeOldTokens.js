const { CronJob } = require('cron');
// https://day.js.org/docs/en/installation/node-js
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const OAuth = require("../dataBase/OAuth");

dayjs.extend(utc);

module.exports = new CronJob(

    // See https://www.npmjs.com/package/cron
    // https://crontab.guru
    '* * 1 * * *',
    async function() {
      try {
        console.log('Start removing tokens')
        const monthAgo = dayjs().utc().subtract(1, 'month');

        await OAuth.deleteMany({ createdAt: { $lte: monthAgo }});
        console.log('End removing tokens')
      } catch (e) {
        console.error(e);
      }
    },
);
