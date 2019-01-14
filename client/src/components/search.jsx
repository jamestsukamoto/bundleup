import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat1: '',
      lng1: '',
      lat2: '',
      lng2: '',
    };
    this.search = this.search.bind(this)
    this.onChangeLat1 = this.onChangeLat1.bind(this)
    this.onChangeLng1 = this.onChangeLng1.bind(this)
    this.onChangeLat2 = this.onChangeLat2.bind(this)
    this.onChangeLng2 = this.onChangeLng2.bind(this)
  };

  search(event) {
    event.preventDefault();
    this.props.search(this.state.lat1, this.state.lng1, this.state.lat2, this.state.lng2);
  }

  onChangeLat1(event) {
    let value = event.target.value;
    this.setState(state => {
      return {lat1: value}
    });
  };
  
  onChangeLng1(event) {
    let value = event.target.value;
    this.setState(state => {
      return {lng1: value}
    });
  };
  
  onChangeLat2(event) {
    let value = event.target.value;
    this.setState(state => {
      return {lat2: value}
    });
  };
  
  onChangeLng2(event) {
    let value = event.target.value;
    this.setState(state => {
      return {lng2: value}
    });
  };

  render() {
    return (
      <div>
        <form>
          <h3>Origin</h3>
          <input id="originLat" type="text" value={this.state.lat1} onChange={this.onChangeLat1} placeholder='latitude'></input>
          <input id="originLng" type="text" value={this.state.lng1} onChange={this.onChangeLng1} placeholder='longitude'></input>
          <h3>Destination</h3>
          <input id="destinationLat" type="text" value={this.state.lat2} onChange={this.onChangeLat2} placeholder='latitude'></input>
          <input id="destinationLng" type="text" value={this.state.lng2} onChange={this.onChangeLng2} placeholder='longitude'></input>
          <button onClick={this.search}>Go</button>
        </form>
      </div>
    );
  };

}

export default Search;