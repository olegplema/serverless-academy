const requests = require('./requests.js')

module.exports = {
    createMessage(mono, privat){
        return `Monobank:\n\tBuy: ${mono.rateBuy} UAH\n\tSell: ${mono.rateSell} UAH\n\n` +
            `Privat:\n\tBuy: ${privat.buy} UAH\n\tSell: ${privat.sale} UAH`
    },

    async getFromMono(cache){
        if (cache.has('mono')){
            console.log('has mono')
            return cache.get('mono')
        }
        try {
            const mono = await requests.getMonobank()
            cache.set('mono', mono, 300)
            return mono
        }catch {
            return null
        }

    }
}