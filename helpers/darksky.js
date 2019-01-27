const axios = require('axios');
const token = require('../config.js').DARK_SKY_TOKEN;
const shortid = require('shortid');

async function getWeatherAtCoordinate(coordinate) {
  const weatherAtCoord = await axios.get(
    `https://api.darksky.net/forecast/${token}/${coordinate.lat},${coordinate.lng}`
  );
  const weather = await weatherAtCoord.data;
  return weather;
};

async function getWeatherAtAllCoordinates(listOfCoordinates) {
  return await Promise.all(listOfCoordinates.map(getWeatherAtCoordinate));
};

const reduceData = (allWeather) => {
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
  })
}

const summarizeData = (weatherArr) => {
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
  })
};


module.exports = { getWeatherAtAllCoordinates, summarizeData, reduceData };

// Current temp: WeatherAtCord.data.currently.apparentTemperature
// All temps: WeatherAtCord.data.hourly.data[i]