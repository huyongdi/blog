import React, {Component} from 'react';
import View from './view'
import axios from 'axios'

export default class Article extends Component {
  state = {
    currentArticle: {
      title: '',
      content: '',
    }
  }

  componentDidMount() {
    //获取 public/markdown下的md文件
    let articleArr = []
    axios.get('markdown').then((resp) => {
      resp.data.forEach(async (item) => {
        Promise.resolve({
          title: item.substring(0,item.indexOf('.md')),
          content: (await axios.get(`markdown/${item}`)).data
        }).then((a) => {
          articleArr.push(a)
        })
      })
      setTimeout(() => {
        console.log(articleArr);
        this.setState({
          currentArticle: articleArr[0]
        })
      })
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


