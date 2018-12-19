import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/swiper-4.3.3.min.css';
import './assets/css/dshxcommon.css';
import './assets/css/styledshx.css';

import './assets/js/flexible.debug';
import './assets/js/flexible_css.debug';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
