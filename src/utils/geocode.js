const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1Ijoia2ZyYXN1bmtpZXdpY3oiLCJhIjoiY2s4bHM1eTA1MDh0MjNmczF5bGs4MXdiayJ9.e3-W1ikih-7rH7bnxNTvvQ&limit=1'
 
    request({url, json: true}, (error, {body}) => {
       if (error) {
            callback('Unable to connect to location service!', undefined)
       } else if (!body.features.length) {
            callback('Unable find location. Try another search', undefined)
       } else {
           const data = {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               name: body.features[0].place_name
           }
            callback(undefined, data)
       }
   })

}

module.exports = geocode
