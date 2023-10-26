
module.exports = {
    createMessage(list){
        let message = ''

        for (let i = 0; i < 9; i++) {
            message +=
                'Date: ' + list[i].dt_txt +
                '\nTemperature: ' +  (list[i].main.temp - 273.15).toFixed(2) + '°C' +
                '\nWeather: ' + list[i].weather.map(el => el.description).join(',') +
                '\nWind speed: ' + list[i].wind.speed + 'm/s' +
                '\nClouds: ' + list[i].clouds.all + '%'

            if  (list[i].rain){
                message += '\nRain: ' + list[i].rain['3h'] + 'mm'
            }
            message += '\n\n'
        }

        return message
    }
}