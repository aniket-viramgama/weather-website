const request = require('request');

const geocode = function(address , callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5pa2V0MjAwMiIsImEiOiJja2pwbWJ1aG8zN3JmMnhvN2xqZHRreTB5In0.Cx_Liur4W3xZpLdEgxtFJA&limit=1';
    request({url:url , json:true} , function(error, response){
        if(error){
            callback('Unable to connect to location services.', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find such location. Try another' , undefined)
        }
        else{
            callback(undefined , {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode