import React from 'react';
import CSSModules from 'react-css-modules';
import style from './header.css';


const Header = () => {
  return(
    <div>
      <h1 styleName='mainTitle'>BundleUp</h1>
    </div>
  )
}

export default CSSModules(Header, style);