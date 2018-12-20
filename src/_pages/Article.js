import React, {Component} from 'react';
import View from './view'
import axios from 'axios'
import {Pagination} from 'antd';

export default class Article extends Component {
  state = {
    mdArr: [],//文件列表
    currentPage: 1,//当前页currentPage
    currentArticle: {
      title: '', //要展示文件的标题
      content: '', //要展示文件的内容
    }
  }

  //获取 public/markdown下的md文件
  getMdFile = () => {
    let mdArr = []
    axios.get('markdown').then((resp) => {
      resp.data.forEach(async (item) => {
        console.log(1111);
        let respMd = (await axios.get(`markdown/${item}`)).data
        console.log(2222);
        mdArr.push({
          title: item.substring(0, item.indexOf('.md')),
          content: respMd
        })
      })
      console.log(mdArr);
      this.setState({mdArr}, () => {
        console.log(this.state.mdArr)
        this.showArticle()
      })
    })
  }

  //通过页码对应文章填充到页面
  showArticle = () => {
    Promise.resolve(this.state.mdArr[this.state.currentPage - 1]).then((currentArticle) => {
      this.setState({currentArticle})
    })
  }

  //页码改变
  onPageChange = (currentPage) => {
    this.setState({currentPage}, () => {
      this.showArticle()
    })
  }

  componentDidMount() {
    this.getMdFile()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState.currentArticle) !== JSON.stringify(this.state.currentArticle)) return true
    return false
  }

  render() {
    const {currentArticle, mdArr, currentPage} = this.state
    return (
        <div className='articleContent'>
          <div className='articleLeft'>
            <div className='typeContent'>
              <div>前端(2)</div>
              <div>零碎(1)</div>
              <div>随笔(1)</div>
            </div>
            <div className='pageContent'>
              <Pagination simple current={currentPage} total={mdArr.length} pageSize={1} onChange={this.onPageChange}/>,
            </div>
          </div>
          <div className='articleRight'>
            <View title={currentArticle.title} detail={currentArticle.content}/>{/*哪一篇文章的内容显示*/}
          </div>
        </div>
    );
  }
}


