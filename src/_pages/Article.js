import React, {Component} from 'react';
import View from './view'
import articleObj from '../articles/articles'
export default class Article extends Component {
  state={
    currentArticle:{
      title:'',
      content:'',
    }
  }
  componentDidMount() {
    console.log(articleObj.articleArr);
    this.setState({
      currentArticle:articleObj.articleArr[0]
    })
  }

  render() {
    const {currentArticle} = this.state
    return (
        <div className='articleContent'>
          <div className='articleLeft'>
            <div>前端(2)</div>
            <div>零碎(1)</div>
            <div>随笔(1)</div>
          </div>
          <div className='articleRight'>
            <View title={currentArticle.title} detail={currentArticle.content}/>
          </div>
        </div>
    );
  }
}


