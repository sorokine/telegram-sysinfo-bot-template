
var telegram = require('telegram-bot-api');
var config = require('./config.json');

/* initialize the bot */
var api = new telegram({
  token: config.api_key,
  updates: {
    enabled: true,
    get_interval: 1000
  }
});

/* initialize sysinfo */
var si_module = require('./sysinfo');
var sysinfo = new si_module();

/*
info sections: all static, all dynamic, by section

later: schedule reports at intervals
*/

var chat_id;
var response = {};
var re_command = /^\/(\w+)/;

var respond = function(text, commands) {
  response.text = text;

  /* making a keyboard*/
  if (commands) {
    /* rearrange commands in several rows */
    const row_size = 4;
    var menu_array = [];
    while (commands.length > 0)
      menu_array.push(commands.splice(0, row_size));

    response.reply_markup = JSON.stringify({
   		keyboard : menu_array
    });
  }

  //console.log(response);

  api.sendMessage(response)
  .then(function(message)
  {
    console.log(`Response: ${message.text}`);
  })
  .catch(function(err)
  {
    console.log(err);
  });
}

api.on('message', function(message)
{
	response.chat_id = message.chat.id;

  if (!message.text) {
		console.log("Not a text message: " + message);
    return;
	}

  console.log(`Command: ${message.text}`);

  var match = re_command.exec(message.text);
  if (!match) {
    respond("not a command: " + message.text);
    return;
  }

  /* processing of the /start command, set chat_id , send menu */
  if (match[1] == 'start') {
    if ( message.from.username == config.username) {
      chat_id = message.chat.id; // this should happen only on /start
      respond(`Hello ${message.from.first_name} ${message.from.last_name}!`, sysinfo.command_list());
    } else {
      respond(`Username not recognized, set correct username (${message.from.username}) in config.json and restart the bot`);
    }
    return;
	}

  if (chat_id != message.chat.id) { /* chat_id was not set */
    respond("Unknown session id; use /start command to initiate new bot session");
    return;
  }

  if (match[1] == 'help') {
		  respond(`
Here is what I can:

/start - initiate session
`);
	} else {
	  sysinfo.command( match[1], respond );
  }

});
