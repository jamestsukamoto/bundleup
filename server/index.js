const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337;
const ds = require('../helpers/darksky.js');
const dir = require('../helpers/directions.js');

app.use(express.static('./client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/submit', (req, res) => {
  // Pass into Google Maps API ✓
  //  Returns list of coordinates ✓
  //  Fill in missing coordinates ✓ 
  //  Filter out unnecessary coordinates ✓
  // Pass into Dark Sky API ✓
  //  Get weather at each coordinate ✓
  //  Filter data by x, y, z parameters ✓
  //  Draw conclusions from data ✓
  // Send final conclusion back to client ✓

  const { start, end } = req.query;

  dir.getRouteCoordinates(start, end)
    .then(coordinates => dir.populateMissingCoordinates(coordinates))
    .then(finalCoordinates => ds.getWeatherAtAllCoordinates(finalCoordinates))
    .then(allWeather => ds.reduceData(allWeather))
    .then(conclusion => {
      console.log(conclusion);
      res.send(conclusion);
    })
    .catch(err => { throw err; });
});

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});