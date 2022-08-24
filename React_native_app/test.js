const moment = require('moment');

console.log(moment.utc('2022-08-21T10:05:29Z').format('LTS'));
console.log(moment('2022-08-21T10:05:29Z').fromNow())