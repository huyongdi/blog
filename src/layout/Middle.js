import React, {Component} from 'react';
import { Router, Link } from "@reach/router";
import Home from '../pages/Home'
import Article from '../pages/Article'
import About from '../pages/About'
export default class Header extends Component {
  render() {
    return (
        <div className='middleContent'>
          <Router>
            <Home path="/" />
            <About path="about" />
            <Article path="article" />
          </Router>
        </div>
    );
  }
}


