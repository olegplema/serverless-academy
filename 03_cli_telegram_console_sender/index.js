const {Command} = require('commander')
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')
process.env.NTBA_FIX_350 = true

const token = process.env.TOKEN
const chatId = process.env.CHAT_ID
const bot = new TelegramBot(token)
const program = new Command()

program.command('send-message').alias('m')
    .description('Send text message in telegram')
    .argument('<string>', 'Message you want to send')
    .action((message) => {
        bot.sendMessage(chatId, message)
    })


program.command('send-photo').alias('p')
    .description('Send photo message in telegram')
    .argument('<string>', 'Path to photo you want to send')
    .action(async (filepath) => {
        fs.readFile(filepath,(err, data) => {
            if (err){
                console.log('Something went wrong')
            }else {
                bot.sendPhoto(chatId, data,{},
                    {filename:path.parse(filepath).base, contentType: 'image/*'})
            }
        })
    })

program.parse()