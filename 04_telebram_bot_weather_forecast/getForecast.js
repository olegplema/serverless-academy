const axios = require('axios')

module.exports = async () => {
    const forecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast',{
        params:{
            appid:process.env.API_KEY,
            id:process.env.CITY_ID
        }
    })
    return forecast.data
}