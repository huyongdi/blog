import React, {Component} from 'react';
import View from './View'
import {Pagination, BackTop, Input, message} from 'antd';
import store from '../rematch'

const {dispatch} = store

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
    newMdArr.sort(this.sortFun)
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

  //通过rematch存的数据设置本页面的值
  setDateByRematch = async () => {
    let rematchState = store.getState().getFile
    if (rematchState.mdArr.length === 0) {  //避免F5刷新导致rematch数据丢失
      await dispatch.getFile.getMdText()
      rematchState = store.getState().getFile
    }
    this.setState({
      mdArr: rematchState.mdArr
    })
    this.allArticle = rematchState.mdArr
    this.webArticle = rematchState.webArticle
    this.otherArticle = rematchState.otherArticle
    this.showArticle()
  }

  componentDidMount() {
    this.setDateByRematch()
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


