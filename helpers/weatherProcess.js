const sunCalc = require('suncalc');
const weatherProcess = {

  /**
   * Processes the raw data with necessary information like high & low temps
   * @param {array} rawData - unprocessed data from Dark Sky
   * @return {array} Processed data with high, low temps and summary of weather 
   */
  processRawWeatherData: function (rawData) {
    const temps = rawData
      .map(weatherAtCoord => {
      return Math.round(weatherAtCoord.currTemp);
      })
      .sort((a, b) => a - b);
    const summary = rawData.map(weatherAtCoord => {
      return weatherAtCoord.currSum;
    });
  
    return {
      highTemp: weatherProcess.getHighTemp(temps),
      lowTemp: weatherProcess.getLowTemp(temps),
      summary: weatherProcess.willRain(summary),
    };
  },

  /**
   * Finds the high temp in a sorted list of tempertures
   * @param {array} allTemps - sorted list of tempertures
   * @return {number} Highest temperture in a list
   */
  getHighTemp: function (allTemps) {
    return allTemps[allTemps.length - 1];
  },

  /**
   * Finds the low temp in a sorted list of tempertures
   * @param {array} allTemps - sorted list of tempertures
   * @return {number} lowest temperture in a list
   */
  getLowTemp: function (allTemps) {
    return allTemps[0];
  },

  /**
   * Determines the summary of the weather to present to the client
   * @param {array} weather - list of summarized weather data
   * @return {string} Client-side summary of the weather
   */
  willRain: function (weather) {
    const willRain = weather.some(forecast => forecast.toLowerCase().includes('rain'));
    const willDrizzle = weather.some(forecast => forecast.toLowerCase().includes('drizzle'));
    const isCloudy = weather.some(forecast => forecast.toLowerCase().includes('cloudy') || forecast.toLowerCase().includes('overcast'));
  
    if (willRain) {
      return 'Gear up! It\'s going to rain.';
    } else if (willDrizzle) {
      return 'Expect some drizzle on your trip.';
    } else if (isCloudy) {
      return 'It\'ll be cloudy on the ride.';
    } else {
      return 'Clear skys for your commute.';
    }
  },

  /**
   * Determines the headline of the weather to present to the client
   * @param {array} weather - list of summarized weather data
   * @return {string} Client-side headline of the weather
   */
  willRainShort: function (weather) {
    const willRain = weather.currSum.toLowerCase().includes('rain');
    const willDrizzle = weather.currSum.toLowerCase().includes('drizzle');
    const isCloudy = weather.currSum.toLowerCase().includes('cloudy');
  
    if (willRain) {
      return `${(weather.precip) * 100}% chance of rain.`;
    } else if (willDrizzle) {
      return 'Drizzle';
    } else if (isCloudy) {
      return 'Cloudy';
    } else {
      return 'Clear sky';
    }
  },

  /**
   * Based on the weather, determines the primary icon to present to the client
   * @param {array} summary - list of summarized weather data
   * @return {string} string that client will use to choose appropriate icon
   */
  findIcon: function (summary) {
    const rain = summary.toLowerCase().includes('rain');
    const drizzle = summary.toLowerCase().includes('drizzle');
    const cloudy = summary.toLowerCase().includes('cloudy');
    const clear = summary.toLowerCase().includes('clear');
  
    if (rain) {
      return 'rain';
    } else if (drizzle) {
      return 'drizzle';
    } else if (cloudy) {
      return 'cloudy';
    } else if (clear) {
      return 'shades'
    }
  },

  /**
   * Based on the weather, determines the color icon to present to the client
   * at any given step between start & destination
   * @param {array} weather - list of summarized weather data
   * @return {string} string that client will use to choose appropriate icon
   */
  findColor: function (weather) {
    const willRain = weather.currSum.toLowerCase().includes('rain');
    const willDrizzle = weather.currSum.toLowerCase().includes('drizzle');
    const isCloudy = weather.currSum.toLowerCase().includes('cloudy');
  
    if (willRain) {
      return `colorBlock-rain`;
    } else if (willDrizzle) {
      return 'colorBlock-drizzle';
    } else if (isCloudy) {
      return 'colorBlock-cloudy';
    } else {
      return 'colorBlock-clear';
    }
  },
};

module.exports = weatherProcess;
