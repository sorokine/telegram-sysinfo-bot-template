
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

var respond = function(text) {
  response.text = text;
  api.sendMessage(response)
  .then(function(message)
  {
    console.log(message);
  })
  .catch(function(err)
  {
    console.log(err);
  });
}

api.on('message', function(message)
{
	response.chat_id = message.chat.id;

  console.log(message);

  if (!message.text) {
		console.log("Not a text message rcvd: " + message);
	} else if (/^\/start/.test(message.text)) {
    if ( message.from.username == config.username) {
      chat_id = message.chat.id; // this should happen only on /start
      respond("Hello " + message.from.first_name + " " + message.from.last_name +"!");
      /* send menu */
      // response.reply_markup = JSON.stringify({
  		// 			keyboard : [ ['1', '2', '3'] ]
  		// });
    } else {
      respond("Username not recognized, set correct username in config.json and restart the bot");
    }
	} else {
    if (chat_id != message.chat.id) { /* chat_id was not set */
      respond("Unknown session id; use /start command to initiate new bot session");
    } else if (/^\/help/.test(message.text)) {
		  respond(`
Here is what I can:

/start - initiate session
`);
	  } else if (/^\/time/.test(message.text)) {
		  sysinfo.time( respond );
    } else if (/^\/system/.test(message.text)) {
		  sysinfo.system( respond );
  	} else {
  		respond("command not recognized");
  	}
  }

});
