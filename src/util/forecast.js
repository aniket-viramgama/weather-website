const request = require('request');

const forecast = function(lat,long,callback){
    const url = 'http://api.weatherstack.com/current?access_key=5e59ccca17821838dd1b15885dc95be6&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f';
    request({url:url , json:true} , function(error , response){
        if(error){
            callback('Unable to connect to location services.',undefined)
        }
        else if(response.body.error){
            callback('Unable to search this location.',undefined)
        }
        else{
            callback(undefined , {
                temperature : response.body.current.temperature,
                RealFeel : response.body.current.feelslike
            })
        }
    })
}
module.exports = forecast