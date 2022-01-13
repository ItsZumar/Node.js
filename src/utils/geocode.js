const requests = require("requests")
//encodeURIComponent(address)
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaXRzenVtYXItMTciLCJhIjoiY2t4bjlwaGtoMWR6cTJwcGNmYzFxdXd6MiJ9.OyUBWGFWT69l2kqdTm8gcg&limit=1'
  
    requests(url)
    .on('data', function(chunk) {
        const data = JSON.parse(chunk)
        if(data.message) {
          callback("Unable to access Location.", undefined)
        } else {
          callback(undefined, {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name,
          })
        }
    })
    .on('end', function (err) {
        if (err) {
          callback('connection closed due to errors');
        } 
    });
}


module.exports = geocode