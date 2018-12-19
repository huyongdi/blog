import React, {Component} from 'react';
import View from './view'
import axios from 'axios'
import { Pagination } from 'antd';

export default class Article extends Component {
  state = {
    currentArticle: {
      title: '',
      content: '',
    }
  }

  //获取 public/markdown下的md文件
  getMdFile = ()=>{
    let articleArr = []
    axios.get('markdown').then((resp) => {
      resp.data.forEach(async (item) => {
        let respMd = (await axios.get(`markdown/${item}`)).data
//        console.log(respMd);
//        respMd = respMd.substring(respMd.indexOf('--- hyd'),respMd.length)
        Promise.resolve({
          title: item.substring(0, item.indexOf('.md')),
          content: respMd
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

  //页码改变
  onPageChange = (page)=>{
    console.log(page);
  }
  componentDidMount() {
   this.getMdFile()
  }

  render() {
    const {currentArticle} = this.state
    return (
        <div className='articleContent'>
          <div className='articleLeft'>
            <div className='typeContent'>
              <div>前端(2)</div>
              <div>零碎(1)</div>
              <div>随笔(1)</div>
            </div>
            <div className='pageContent'>
              <Pagination simple defaultCurrent={1} total={50} onChange={this.onPageChange}/>,
            </div>
          </div>
          <div className='articleRight'>
            <View title={currentArticle.title} detail={currentArticle.content}/>{/*哪一篇文章的内容显示*/}
          </div>
        </div>
    );
  }
}


