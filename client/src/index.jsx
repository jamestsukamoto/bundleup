import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

ReactDOM.hydrate( <App />, document.getElementById('app'));
// ReactDOM.render( <App />, document.getElementById('app'));