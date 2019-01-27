import React from 'react';
import style from './footer.css';
import CSSModules from 'react-css-modules'

class Footer extends React.Component {
  render() {
    return(
      <div styleName='footer'>
        <div styleName='container'>
          <div styleName='attributions'>powered by dark sky &amp; google</div> 
          <div styleName='createdBy'>created by james tsukamoto<br /><a href='https://github.com/jamestsukamoto/bundleup'>github</a></div> 
        </div>
      </div>
    );
  }
}

export default CSSModules(Footer, style);