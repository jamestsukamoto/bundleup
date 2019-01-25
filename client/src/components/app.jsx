//Dependencies
import React from 'react';
import axios from 'axios';
import CSSModules from 'react-css-modules';
//Components
import Header from './header.jsx';
import Search from './search.jsx';
import Results from './results.jsx';
import { processRawWeatherData } from '../../../helpers/weatherProcess';
import style from './app.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      highTemp: 0,
      lowTemp: 0,
      summary: '',
      loading: false,
      submitted: false,
    };
  };

  search(start, end) {
    this.setState({
      loading: true
    }, 
    () => {
      axios.get('/submit', {
        params: {start, end}
      })
        .then(response => {
          this.setState(processRawWeatherData(response.data));
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
        <h1 styleName='cssTest'>Test Header</h1>
        {/* <Header /> */}
        <Search search={this.search.bind(this)} />
        <Results 
          summary={this.state.summary} 
          highTemp={this.state.highTemp}
          lowTemp={this.state.lowTemp}
          loading={this.state.loading}
          />
      </div>
    )
  }
};

export default CSSModules(App, style);