import React, {Component} from 'react';
import Header from './_layout/Header'
import Middle from './_layout/Middle'
import './index.less'

import store from './rematch'
const { dispatch } = store

class App extends Component {
  componentDidMount() {
    dispatch.getFile.getMdText()
  }

  render() {
    return (
        <><Header/><Middle/></>
    );
  }
}

export default App;
