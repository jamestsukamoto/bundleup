import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
    };
    this.body = this.body.bind(this);
  };


  body() {
    const { loading, summary, highTemp, lowTemp } = this.props;
    if (loading) {
      return <img src='https://s3-us-west-2.amazonaws.com/bundleup/ZKZg.gif' height='100' width='100'></img>
    } 
    return (
      <div>
        <p>Expect: {summary}</p>
        <p>High: {highTemp}</p>
        <p>Low: {lowTemp}</p>
      </div>
    );
  }

  render() {
    return (
      this.body()
    );
  };

}

export default Results;