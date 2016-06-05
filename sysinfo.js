/**
 * class that acquires and formats system information.
 */
var moment = require('moment');

class SysInfoBot {
  constructor () {
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
      'dynamic' : 'getDynamicData'
    };
    this.special_commands = [ 'time' ];
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
    var list = Object.keys(this.commands);
    list.unshift(this.special_commands);
    return list.map( s => '/'+s ); // as Telegram menu
  }

  help() {
    return "System information commands: " + this.command_list().join(', ');
  }
}

module.exports.SysInfoBot = new SysInfoBot();
