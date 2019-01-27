import React from 'react';
import style from './footer.css';
import CSSModules from 'react-css-modules'

class Footer extends React.Component {
  render() {
    return(
      <div styleName='footer'>
        <div styleName='container'>
          <div styleName='attributions'>powered by<br />dark sky &amp; google</div> 
          <div styleName='createdBy'>created by<br />james tsukamoto</div> 
        </div>
      </div>
    );
  }
}

export default CSSModules(Footer, style);