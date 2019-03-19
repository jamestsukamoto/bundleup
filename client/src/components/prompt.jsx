import React from 'react';
import CSSModules from 'react-css-modules';
import style from './prompt.css';

class Prompt extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div styleName='prompt'>Enter your start &amp; end points to get the weather along your route</div>
      </React.Fragment>
    );
  }
}

export default CSSModules(Prompt, style);