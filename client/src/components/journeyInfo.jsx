import React from 'react';
import CSSModules from 'react-css-modules';
import style from './journeyInfo.css';
import { willRainShort } from '../../../helpers/weatherProcess';

class JourneyInfo extends React.Component {
  render() {
    console.log(this.props.journeyInfo);
    const { journeyInfo } = this.props;
    return (
      <React.Fragment>
        {journeyInfo.map(step => {
          return (
            <div id={step.uuid}>
              <div id={step.uuid + '-block'} styleName='colorBlock'>&nbsp;</div>
              <div id={step.uuid + '-info'} styleName='info'>
                {Math.floor(step.currTemp)}°  |  {willRainShort(step)}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default CSSModules(JourneyInfo, style);