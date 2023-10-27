const TelegramBot = require('node-telegram-bot-api')
const Commands = require('./commands.js')
const requests = require('./requests.js')
const {createMessage, getFromMono} = require("./utils.js")
const NodeCache = require('node-cache')

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN,{polling:true})
const myCache = new NodeCache()

const sendError = (chatId) => {
    bot.sendMessage(chatId, 'Something went wrong')
}

const sendStart = (chatId) => {
    bot.sendMessage(chatId, 'Press the button', {
        reply_markup: {
            keyboard: [[Commands.exchangeRate]]
        }
    })
}

bot.onText(Commands.start,(msg) => {
    sendStart(msg.chat.id)
})

bot.onText(RegExp(Commands.exchangeRate), (msg) => {
    bot.sendMessage(msg.chat.id, 'Choose the currency', {
        reply_markup: {
            keyboard: [[Commands.usd, Commands.eur], [Commands.cancel]]
        }
    })
})

bot.onText(RegExp(Commands.usd), async (msg) => {
    const mono = (await getFromMono(myCache))?.usd
    if (!mono){
        await sendError(msg.chat.id)
        return
    }
    let privat
    try {
        privat = await requests.getUSDPrivatBank()
        console.log(privat)
    }catch{
        await sendError(msg.chat.id)
        return
    }

    bot.sendMessage(msg.chat.id, createMessage(mono, privat))
})

bot.onText(RegExp(Commands.eur), async (msg) => {
    const mono = (await getFromMono(myCache))?.eur
    if (!mono){
        await sendError(msg.chat.id)
        return
    }
    let privat
    try {
        privat = await requests.getEURPrivatBank()
    }catch{
        await sendError(msg.chat.id)
        return
    }
    bot.sendMessage(msg.chat.id, createMessage(mono, privat))
})

bot.onText(RegExp(Commands.cancel), (msg) => {
    sendStart(msg.chat.id)
})

bot.on('polling_error', console.log)

// if(myCache.has('monoEUR')){
//     console.log('Has eur')
//     mono = myCache.get('monoEUR')
// }else {
//     try {
//         mono = await requests.getEURMonobank()
//     }catch{
//         await sendError(msg.chat.id)
//         return
//     }
//     myCache.set('monoEUR', mono, 300)
// }