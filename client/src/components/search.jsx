import React from 'react';
// import SearchBar from 'material-ui-search-bar';
import Script from 'react-load-script';
import CSSModules from 'react-css-modules';
import style from './search.css';

import TOKEN from '../../../config.js';


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: '',
      destination: '',
      focus: null,
    };
    this.search = this.search.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.focus = this.focus.bind(this)
  };

  search(event) {
    event.preventDefault();
    const { origin, destination } = this.state; 
    const start = origin.split(' ').join("+");
    const end = destination.split(' ').join("+");
    this.props.search(start, end);
  }

  handleChange(event) {
    const value = event.target.value;
    const key = event.target.id;
    this.setState(() => {
      return {[key]: value}
    });
  }

  focus(event) {
    const value = event.target.id;
    this.setState(() => {
      return {focus: value}
    });
  }

  handleScriptLoad() {
    const options = {
      types: ['address'],
    };
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.origin = new google.maps.places.Autocomplete(
      document.getElementById('origin'),
      options,
    );
    this.destination = new google.maps.places.Autocomplete(
      document.getElementById('destination'),
      options,
    );
    this.origin.addListener('place_changed', () => this.handlePlaceSelect('origin'));
    this.destination.addListener('place_changed', () => this.handlePlaceSelect('destination'));
  }

  handlePlaceSelect(target) {
    const addressObject = target === 'origin' 
      ? this.origin.getPlace()
      : this.destination.getPlace();
    const address = addressObject.address_components;

    if (address) {
      this.setState(
        { [target]: addressObject.formatted_address }
      );
    };
  }

  render() {

    return (
      <div styleName='searchBar'>
        <Script 
          url={`https://maps.googleapis.com/maps/api/js?key=${TOKEN.MAPS_TOKEN}&libraries=places`} 
          onLoad={this.handleScriptLoad} 
        />
        <p styleName='subtitle'>The Weather App for Motorcycle Commuters</p>
        <input 
          styleName='origin'
          id='origin'
          placeholder='starting address' 
          value={this.state.origin}
          onChange={this.handleChange}
          onFocus={this.focus}
          />
        <input 
          styleName='destination'
          id='destination'
          placeholder='destination' 
          value={this.state.destination}
          onChange={this.handleChange}
          onFocus={this.focus}
        />
        <button styleName='searchButton' id="searchButton" onClick={this.search}>Go</button>
      </div>
    );
  };
  
}

export default CSSModules(Search, style);