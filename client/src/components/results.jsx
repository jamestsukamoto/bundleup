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
    const { loading, results } = this.props;
    if (loading) {
      return <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif' height='100' width='100'></img>
    } 
    return <p>{results}</p>
  }

  render() {
    return (
      <div>
        {this.body()}
      </div>
    );
  };

}

export default Results;