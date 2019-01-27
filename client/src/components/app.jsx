//Dependencies
import React from 'react';
import axios from 'axios';
import CSSModules from 'react-css-modules';
//Components
import Header from './header.jsx';
import Search from './search.jsx';
import Results from './results.jsx';
import style from './app.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      payload:[ { uuid: 'VZB8h_QcX',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 62.04,
      currSum: 'Mostly cloudy for the hour.',
      precip: 0 },
    { uuid: 'AYR9zv_Rv2',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 61.81,
      currSum: 'Mostly cloudy for the hour.',
      precip: 0 },
    { uuid: 'OdOvmW4sW-',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 61,
      currSum: 'Mostly cloudy for the hour.',
      precip: 0 },
    { uuid: 'bkCbxpR2N5',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 61.31,
      currSum: 'Mostly cloudy for the hour.',
      precip: 0 },
    { uuid: 'p2Us7oXck4',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 61.19,
      currSum: 'Partly cloudy for the hour.',
      precip: 0 },
    { uuid: '5xWwO-I4yV',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 60.41,
      currSum: 'Partly cloudy for the hour.',
      precip: 0 },
    { uuid: 'eikIQabW_R',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 60.46,
      currSum: 'Partly cloudy for the hour.',
      precip: 0 },
    { uuid: 'XnyLCaDLkx',
      daySum: 'Mostly cloudy throughout the day.',
      currTemp: 60.36,
      currSum: 'Partly cloudy for the hour.',
      precip: 0 } ],
      loading: false,
      submitted: false,
      origin: '747 Santa Ynez St. Stanford, CA 94305, USA',
      destination: '44 Market St, San Francisco, 94305, USA',
    };
  };

  search(start, end) {
    this.setState({
      loading: true,
      origin: start.split('+').join(' '),
      destination: end.split('+').join(' '),
    }, 
    () => {
      axios.get('/submit', {
        params: {start, end}
      })
        .then(response => {
          this.setState({
            payload: response.data
          })
          // this.setState(processRawWeatherData(response.data));
        })
        .catch(err => { throw ('Client failed to submit request', err); });
    });
  }

  udpateState(data) {
    console.log('State successfully updated: ', data)
  }

  render() {
    return (
      <div>
        <Header />
        <Search search={this.search.bind(this)} />
        <Results 
          origin={this.state.origin}
          destination={this.state.destination}
          weatherData={this.state.payload}
          />
      </div>
    )
  }
};

export default CSSModules(App, style);