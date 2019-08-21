import React, { Component } from 'react'
import SockJS from 'sockjs-client'
import Axios from 'axios';
import { Tree, Form } from 'antd';
import api from '../../../../api/index'
import './propertyLend.css'
import echarts from 'echarts'

const { TreeNode } = Tree;

class PropertyLend extends Component {
  constructor() {
    super()
    this.selectAll = this.selectAll.bind(this)
    this.state = {
      headerData: {},
      btns:'',
      treeData: [],
      showDataTitle: false
    }
  }
  sock (id) {
    const _self = this
    console.log(_self)
    console.log(id)
    // if (id) {
    //   var sock = new SockJS(`${api.url}=${id}`);
    // }
    // else {
    //   var sock = new SockJS(`${api.url}=16`);
    // }  
    var sock = new SockJS('http://192.168.0.102/sock-js?equipModuleId=16')
    console.log('走到这里')
    sock.onopen = function () {
      console.log('open');
      sock.send("测试发送");
    };
    sock.onmessage = function (e) {
      console.log('message', e.data);
      if (e.data == 1) {
        console.log(_self)
        _self.selectAll()
      }
    };
    sock.onclose = function () {
      console.log('close');
    };
  }
  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.state)
    console.log(api.url)
    this.drawCirle()
    this.sock()
  }

  //画饼图
  drawCirle() {
    console.log(document)//先做一个判断
    console.log(this.state.headerData.dAssets)
    this.drawU(this.state.headerData.dAssets)
    const { headerData } = this.state
    const myEcharts = echarts.init(document.getElementById("myEcharts"))
    const baseCnt = headerData.uUpShelfCnt
    const totalCnt = headerData.uWeiCnt
    console.log(baseCnt)
    myEcharts.setOption({
      title: {
        text: 'U位占比图',
        textAlign: 'auto'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '65%',
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          data: [
            { value: [1 - baseCnt / totalCnt] * (baseCnt + totalCnt) },
            { value: baseCnt / totalCnt * (baseCnt + totalCnt), name: '已占用' }
          ]
        }
      ]
    })
  }
  //画U位占位图
  drawU(data) {
    console.log(data)
    let min = 1 //U的起始占位
    data = data || []
    //将U位图画出来
    const classList = Array.from(document.getElementsByClassName("U_loc_li"))
    data.map(v => {
      //设置占位样式
      if (v.status != 0) {
        let arr = Array(Number(v.occupyU) + 1).join(2).split("")
        console.log(arr)
        let time = 0
        arr.map(v_0 => {
          console.log(classList[v.locationU - 1 + time])
          classList[v.locationU + time - 1].style.backgroundColor = "red"
          time++
        })
      }
      //设置非占位样式
      else if (v.status == 0) {
        let arr = Array(Number(v.occupyU) + 1).join(2).split("")
        console.log(arr)
        let time = 0
        arr.map(v_0 => {
          console.log(classList[v.locationU - 1 + time])
          classList[v.locationU + time - 1].style.backgroundColor = "#f0f2f5"
          time++
        })
      }
    })
  }
  //查询所有数据
  selectAll(id) {
    console.log('id',id)
    if (id) {
      // Axios.get('http://192.168.0.101:8062/equip/info?equipModuleId=' + id)
      api.Action_selectAll(id)
        .then(res => {
          console.log(res.data.data)
          this.setState({
            headerData: res.data.data
          }, () => this.drawCirle())
        })
        .catch(console.log('err'))
    }
    // Axios.get('http://192.168.0.101:8062/equip/info?equipModuleId=2429927939')
    api.ZCJK_selectAll()
        .then(res => {
          console.log(res.data.data)
          this.setState({
            headerData: res.data.data
          }, () => this.drawCirle())
        })
        .catch(console.log('err'))
    //查找机柜总数
    console.log('机柜总数')
    // Axios.get('http://192.168.0.101:8062/equip/count')
    api.Cabinet_selectAll()
      .then(res => {
        this.setState({
          menu: res.data.data
        }, () => console.log(res.data.data))
      })
      .catch(console.log('err'))
    //查找数据中心
    // Axios.get('http://192.168.0.101:8062/equipArea/nav')
    api.Data_selectAll()
      .then(res => {
        console.log(res)
        this.setState({
          treeData: res.data.data || []
        })
      })
  }
  componentWillMount() {
    this.selectAll()
    //获取权限
    const id = window.localStorage.getItem('id')
    const params = {
      "userId": id
    }
    api.Layouts(params)
      .then(res => {
        res = res.data.data
        console.log(res)
        let btns = api.distr_anth(res)[1]["资产盘点"]
        this.setState({
          btns:btns
        })
      })
  }

  //点击展示数据中心菜单  
  showDataTitle() {
    console.log('点击展示数据中心菜单')
    this.setState({
      showDataTitle: !this.state.showDataTitle
    }, () => {
      const tar = document.getElementsByClassName('data_')[0]
      this.state.showDataTitle ? tar.style.display = 'block' : tar.style.display = 'none'
    })
  }
  //点击数据中心的菜单动态改变资产监控页面
  select_tree(e) {
    const { treeData } = this.state
    console.log(e.target.innerText)//点击的列号
    console.log(treeData)
    this.state.treeData.map(v_0 => {
      console.log('kaishi')
      v_0.floorVOS&&v_0.floorVOS.length>1 ? v_0.floorVOS.map(v_1 => {
        console.log(v_1)
        v_1.roomVOS&&v_1.roomVOS.length>1 ? v_1.roomVOS.map(v_2 => {
          v_2.colVOS&&v_2.colVOS.length>1 ? v_2.colVOS.map(v_3 => {
            v_3.equipmentVOS&&v_3.equipmentVOS.length>1 ? v_3.equipmentVOS.map(v_4 => {
              console.log(4)
              v_4.code === e.target.innerText ? this.setState({ id: v_4.id }, this.selectAll(this.state.id)) : v_4.code = ""//最终拿到需要传递的id
            }) : v_3.equipmentVOS = []
          }) : v_2.colVOS = []
        }) : v_1.roomVOS = []
      }) : v_0.floorVOS = []
    })
  }
  render() {
    // console.log('render')
    const { headerData, menu, treeData } = this.state
    // console.log(treeData)
    return (
      <React.Fragment>
        <ul className="headerData" style={{ color: "white" }}>
          <li>数据中心：{headerData.locationCenter ? headerData.locationCenter : ""}</li>
          <li>部署楼层：{headerData.floor}楼</li>
          <li>房间号：{headerData.room}房</li>
          <li>列：{headerData.col}</li>
          <li>ID：{headerData.id}</li>
        </ul>
        <div style={{ display: 'flex' }}>

          <div onClick={() => this.showDataTitle()} className="data_title" style={{ marginLeft: 100, backgroundColor: 'yellow', width: 100, height: 100, borderRadius: '50%', textAlign: 'center' }}>
            <br /><p style={{ fontSize: '2rem' }}>{treeData.length}</p><p>个数据中心></p>

          </div>
          <div className="data_">
            {
              treeData.length ? (
                <Tree onClick={(e) => this.select_tree(e)}>
                  {treeData.map(data => (
                    <TreeNode title={data.dbcenter} key={data.id}>
                      {data.floorVOS ? (<TreeNode title={data.floorVOS[0].floor} key={data.id}>
                        {data.floorVOS[0].roomVOS ? (<TreeNode title={data.floorVOS[0].roomVOS[0].room} key={data.id}>
                          {data.floorVOS[0].roomVOS[0].colVOS ? (data.floorVOS[0].roomVOS[0].colVOS.map((v, index) => (<TreeNode title={v.col} key={index}>
                            {v.equipmentVOS ? (v.equipmentVOS.map((v_1, index) => (<TreeNode title={v_1.code} key={index}></TreeNode>))) : ("isloading")}
                          </TreeNode>))) : ("")}
                        </TreeNode>) : 'b'}
                      </TreeNode>) : 'b'}
                    </TreeNode>
                  ))}
                </Tree>
              ) : (
                  'loading tree'
                )
            }
          </div>
          <div style={{ marginLeft: 100, backgroundColor: 'yellow', width: 100, height: 100, borderRadius: '50%', textAlign: 'center' }}>
            <br /><p>{menu}</p><p>个机柜</p>
          </div>
          <div id="myEcharts" style={{ width: 300, height: 300, float: 'right' }}>
          </div>
          {/* 占用的U位图 */}
          <div>
            <p>U 位占位展示图</p>
            <ol className="U_loc">
              <li className="U_loc_li"></li>
              <li className="U_loc_li"></li>
              <li className="U_loc_li"></li>
              <li className="U_loc_li"></li>
              <li className="U_loc_li"></li>
              <li className="U_loc_li"></li>
            </ol>
          </div>

        </div>

      </React.Fragment>
    )
  }
}
export default PropertyLend;