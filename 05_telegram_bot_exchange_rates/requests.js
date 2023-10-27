const axios = require('axios')

module.exports = {
    async getUSDPrivatBank(){
        const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        return response.data.find(element => element.ccy === 'USD')
    },

    async getUSDMonobank(){
        const response = await axios.get('https://api.monobank.ua/bank/currency')
        return response.data.find(element => element.currencyCodeA === 840
            && element.currencyCodeB === 980)
    },

    async getEURPrivatBank(){
        const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        return response.data.find(element => element.ccy === 'EUR')
    },

    async getEURMonobank(){
        const response = await axios.get('https://api.monobank.ua/bank/currency')
        return response.data.find(element => element.currencyCodeA === 978
            && element.currencyCodeB === 980)
    },

    async getMonobank(){
        const response = await axios.get('https://api.monobank.ua/bank/currency')

        const eur = response.data.find(element => element.currencyCodeA === 978
            && element.currencyCodeB === 980)
        const usd = response.data.find(element => element.currencyCodeA === 840
            && element.currencyCodeB === 980)

        return {usd, eur}
    }
}