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
import { isDay } from '../../../helpers/weatherProcess.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      payload: null,
      loading: false,
      submitted: false,
      origin: '747 Santa Ynez St, Stanford, CA 94305, USA',
      destination: '44 Tehama St, San Francisco, CA 94110, USA',
      error: false,
      errorMsg: '',
    };
  };

  // componentDidMount() {
  //   isDay();
  // }

  throwErr(errCode) {
    const errors = ['Uh oh.  Something went wrong. Please try again.', 'Please enter a valid start & end point.'];
    this.setState({
      error: true,
      errorMsg: errors[errCode]
    });
  }

  search(start, end) {
    this.setState({
      loading: true,
      error: false,
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
        })
        .catch(err => { 
          console.log(err);
          this.setState({
            error: true
          });
         });
    });
  }

  udpateState(data) {
    console.log('State successfully updated: ', data)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Search 
          search={this.search.bind(this)}
          error={this.state.error}
        />
        <Results 
          origin={this.state.origin}
          destination={this.state.destination}
          weatherData={this.state.payload}
          throwError={this.throwErr.bind(this)}
          error={this.state.error}
          errorMsg={this.state.errorMsg}
          />
        <Footer />
      </React.Fragment>
    )
  }
};

export default CSSModules(App, style);