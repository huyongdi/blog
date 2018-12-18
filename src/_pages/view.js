import React, {Component} from 'react';
const ReactMarkdown = require('react-markdown')

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(props, state) {
    return props
  }

  render() {
    return (
        <div className='viewContent'>
          <div className='viewTitle'>
            {this.props.title}
          </div>
          {/*<div className="viewDetail" dangerouslySetInnerHTML={{__html: this.props.detail}}/>*/}
          <ReactMarkdown className="viewDetail" source={this.props.detail} />,
        </div>
    );
  }
}


