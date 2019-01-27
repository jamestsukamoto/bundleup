const geolib = require('geolib');
const axios = require('axios');
const token = require('../config.js').MAPS_TOKEN;

// Linked List to store coordinates
class CoordinateList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    
    this.addToTail = (lat, long) => {
      const newCoord = new Coordinate(lat, long);
      if (!this.head) {
        this.head = newCoord;
        this.tail = this.head;
        this.current = this.head;
      } else {
        this.current.next = newCoord;
        this.tail = this.current.next;
        this.current = this.current.next;
      }
    };

    this.map = (callback) => {
      this.current = this.head;
      const output = [];
      const operateOnNext = (currCoord) => {
        if (!currCoord) {
          return;
        }
        output.push(callback(currCoord));
        this.current = currCoord.next;
        operateOnNext(this.current);
      };
      operateOnNext(this.current);
      return output;
    };
  }
}
// Linked List Node
class Coordinate {
  constructor(lat, lng) { 
    this.lat = lat;  
    this.lng = lng;
    this.next = null;
  }
  insertNextCoordinate(lat, lng) {
    let newCoordinate = new Coordinate(lat, lng);
    newCoordinate.next = this.next;
    this.next = newCoordinate;
  }

  deleteNextCoordinate() {
    this.next = this.next.next;
  }
}

const getRouteCoordinates = (start, end) => {
  const coordsToDarkSky = new CoordinateList();

  return new Promise((resolve, reject) => {
    console.time('Retrieve Coordinates');
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${token}`)
      .then(results => {
        const steps = results.data.routes[0].legs[0].steps;
        steps.forEach(step => {
          coordsToDarkSky.addToTail(step.end_location.lat, step.end_location.lng);
        });
        return coordsToDarkSky;
      })
      .then((coordinates) => {
        console.timeEnd('Retrieve Coordinates');
        resolve(coordinates)
      })
      .catch(err => reject(err));
  })
};

const populateMissingCoordinates = (coordinateList) => {
  return new Promise((resolve, reject) => {    
    console.time('populateMissingCoordinates');

    const distanceBetween = (pointA, pointB) => {
      const meters = geolib.getDistance(pointA, pointB, 10);
      return meters;
    };

    const overallDist = Math.round(distanceBetween(coordinateList.head, coordinateList .tail));
    const minDist = overallDist > 3218 ? overallDist / 10 : overallDist / 5; 
    const maxDist = overallDist > 3218 ? minDist * 2 : minDist * 4;

    const findIntermediary = (pointA, pointB) => {
      return geolib.getCenter([pointA, pointB]);
    }
    
    const traverseCoordinateList = (list) => {      
      const tempList = list;

      if (tempList.current.next === null) {
        return tempList;
      }
  
      const spread = distanceBetween(
        {latitude: tempList.current.lat, longitude: tempList.current.lng},
        {latitude: tempList.current.next.lat, longitude: tempList.current.next.lng}
      );
      
      if (spread < minDist) {
        if (JSON.stringify(tempList.current.next) !== JSON.stringify(tempList.tail)) {
          tempList.current.deleteNextCoordinate();
          return traverseCoordinateList(tempList);
        } 
      } else if (spread > maxDist) {
        const {latitude: newLat, longitude: newLng} = findIntermediary(
          {latitude: tempList.current.lat, longitude: tempList.current.lng},
          {latitude: tempList.current.next.lat, longitude: tempList.current.next.lng}
        );
        tempList.current.insertNextCoordinate(newLat, newLng);
        return traverseCoordinateList(tempList);
      } else if (spread < maxDist && spread > minDist) {
        tempList.current = tempList.current.next;
        return traverseCoordinateList(tempList);
      }
      return tempList;
    };

    coordinateList.current = coordinateList.head;
    
    const returnList = traverseCoordinateList(coordinateList);
    console.timeEnd('populateMissingCoordinates');
    returnList ? resolve(returnList) : reject('There was an error calculating the correct data')
  });
};

module.exports = { getRouteCoordinates, populateMissingCoordinates };