const axios = require('axios');
const token = require('../config.js').DARK_SKY_TOKEN;
const shortid = require('shortid');

const ds = {
  
  /**
   * Fetches the weather at a single coordinate
   * @param {Object} coordinate - contains coordinate latitude & longitude
   */
  _getWeatherAtCoordinate: async function (coordinate) {
    const weatherAtCoord = await axios.get(
      `https://api.darksky.net/forecast/${token}/${coordinate.lat},${coordinate.lng}`
    );
    const weather = await weatherAtCoord.data;
    return weather;
  }, 

  /**
   * Fetches the weather at all coordinates in a given list
   * @param {Object} listOfCoordinates - Linked List containing all coordinates
   *                                     at which weather needs to be queried
   * @return {array} List of Dark Sky objects for each coordinate
   */
  getWeatherAtAllCoordinates: async function(listOfCoordinates) {
    return await Promise.all(listOfCoordinates.map(this._getWeatherAtCoordinate));
  },

  /**
   * Reduces huge dataset from Dark Sky into relevant data for client
   * @param {array} allWeather - List of Dark Sky objects for each coordinate
   * @return {array} simplified version of the Dark Sky data 
   */
  reduceData: function(allWeather) {
    return new Promise ((resolve) => {
      resolve(allWeather.map(weather => {
        if (weather.hourly) {
          return {
            uuid: shortid.generate(),
            daySum: weather.hourly.summary,
            currTemp: weather.currently.apparentTemperature,
            currSum: weather.minutely.summary,
            precip: weather.currently.precipProbability
          } 
        } else if (weather.status) {
          return weather;
        }
      }));
    });
  },

  /**
   * Takes simplified data & returns a weather summary (rain, drizzle, etc)
   * @param {array} allWeather - List of simplified weather
   * @return {string} conclusion of weather to be encountered on journey
   */
  summarizeData: function (weatherArr) {
    return new Promise((resolve) => {
      const willRain = weatherArr.some(forecast => forecast.includes('rain'));
      const willDrizzle = weatherArr.some(forecast => forecast.includes('drizzle'));
  
      if (willRain) {
        resolve('rain');
      } else if (willDrizzle) {
        resolve('drizzle');
      } else {
        resolve('no rain');
      }
    });
  },
};

module.exports = ds;
