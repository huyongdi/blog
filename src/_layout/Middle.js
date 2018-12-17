import React, {Component} from 'react';
import { Router, Link } from "@reach/router";
import Home from '../_pages/Home'
import Article from '../_pages/Article'
import About from '../_pages/About'
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


