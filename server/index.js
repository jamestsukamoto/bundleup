// Dependencies 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
// Helpers
const ds = require('../helpers/darksky.js');
const dir = require('../helpers/directions.js');
// Variables
const port = 1337;
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100,
  message: 'Too many requests created from this IP. Please try again in 1 hour.'
});

app.enable('trust proxy');

app.use(helmet());
app.use(morgan('dev'));
app.use('/submit', apiLimiter);
app.use(express.static('./client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/submit', (req, res) => {
  const { start, end } = req.query;

  dir.getRouteCoordinates(start, end)
    .then(coordinates => dir.populateMissingCoordinates(coordinates))
    .then(finalCoordinates => ds.getWeatherAtAllCoordinates(finalCoordinates))
    .then(allWeather => ds.reduceData(allWeather))
    .then(conclusion => res.send(conclusion))
    .catch(err => { throw err; });
});

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});