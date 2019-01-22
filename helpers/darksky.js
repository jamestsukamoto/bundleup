const axios = require('axios');
const token = require('../config.js').DARK_SKY_TOKEN;

async function getWeatherAtCoordinate(coordinate) {
  const weatherAtCoord = await axios.get(
    `https://api.darksky.net/forecast/${token}/${coordinate.lat},${coordinate.lng}`
  );
  const summaryForHour = await weatherAtCoord.data.minutely.summary;
  return summaryForHour;
};

async function getWeatherAtAllCoordinates(listOfCoordinates) {
  return await Promise.all(listOfCoordinates.map(getWeatherAtCoordinate));
};

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


module.exports = { getWeatherAtAllCoordinates, summarizeData };