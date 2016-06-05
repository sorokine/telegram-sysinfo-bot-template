/**
 * class that acquires and formats system information.
 */
var moment = require('moment');

class SysInfoBot {
  constructor (config) {
    this.commands = {
      'system' : 'system',
      'OS' : 'osInfo',
      'CPU' : 'cpu',
      'CPU_t' : 'cpuTemperature',
      'CPU_load' : 'currentLoad',
      'memory' : 'mem',
      'df' : 'fsSize',
      'io' : 'fsStats',
      'net' : 'networkInterfaces',
      'users' : 'users',
      'static' : 'getStaticData',
      'dynamic' : 'getDynamicData'
    };
    this.conf = config;
    this.si = require('systeminformation');
  } // constructor

  command(command, cb) {
    if (command in this.commands)
      this.si[this.commands[command]]( data => cb(JSON.stringify(data)) );
    else /* special commands */
      switch (command) {
        case 'time':
          var t = this.si.time();
          cb("Current: " + moment(t.current).format() +
            " up: " + moment.duration(t.uptime, 'seconds').toString());
          break;
        default:
          cb("unknown command");
      }
  }

  command_list() {
    return Object.keys(this.commands).map( s => '/'+s ); // as Telegram menu
  }
}

module.exports = SysInfoBot;
