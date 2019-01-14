import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
    };
  };


  render() {
    return (
      <div>
        <p>{this.props.results}</p>
      </div>
    );
  };

}

export default Results;