const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337;
const ds = require('../helpers/darksky.js');
const dir = require('../helpers/directions.js');

app.use(express.static('./client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/submit', (req, res) => {
  const { lat1, lng1, lat2, lng2 } = req.query;
  dir.getRouteCoordinates(lat1, lng1, lat2, lng2)
    .then(coordinates => dir.populateMissingCoordinates(coordinates))
    .then(finalCoordinates => res.send(finalCoordinates))
    .catch(err => { throw err; });

  // Pass into Google Maps API ✓
  //  Returns list of coordinates ✓
  //  Fill in missing coordinates ✓ 
  //  Filter out unnecessary coordinates ✓
  // Pass into Dark Sky API
  //  Get weather at each coordinate
  //  Filter data by x, y, z parameters
  //  Draw conclusions from data 
  // Send final payload back to client
})

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});