//Dependencies
import React from 'react';
import axios from 'axios';
import CSSModules from 'react-css-modules';
//Components
import Header from './header.jsx';
import Search from './search.jsx';
import Results from './results.jsx';
import Footer from './footer.jsx';
import style from './app.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      payload:null,
      loading: false,
      submitted: false,
      origin: null,
      destination: null,
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
      <React.Fragment>
        <Header />
        <Search search={this.search.bind(this)} />
        <Results 
          origin={this.state.origin}
          destination={this.state.destination}
          weatherData={this.state.payload}
          />
        <Footer />
      </React.Fragment>
    )
  }
};

export default CSSModules(App, style);