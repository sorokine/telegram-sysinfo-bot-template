/**
 * class that acquires and formats system information.
 */
var moment = require('moment');

class SysInfoBot {
  constructor (config) {
    this.conf = config;
    this.si = require('systeminformation');
  } // constructor

  time(cb) {
    var t = this.si.time();
    cb("Current: " + moment(t.current).format() +
      " up: " + moment.duration(t.uptime, 'seconds').toString());
  }

  system(cb) {
    this.si.system( data => cb(JSON.stringify(data)) );
  }
}

module.exports = SysInfoBot;
