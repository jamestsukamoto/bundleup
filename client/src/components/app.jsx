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
      payload: [ 
        { uuid: 'zoNAjj38t',
          daySum: 'Mostly cloudy throughout the day.',
          currTemp: 61.03,
          currSum: 'Sunny for the hour.',
          precip: 0 
        },
        { uuid: 'Ef6pthXgo0',
          daySum: 'Mostly cloudy throughout the day.',
          currTemp: 61.37,
          currSum: 'Sunny for the hour.',
          precip: 0 
        } 
      ],
      loading: false,
      submitted: false,
      origin: '44 Market St, San Francisco, 94305, USA',
      destination: '1234 Tehama St, San Francisco, 94305, USA',
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
          weatherData={this.state.payload}
          />
      </div>
    )
  }
};

export default CSSModules(App, style);