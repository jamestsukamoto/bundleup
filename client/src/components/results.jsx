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

  // body() {
  //   const { loading, summary, highTemp, lowTemp } = this.props;
  //   if (loading) {
  //     return <img src='https://s3-us-west-2.amazonaws.com/bundleup/ZKZg.gif' height='100' width='100'></img>
  //   } 
  //   return (
  //     <React.Fragment>
  //       <p>Expect: {summary}</p>
  //       <p>High: {highTemp}</p>
  //       <p>Low: {lowTemp}</p>
  //     </React.Fragment>
  //   );
  // }

  render() {
    const { weatherData } = this.props;
    console.log(weatherData);
    const processedData = weatherData 
      ? processRawWeatherData(weatherData)
      : null;
    const icon = findIcon(processedData.summary);

    return (
      <div styleName='resultsBody'>
      {processedData && 
        <React.Fragment>
          <TripSummary summary={processedData} icon={icon}/>
          {/* <JourneyInfo journeyInfo={weatherData}/> */}
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