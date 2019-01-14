//Dependencies
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
//Components
import Header from './header.jsx';
import Search from './search.jsx';
import Results from './results.jsx';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      state: 'here',
      results: ''
    };
  };

  search(lat1, lng1, lat2, lng2) {
    axios.get('/submit', {
      params: {lat1, lng1, lat2, lng2}
    })
      .then(response => {
        console.log('success!', response.data);
        this.setState({
          results: JSON.stringify(response.data)
        })
      })
      .catch(err => { throw ('Client failed to submit request', err); });
  }

  udpateState(data) {
    console.log('State successfully updated: ', data)
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <Search search={this.search.bind(this)} />
        <Results results={this.state.results} />
      </div>
    )
  }
};

export default App;