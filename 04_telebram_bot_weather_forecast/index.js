const getForecast = require('./getForecast.js')
const TelegramBot = require('node-telegram-bot-api')
const Commands = require('./commands.js')
const {createMessage} = require('./utils.js')


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN,{polling:true})

let interval

const sendMessage = async (msg) => {
    const forecast = await getForecast()
    bot.sendMessage(msg.chat.id, createMessage(forecast.list))
}

const sendMessages = async (msg,time) => {
    if (interval)
        clearInterval(interval)
    sendMessage(msg)
    interval = setInterval(async () => {
        sendMessage(msg)
    },time * 60 * 60 * 1000)
}

bot.onText(Commands.start,(msg) => {
    bot.sendMessage(msg.chat.id, 'Press the button', {
        reply_markup: {
            keyboard: [[Commands.city]]
        }
    })
})

bot.onText(RegExp(Commands.city), (msg) => {
    bot.sendMessage(msg.chat.id, 'Choose the interval', {
        reply_markup: {
            keyboard: [[Commands.time3, Commands.time6]]
        }
    })
})

bot.onText(RegExp(Commands.time3), (msg) => {
    sendMessages(msg,3)
})

bot.onText(RegExp(Commands.time6), (msg) => {
    sendMessages(msg,6)
})



bot.on('polling_error', console.log)
