//Dependencies
import React from 'react';
import axios from 'axios';
//Components
import Header from './header.jsx';
import Search from './search.jsx';
import Results from './results.jsx';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      results: '',
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
          this.setState({
            loading: false,
            results: response.data
          })
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
        {/* <Header /> */}
        <Search search={this.search.bind(this)} />
        <Results results={this.state.results} loading={this.state.loading}/>
      </div>
    )
  }
};

export default App;