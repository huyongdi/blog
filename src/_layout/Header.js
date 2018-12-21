import React, {Component} from 'react';
import { Router, Link } from "@reach/router";

export default class Header extends Component {
  render() {
    return (
        <div className='headerContent'>
          <Link to="/">主页</Link>
          <Link to="about">关于</Link>
          <Link to="article">文章</Link>
          <a href="oldVersion/index.html" target='_blank'>旧版</a>
        </div>
    );
  }
}


