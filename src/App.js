import React, { Component } from 'react';

import ChooseVol from './components/ChooseVol';

class App extends Component{
  render() {
    return (
      <div>
          {/*学生选老师*/}
          <ChooseVol/>
          {/*学生选老师结束*/}
      </div>
    );
  }
}

export default App;
