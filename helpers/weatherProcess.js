const sunCalc = require('suncalc');
const weatherProcess = {
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

  getHighTemp: function (allTemps) {
    return allTemps[allTemps.length - 1];
  },

  getLowTemp: function (allTemps) {
    return allTemps[0];
  },

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

  isDay: function () {
    const geoTimes = navigator.geolocation.getCurrentPosition(position => {
      sunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
    });
    const defaultTimes = sunCalc.getTimes(new Date(), 37.4192458, -122.1677497);
  },

};

module.exports = weatherProcess;
