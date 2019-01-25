const processRawWeatherData = (rawData) => {
  const temps = rawData
    .map(weatherAtCoord => {
    return Math.round(weatherAtCoord.currTemp);
    })
    .sort((a, b) => a - b);
  const summary = rawData.map(weatherAtCoord => {
    return weatherAtCoord.currSum;
  });

  return {
    highTemp: getHighTemp(temps),
    lowTemp: getLowTemp(temps),
    summary: willRain(summary),
    loading: false,
  };

}

const getHighTemp = (allTemps) => {
  return allTemps[allTemps.length - 1];
}

const getLowTemp = (allTemps) => {
  return allTemps[0];
}

const willRain = (weather) => {
  const willRain = weather.some(forecast => forecast.includes('rain'));
  const willDrizzle = weather.some(forecast => forecast.includes('drizzle'));

  if (willRain) {
    return 'rain';
  } else if (willDrizzle) {
    return 'drizzle';
  } else {
    return 'no rain';
  }
}

module.exports = { processRawWeatherData };
