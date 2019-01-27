import React from 'react';
import CSSModules from 'react-css-modules';

import day from './tripSummary-day.css';
import night from './tripSummary-night.css';

class TripSummary extends React.Component {
  render() {
    const { summary, highTemp, lowTemp } = this.props.summary;
    const { icon } = this.props;
    return (
      <div styleName='summaryContainer'>
        <img src={`http://d1eaefdtgzzuxo.cloudfront.net/${icon}.svg`} styleName='icon'></img>
        <div styleName='summary'>{summary}</div>
        <div styleName='lowText'>Low</div>
        <div styleName='lowTemp'>{lowTemp}<span styleName='degree'>°</span></div>
        <div styleName='highText'>High</div>
        <div styleName='highTemp'>{highTemp}<span styleName='degree'>°</span></div>
      </div>
    );
  }
}

export default CSSModules(TripSummary, true ? day : night);
