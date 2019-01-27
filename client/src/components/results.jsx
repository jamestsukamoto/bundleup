import React from 'react';
import CSSModules from 'react-css-modules';
import style from './results.css';
import { processRawWeatherData, findIcon } from '../../../helpers/weatherProcess';

import TripSummary from './tripSummary.jsx';
import JourneyInfo from './journeyInfo.jsx';
import Prompt from './prompt.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: null,
    };
  };

  render() {
    const { weatherData, origin, destination } = this.props;
    const processedData = weatherData 
      ? processRawWeatherData(weatherData)
      : null;
    const icon = processedData 
      ? findIcon(processedData.summary) 
      : null;

    return (
      <div styleName='resultsBody'>
      {processedData && 
        <React.Fragment>
          <TripSummary summary={processedData} icon={icon}/>
          <JourneyInfo 
            origin={origin}
            destination={destination}
            journeyInfo={weatherData}
          />
        </React.Fragment>
      }
      {!processedData && 
        <Prompt />
      }
      </div>
    );
  };

}

export default CSSModules(Results, style);