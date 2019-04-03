const geolib = require('geolib');
const axios = require('axios');
const token = require('../config.js').MAPS_TOKEN;


const directions = {
  /**
   * Class representing a coordinate list
   * @class 
   */
  CoordinateList: class {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null;
    }

    /**
     * Adds a new tail to the end of the list
     * @param {string} lat - latitude of coordinate
     * @param {string} lng - longitude of coordinate
     */
    addToTail(lat, lng) {
      const newCoord = new directions.Coordinate(lat, lng);
      if (!this.head) {
        this.head = newCoord;
        this.tail = this.head;
        this.current = this.head;
      } else {
        this.current.next = newCoord;
        this.tail = this.current.next;
        this.current = this.current.next;
      }
    }

    /**
     * Array-like map function which applies a callback to each item
     * in the Coordinate List
     * @param {callback} 
     * @return {array} List of returns from the callback
     */
    map(callback) {
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
    }
  },

  /**
   * Class representing a coordinate
   * @class 
   */
  Coordinate: class {

    /**
     * Creates a new coordinate
     * @param {string} lat - latitude of coordinate
     * @param {string} lng - longitude of coordinate
     */
    constructor(lat, lng) { 
      this.lat = lat;  
      this.lng = lng;
      this.next = null;
    }

    /**
     * Inserts the next coordinate after the current coordinate
     * @param {string} lat - latitude of next coordinate
     * @param {string} lng - longitude of next coordinate
     */
    insertNextCoordinate(lat, lng) {
      let newCoordinate = new directions.Coordinate(lat, lng);
      newCoordinate.next = this.next;
      this.next = newCoordinate;
    }


    // Removes the next coordinate after the current coordinate    
    deleteNextCoordinate() {
      this.next = this.next.next;
    }
  },

  /**
   * Fetches initial list of coordinates from Google Directions API
   * @param {string} start - starting point
   * @param {string} end - destination
   * @return {array} Initial (but unprocessed/incomplete) list of coordinates
   *                 at which a weather query should be made 
   */
  getRouteCoordinates: function (start, end) {
    const coordsToDarkSky = new directions.CoordinateList();
  
    return new Promise((resolve, reject) => {
      axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${token}`)
        .then(results => {
          const steps = results.data.routes[0].legs[0].steps;
          steps.forEach(step => {
            coordsToDarkSky.addToTail(step.end_location.lat, step.end_location.lng);
          });
          return coordsToDarkSky;
        })
        .then((coordinates) => {
          resolve(coordinates)
        })
        .catch(err => reject(err));
    })
  }, 

  /**
   * Fills in missing & deletes unnecessary coordinates to get accurate, complete weather
   * @param {array} coordinateList - incomplete list of coordinates from getRouteCoordinates fn
   * @return {array} Complete, trimmed list of coordinates at which weather queries should be made
   */
  populateMissingCoordinates: function (coordinateList) {
    return new Promise((resolve, reject) => {    
      
      // Determines total route distance
      const distanceBetween = (pointA, pointB) => {
        const meters = geolib.getDistance(pointA, pointB, 10);
        return meters;
      };
      
      // Calculates min/max range at which weather should be queried based on overall distance
      // (More resolution for overall distances less than 2 miles)
      const overallDist = Math.round(distanceBetween(coordinateList.head, coordinateList .tail));
      const minDist = overallDist > 3218 ? overallDist / 10 : overallDist / 5; 
      const maxDist = overallDist > 3218 ? minDist * 2 : minDist * 4;
      
      // Finds & returns a middle point between 2 given coordinates
      const findIntermediary = (pointA, pointB) => {
        return geolib.getCenter([pointA, pointB]);
      }
      
      // Iterates through the list of coordinates
      const traverseCoordinateList = (list) => {      
        const tempList = list;
  
        if (tempList.current.next === null) {
          return tempList;
        }
    
        const spread = distanceBetween(
          {latitude: tempList.current.lat, longitude: tempList.current.lng},
          {latitude: tempList.current.next.lat, longitude: tempList.current.next.lng}
        );
        
        // If the next point is closer than the minDist threshold, delete the next point
        if (spread < minDist) {
          if (JSON.stringify(tempList.current.next) !== JSON.stringify(tempList.tail)) {
            tempList.current.deleteNextCoordinate();
            return traverseCoordinateList(tempList);
          } 
        // If the next point is further than the maxDist threshold, find the intermediate
        // point, add it in, and re-calculate.
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
      returnList ? resolve(returnList) : reject('There was an error calculating the correct data')
    });
  },
};

module.exports = directions;