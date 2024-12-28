This project is no longer maintained

# Telegram Bot Template for Reporting System Information

## Synopsis

A template for a minimal telegram bot that reports system information for the computer that the bot running on.

## Use Cases

Use this bot when you need to check the status of a box behind a firewall.

## Requirements

* Node.js version 6 or later (requires ECMAscript 6), tested with v6.2.1
* Any box that can run Node.js, works well on https://getchip.com/pages/chip

## How To

1.  In Telegram connect to @BotFather and create a new bot.  Give it a name that you can recognize but other people cannot guess.  Make a copy of the API key.
2.  Clone and cd into this repository
2.  Copy config-TEMPLATE.json into config.json and put there API key of your bot and your Telegram user name.
3.  Do ```npm install```
4.  Start the bot ```node bot-launcher.js```, find the bot by the name you've gave it in the Telegram client search box
6.  Issue ```/start``` command (you have to reissue it every time bot is restarted)
5.  Use bot menu to get information about your system

## Internals

Currently system information is collected using https://github.com/sebhildebrandt/systeminformation

## TODO

* [ ] better formatting for the results
* [ ] scheduled reports
* [ ] alarms like overheating or disk full
