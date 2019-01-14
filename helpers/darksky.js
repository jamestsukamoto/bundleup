const axios = require('axios');

// URL: 
//   https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// Options:
//  {
//    key: API key
//    latitude:
//    longitude: 
// } 

const darkSkyHelp = {

  errorMsg: 'There was an error fetching data from the Dark Sky API\n\n',

  getWeatherAtCoordinate: (options, callback) => {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.darksky.net/forecast/${options.key}/${options.lat},${options.long}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => reject(this.errorMsg, err));
    }) 
  }
}

module.exports = darkSkyHelp