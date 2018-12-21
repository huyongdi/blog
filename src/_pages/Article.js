import React, {Component} from 'react';
import View from './View'
import axios from 'axios'
import {Pagination, BackTop, Input, message} from 'antd';

const Search = Input.Search;
export default class Article extends Component {
  state = {
    mdArr: [],//文件列表
    currentPage: 1,//当前页码
    currentArticle: {
      title: '', //要展示文件的标题
      content: '', //要展示文件的内容
    },
    searchValue: '',//搜索框的值
  }

  allArticle = [] //所有文章
  webArticle = [] //所有文章
  otherArticle = [] //所有文章


  //搜索文章
  onChange = (e) => {
    this.setState({searchValue: e.target.value})
  }
  onSearch = (value) => {
    let newMdArr = []
    this.allArticle.forEach((item) => {
      if (item.title.includes(value)) {
        newMdArr.push(item)
      }
    })
    if (newMdArr.length === 0) {
      message.warning('没有与之匹配的文章！');
      return
    }
    this.setState({
      mdArr: newMdArr,
      currentPage: 1
    }, () => {
      this.showArticle()
    })
  }

  //点击文章分类
  typeClick = (type) => () => {
    this.setState({searchValue: ''})
    let mdArr = []
    if (type === 0) { //全部
      mdArr = this.allArticle
    } else if (type === 1) { //前端
      mdArr = this.webArticle
    } else if (type === 2) {//杂谈
      mdArr = this.otherArticle
    }
    this.setState({mdArr}, () => {
      this.showArticle()
    })
  }


  //获取 public/markdown下的md文件列表
  getMdFile = () => {
    axios.get('markdown').then((resp) => {
      this.getMdText(resp.data)
    })
  }

  //通过文件列表获取具体的md文件内容
  getMdText = async (data) => {
    let mdArr = []
    let obj = {}
    for (let i in data) {
      await axios.get(`markdown/${data[i]}`).then((respMD) => {
        obj = {
          title: data[i].substring(0, data[i].indexOf('.md')),
          content: respMD.data
        }
        const index = obj.content.indexOf('-hydtype')
        if (index > -1) { //杂谈
          const type = obj.content.substring(0, index)
          obj.content = obj.content.substring(index + 8, obj.content.length)
          if (type === 'other') { //杂谈
            this.otherArticle.push(obj)
          } else if (type === 'web') { //前端
            this.webArticle.push(obj)
          }
        }
        mdArr.push(obj)
      })
    }
    this.allArticle = mdArr
    this.setState({mdArr}, () => {
      this.showArticle()
    })
  }

  //通过页码对应文章填充到页面
  showArticle = () => {
    this.setState((state) => ({
      currentArticle: state.mdArr[state.currentPage - 1]
    }))
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
    if (JSON.stringify(nextState.mdArr) !== JSON.stringify(this.state.mdArr)) return true
    if (nextState.searchValue !== this.state.searchValue) return true
    return false
  }

  render() {
    const {currentArticle, mdArr, currentPage, searchValue} = this.state
    return (
        <div className='articleContent'>
          <div className='articleLeft'>
            <Search className='searchContent' size='small' placeholder="搜索文章标题" value={searchValue} onChange={value => this.onChange(value)}
                    onSearch={value => this.onSearch(value)}
                    enterButton/>
            <div className='typeContent'>
              <div onClick={this.typeClick(0)}>全部 (<span>{this.allArticle.length}</span>)</div>
              <div onClick={this.typeClick(1)}>前端 (<span>{this.webArticle.length}</span>)</div>
              <div onClick={this.typeClick(2)}>杂谈 (<span>{this.otherArticle.length}</span>)</div>
            </div>
            <div className='pageContent'>
              <Pagination simple current={currentPage} total={mdArr.length} pageSize={1} onChange={this.onPageChange}/>,
            </div>
          </div>
          <div className='articleRight'>
            <View title={currentArticle.title} detail={currentArticle.content}/>{/*哪一篇文章的内容显示*/}
          </div>
          <BackTop/>
        </div>
    );
  }
}


