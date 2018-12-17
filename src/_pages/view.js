import React, {Component} from 'react';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    console.log(state);
    return props
  }

  render() {
    return (
        <div className='viewContent'>
          <div className='viewTitle'>
            {this.props.title}
          </div>
          <div className="viewContent" dangerouslySetInnerHTML={{__html: this.props.detail}}/>
        </div>
    );
  }
}


