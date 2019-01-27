import React from 'react';
import CSSModules from 'react-css-modules';
import style from './journeyInfo.css';
import { willRainShort, findColor } from '../../../helpers/weatherProcess';

class JourneyInfo extends React.Component {
  render() {
    const { journeyInfo, origin, destination } = this.props;

    return (
      <div styleName='journeyContainer'>
        <div styleName='journeyTitle'>
          Along the journey:
        </div>
        <img src={`https://s3-us-west-2.amazonaws.com/bundleup/pin.svg`} width='25px' height='30px' styleName='pin'></img>
        <div styleName='address'>
          {origin}
        </div>
        {journeyInfo.map(step => {
          return (
              <React.Fragment>
                <div id={step.uuid + '-block'} styleName={findColor(step)}>&nbsp;</div>
                <div id={step.uuid + '-info'} styleName='info'>
                  {Math.floor(step.currTemp)}°&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{willRainShort(step)}
                </div>
              </React.Fragment>
          );
        })}
        <img src={`https://s3-us-west-2.amazonaws.com/bundleup/pin.svg`} width='25px' height='50px' styleName='pin'></img>
        <div styleName='address'>
          {destination}
        </div>
      </div>
    );
  }
}

export default CSSModules(JourneyInfo, style);