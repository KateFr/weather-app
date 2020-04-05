const request = require('request')

const getWeather = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a26db6eef9432d199abafebc3a050c74&query='+latitude+','+longitude
    request({url , json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable find location',undefined)
        } else {
            const weather = body.location.name+' weather is '+body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + 
            ' degrees. It feels like '+ body.current.feelslike + ' degrees.'
          
            callback(undefined,weather)
        }
    })
}

module.exports = getWeather