import articleList from '../../_pages/list'
import axios from "axios";

const sortFun = (a, b) => {
  return b['time'] < a['time'] ? -1 : 1
}

const getFile = {
  state: {
    mdArr: [],//所有文件列表
    otherArticle: [],//杂谈
    webArticle: [],//前端
  },
  reducers: {//改变 state
    changeAndSortList(state, payload) {
      return {
        mdArr: payload[0].sort(sortFun),
        otherArticle: payload[1].sort(sortFun),
        webArticle: payload[2].sort(sortFun),
      }
    },
  },
  effects: {
    async getMdText() { //通过文件列表获取具体的md文件内容
      let mdArr = []
      let otherArticle = []
      let webArticle = []
      let obj = {}
      for (let i in articleList) {
        const title = articleList[i].substring(0, articleList[i].lastIndexOf('/'))
        const time = articleList[i].substring(articleList[i].lastIndexOf('/') + 1, articleList[i].length)
        await axios.get(`${process.env.PUBLIC_URL}/markdown/${title}.md`).then((respMD) => {
          obj = {title: title, content: respMD.data, time: time}
          const index = obj.content.indexOf('-hydtype')
          if (index > -1) {
            const type = obj.content.substring(0, index)
            obj.content = obj.content.substring(index + 8, obj.content.length)
            if (type === 'other') { //杂谈
              otherArticle.push(obj)
            } else if (type === 'web') { //前端
              webArticle.push(obj)
            }
          }
          mdArr.push(obj)
        })
      }
      this.changeAndSortList([mdArr, otherArticle, webArticle])
    }
  }
}
export default getFile

