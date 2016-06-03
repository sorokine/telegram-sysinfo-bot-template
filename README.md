# Telegram Bot Template for Reporting System Information

## Synopsis

A node.js template for a telegram bot that reports system information for the computer that the bot running on.

## Use Cases

You need to check status of a box that is behind firewall.

## Requirements

* Node.js version 6 or later (requires ECMAscript 6), tested with v6.2.1
* Any box that can run Node.js, works well on https://getchip.com/pages/chip

## How To

1.  In Telegram connect to @BotFather and create a new bot.  Give it a name that you can recognized but other people cannot guess.  make a copy of the API key.
2.  Copy config-TEMPLATE.json into config.json and put there API key, a secret (any typeable string) and/or your user name.
2.  Do ```npm install``` in the bot directory
3.  Start the bot ```node bot-launcher.js```, find the bot bat the name you've it in the Telegram client
4.  The bot will ask you for the secret that you've set in config.json (this is a security measure)
5.  Use bot menu to get information about your system

## Internals

Currently system information is collected using https://github.com/sebhildebrandt/systeminformation
