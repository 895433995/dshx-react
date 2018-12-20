import React, { Component } from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/css/swiper-4.3.3.min.css';
import './assets/css/dshxcommon.css';
import './assets/css/styledshx.css';

import routes from './modle/router';

class App extends Component{
  render() {
    return (
      <Router>
          <div>
              {
                  routes.map((route,key)=>{
                      return <Route key={key} exact path={route.path} component={route.component}></Route>;
                  })
              }
          </div>
      </Router>
    );
  }
}

export default App;
