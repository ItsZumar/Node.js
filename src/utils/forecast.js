const requests = require("requests")

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=e19d4c604381d8a6d4ccf313d190c8eb`

    requests(url)
    .on('data', function(chunk) {
        const data = JSON.parse(chunk)
        if(data.message) {
          callback("Unable to access Location.", undefined)
        } else {
          callback(undefined, {
            location: data.timezone,
            weather: data.current.weather[0].main
          })
        }
    })
    .on('end', function (err) {
        if (err) {
          callback('connection closed due to errors');
        } 
    });
}

module.exports = forecast