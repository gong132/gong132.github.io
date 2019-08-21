/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { List, Card, Button, Checkbox, Icon, Avatar } from 'antd';
import router from 'umi/router'
import styles from './index.less'

class Body extends React.Component {

  constructor() {
    super()
    this.add = this.add.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    this.state = {
      data: [
        {
          title: '待分析',
          defaultContent: ['希望支持笔记插入附件内容，以便于我把本地的文件插入到笔记中', '笔记编辑区支持表格单元格合并', '希望支持对外编辑共享功能', '作为经常要分享内容的用户，希望增加导出功能，这样可以将笔记快速分享给他人查看'],
          arr: [],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '分析中',
          arr: [],
          defaultContent: ['作为一名用户，希望支持最近浏览功能，以便于我更快的找到最近查看的笔记', '希望笔记支持导出', '希望有笔记本的概念，这样方便我整理笔记'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '架构设计中',
          arr: [],
          defaultContent: ['作为Android用户，希望支持NFC笔记功能', '笔记编辑区支持表格单元格合并'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '需求确认',
          arr: [],
          defaultContent: ['希望支持对外编辑共享功能'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '排期中',
          arr: [],
          defaultContent: ['希望增加查找功能，这样在笔记较多的时候可以快速查找'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '已排期',
          arr: [],
          defaultContent: ['笔记编辑区支持表格单元格合并'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '验收中',
          arr: [],
          defaultContent: ['作为经常要分享内容的用户，希望增加导出功能，这样可以将笔记快速分享给他人查看'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '已上线',
          arr: [],
          defaultContent: ['希望有笔记本的概念，这样方便我整理笔记'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
        {
          title: '关闭',
          arr: [],
          defaultContent: ['希望笔记支持导出'],
          len: 0,
          avatar: ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
        },
      ]
    }
  }

  componentDidMount() {
    console.log("我是mian");
    const classList = Array.from(document.getElementsByClassName("antd-pro-pages-main-index-content"))
    const len = classList.length
    this.setState({
      num: len,
      newNum: []
    })
  }

  // eslint-disable-next-line class-methods-use-this
  add(index) {
    console.log(index)
    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/no-access-state-in-setstate
    const { data } = this.state
    data[index].defaultContent.push("测试")
    this.setState({
      data
    })
  }

  goToDetail() {
    // const {history} = this.props
    router.push("/main/detail")
  }

  render() {
    const { data } = this.state
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    return (
      <React.Fragment>
        <div className={styles.body}>
          {data.map((v, index) => {
            return (
              <div className={styles.card}>
                <p className={styles.header}>{v.title}<span className={styles.custom_num}>{v.defaultContent.length} &nbsp;···</span></p>
                {v.defaultContent.map((content, index_2) => {
                  return (
                    <p className={styles.content}>
                      <input type="checkbox" />
                      <p className={styles.content_son} onClick={this.goToDetail}>{content}</p>
                      <Avatar icon="user" src={v.avatar[index_2]} size="small" style={{ width: 25, marginRight: 5 }} />
                    </p>
                  )
                })}
                <Button type="dashed" onClick={() => this.add(index)} style={{ width: '100%' }}>
                  <Icon type="plus" /> Add field
                </Button>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}
export default Body