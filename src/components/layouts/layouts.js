import { Layout, Menu, Icon, message, Dropdown } from 'antd';
import axios from 'axios'
import React from 'react'
import Utils from '../utils/utils'
import Index from '../pages/index/index'
import api from '../../api/index'
import './layout.css'
import '../../common/css/table.css'
import UserManagement from '../pages/systemManagement/userManagement/userManagement'
import RoleManagement from '../pages/systemManagement/roleManagement/roleManagement'
import InstituteManagement from '../pages/systemManagement/institute/institute'
import AuthorityManagement from '../pages/systemManagement/authorityManagement/authorityManagement'
import PropertyAutoCheck from '../pages/propertyLiveManagement/propertyAutoCheck/propertyAutoCheck'
import PropertyCount from '../pages/propertyLiveManagement/propertyCount/propertyCount'
import PropertyFix from '../pages/propertyLiveManagement/propertyWarning/propertyFix'
import PropertyIn from '../pages/propertyLiveManagement/propertyStandingBook/propertyIn'
import PropertyLend from '../pages/propertyLiveManagement/propertyLend/propertyLend'
import PropertyOut from '../pages/propertyLiveManagement/propertyCabinet/propertyCabinet'
import propertyHistory from '../pages/propertyLiveManagement/propertyHistory/propertyHistory'
import PropertyArea from '../pages/propertyLiveManagement/propertyArea/propertyArea'
import dbcenter from '../pages/propertyLiveManagement/propertyArea/dbcenter'
import Login from "../../components/login/login"
import Edit from './warning'
import General from '../pages/toobarManagement/general/general'
import Commit from '../pages/toobarManagement/commit/commit'
import Accept from '../pages/toobarManagement/accept/accept'
import Finish from '../pages/toobarManagement/finish/finish'
import Reply from '../pages/toobarManagement/reply/reply'
import Follow from '../pages/toobarManagement/follow/follow'
import Setup from '../pages/projectManagement/projectSetup/projectSetup'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
let storage = window.localStorage

class Layouts extends React.Component {
  constructor(props) {
    super(props)
    this.updateParent = this.updateParent.bind(this)
    this.state = {
      timer: '',
      w: '',
      arr: [],
      target: 0,
      obj: {},
      hasAuthed: false,
      time: '',
      showWarning: false,
      num: 0,
      menu: [],//分好的权限
    }
  }
  //编辑使弹框消失
  updateParent() {
    this.setState({
      showWarning: false
    })
    //再次请求获取警告数据控制铃铛显示
    this.select()
    clearInterval(this.state.timer)
  }
  //点击弹出告警信息页面
  editWarning() {
    console.log("弹出告警信息页面")
    console.log(this.state.data)
    if (this.state.num > 0) {
      this.setState({
        showWarning: true
      })
    }
  }
  //给所有
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    const currentW = document.getElementsByClassName('ant-layout-sider')[0]
    console.log(currentW.style.width)
    this.setState({
      collapsed,
      w: currentW.style.width
    });
  };
  //控制header下方导航的样式
  getContent(e, props) {
    //判断e是否存在，解决移除元素后再次执行该方法的问题
    console.log('执行了')
    const arr = Object.values(this.state.obj)
    console.log(Object.keys(this.state.obj))
    if (e) {
      const url = props.history.location.pathname
      const content = e.item.props.children[e.item.props.children.length - 1]
      //解决左侧push不了路经的问题，如果已经push过，就先将其删掉，再添加，不然无法跳转
      if (arr.indexOf(url) > -1) {
        console.log('已经有了')
        for (let key in this.state.obj) {
          if (this.state.obj[key] === url) {
            delete this.state.obj[key]
          }
        }
      }
      this.state.obj[content] = url;
      console.log(this.state.obj)
    }
    this.setState({
      obj: this.state.obj,
      arr: Object.keys(this.state.obj)
    }, () => {
      // console.log(this.state.obj)
      const target = Array.from(document.getElementsByClassName('nav-menu-header'))
      // console.log(target)
      target.map(v => {
        // console.log(v)
        v.classList.remove('actived-bgc')
      })
      target[target.length - 1].classList.add('actived-bgc')

      this.changePosition(target[target.length - 1].innerText)
    })
  }
  //控制横向导航栏路由跳转
  changePosition(e) {
    console.log(e)
    let text = ''
    if (typeof (e) === 'string') {
      text = e
      this.state.obj[text] ? this.props.history.push(this.state.obj[text]) : this.props.history.push('/index')
    }
    else {
      console.log(e.target.innerText.split('页'))
      const arr = e.target.innerText.split('页')
      if (arr.length > 1 && arr[1].length > 0) {
        return
      }
      text = this.state.obj[e.target.innerText]
      this.state.obj[e.target.innerText] ? this.props.history.push(text) : this.props.history.push('/index')
    }
  }
  //获取路由地址
  getUrl() {
    console.log(this.props.history.location.pathname)
  }
  //改变选中的横向导航栏的背景色
  changeBgc(e) {
    console.log(e.target)
    const target = Array.from(document.getElementsByClassName('nav-menu-header'))
    target.map((v) => {
      v.classList.remove('actived-bgc')
    })
    e.target.classList.add('actived-bgc')
    this.getUrl()
  }
  //移除某个横向导航
  removeEl(e, v) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法
      e.stopPropagation();
    } else {
      e.cancelBubble = true; //IE阻止冒泡方法
    }
    delete this.state.obj[v]
    this.setState({
      obj: this.state.obj
    }, this.getContent())
  }
  //设计退出登录部分的功能
  logout() {
    console.log('logout')
    window.localStorage.clear()
    console.log(this)
    this.props.history.push("/login")
  }
  //给小铃铛发送请求
  select() {
    //给小铃铛发请求
    let num
    let timer
    api.alarm_selectAll_comein()
      .then(res => {
        num = res.data.data
        console.log(num)
        //如果查询到的数据不为0，就让小铃铛闪烁
        if (num > 0) {
          timer = setInterval(() => {
            this.changeBellBgc(num)
          }, 500)
        }
        else {
          let bgc = document.getElementsByClassName('data_bell')[0]
          console.log(bgc)
          bgc.style.background = "transparent"
        }
        this.setState({
          num: num,
          timer: timer
        })
      })
  }
  componentDidMount() {
    this.select()
    this.props.history.push('/index')
    // 修改侧面导航
    const className = document.getElementsByClassName("ant-layout-sider-children")[0]
    className.style.height = 84 + 'vh'
    //设置每秒刷新一次时间
    const self = this
    this.changeTime(self)
  }
  // id: "54", loginName: "13113221339"
  //改变铃铛背景色
  changeBellBgc(num) {
    if (num > 0) {
      let bgc = document.getElementsByClassName('data_bell')[0]
      if (bgc.style.background !== "red") {
        bgc.style.background = "red"
      } else {
        bgc.style.background = "transparent"
      }
    }
  }

  changeTime(self) {
    setInterval(() => {
      self.setState({
        time: new Date().toLocaleString()
      })
    }, 1000);
  }

  componentWillMount() {
    const self = this
    //获取用户登陆携带的id
    const id = storage.getItem('id')
    console.log(id)
    const account = storage.getItem('loginName')
    this.setState({
      account
    })
    if (account || id) {
      //更改登录验证
      this.setState({
        hasAuthed: true
      })
    }
    console.log(id, account)
    console.log('发送成功')
    const params = {
      "userId": id
    }
    //获取权限
    api.Layouts(params)
      .then(res => {
        console.log(res)
        res = res.data.data
        this.setState({
          menu: api.distr_anth(res)
        })
      })
      .catch(console.log('err'))
  }
  render() {
    const logout = (
      <Menu onClick={() => this.logout()}>
        <Menu.Item key="1">退出登录</Menu.Item>
        <Menu.Item key="2">预留</Menu.Item>
        <Menu.Item key="3">预留</Menu.Item>
      </Menu>
    );
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const { hasAuthed, num, menu } = this.state
    return hasAuthed ? (
      <Layout>
        {this.state.showWarning ? <Edit updateParent={this.updateParent}></Edit> : null}
        <Header style={{ background: '#3a6fcd', padding: '0', height: '8vh' }} >
          <ul style={{ display: 'flex', listStyle: 'none', color: 'white', height: '8vh', lineHeight: '8vh', textAlign: 'center', paddingLeft: 0 }}>
            <li style={{ marginRight: '55vw', width: 150 }}>资产管理平台</li>
            <li>{this.state.time + ' ' + week[new Date().getDay()]}</li>
            {/* <li className="office_bell" title="办公告警信息" style={{width:'60px'}}><Icon type="bell" /><span>0</span></li> */}
            <li onClick={() => this.editWarning()} className="data_bell" title="数据中心告警信息" style={{ width: '70px', marginLeft: 4, marginRight: 4 }}><Icon type="bell" /><span>{num}</span></li>
            <Dropdown overlay={logout}>
              <p>
                {this.state.account} <Icon type="down" />
              </p>
            </Dropdown>
          </ul>
        </Header>
        <Layout style={{ minHeight: '100vh', background: '#424f63' }} >
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
            style={{
              overflow: 'auto',
              height: '92vh',
              left: 0,
            }}
          >
            <div className="logo" />
            {menu[0]?(<Menu theme="dark" style={{ background: '#424f63' }} defaultSelectedKeys={['0']} mode="inline" onClick={(e) => this.getContent(e, this.props)}>
              { Object.keys(menu[0]).join("").indexOf("系统管理") !== -1 ? (<SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>系统管理</span>
                  </span>
                }
              >
                <Menu.Item key="1" onClick={() => Utils.prototype.goToUserManagement(this.props)}>
                  <Icon type="team" />
                  用户管理</Menu.Item>
                <Menu.Item key="2" onClick={() => Utils.prototype.goToInstituteManagement(this.props)}>
                  <Icon type="bank" />
                  机构管理</Menu.Item>
                <Menu.Item key="3" onClick={() => Utils.prototype.goToRoleManagement(this.props)}>
                  <Icon type="user" />
                  角色管理</Menu.Item>
              </SubMenu>) : null}
              { Object.keys(menu[0]).join("").indexOf("系统管理") !== -1 ?<SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="money-collect" />
                    <span>资产管理</span>
                  </span>
                }
              >
                <Menu.Item key="4" onClick={() => Utils.prototype.goToPropertyArea(this.props)}> <Icon type="download" />区域管理</Menu.Item>
                <Menu.Item key="5" onClick={() => Utils.prototype.goToPropertyIn(this.props)}> <Icon type="download" />资产台账</Menu.Item>
                <Menu.Item key="6" onClick={() => Utils.prototype.goToPropertyOut(this.props)}> <Icon type="export" />机柜管理</Menu.Item>
                <Menu.Item key="7" onClick={() => Utils.prototype.goToPropertyLend(this.props)}> <Icon type="select" />资产监控</Menu.Item>
                <Menu.Item key="8" onClick={() => Utils.prototype.goToPropertyFix(this.props)}> <Icon type="tool" />告警信息</Menu.Item>
                <Menu.Item key="9" onClick={() => Utils.prototype.goToPropertyAutoCheck(this.props)}> <Icon type="cloud-sync" />资产盘点</Menu.Item>
                <Menu.Item key="10" onClick={() => Utils.prototype.goToPropertyZSGC(this.props)}><Icon type="block" />资产历史</Menu.Item>
                <Menu.Item key="11" onClick={() => Utils.prototype.goToPropertyDiscard(this.props)}><Icon type="eye-invisible" />资产统计</Menu.Item>
              </SubMenu>:null}
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="table" />
                    <span>工单管理</span>
                  </span>
                }
              >
                <Menu.Item key="12" onClick={() => Utils.prototype.goTotoolbarGeneral(this.props)}> <Icon type="download" />概述</Menu.Item>
                <Menu.Item key="13" onClick={() => Utils.prototype.goTotoolbarCommit(this.props)}> <Icon type="download" />我提交的工单</Menu.Item>
                <Menu.Item key="14" onClick={() => Utils.prototype.goTotoolbarAccept(this.props)}> <Icon type="download" />我受理的工单</Menu.Item>
                <Menu.Item key="15" onClick={() => Utils.prototype.goTotoolbarFinish(this.props)}> <Icon type="download" />我完成的工单</Menu.Item>
                <Menu.Item key="16" onClick={() => Utils.prototype.goTotoolbarReply(this.props)}> <Icon type="download" />我回复的工单</Menu.Item>
                <Menu.Item key="17" onClick={() => Utils.prototype.goTotoolbarFollow(this.props)}> <Icon type="download" />我关注的工单</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="table" />
                    <span>项目管理</span>
                  </span>
                }
              >
                {/* <Menu.Item key="18" onClick={() => Utils.prototype.goToProjectRegister(this.props)}> <Icon type="download" />项目登记</Menu.Item> */}
                <Menu.Item key="19" onClick={() => Utils.prototype.goToProjectSetup(this.props)}> <Icon type="download" />项目立项</Menu.Item>
              </SubMenu>
            </Menu>):null}
          </Sider>
          <Layout>
            <Content style={{}}>
              <ul style={{ height: '6vh', display: 'flex', listStyle: 'none', marginBottom: 0, paddingTop: '1vh', background: '#d9dee4', paddingLeft: '2vw' }} onClick={(e) => this.changePosition(e)}>
                <li onClick={(e) => this.changeBgc(e)} className="nav-menu-header actived-bgc" style={{ padding: 5, }}><Icon type="home" />主页</li>
                {this.state.arr.map((v, index) =>
                  <li onClick={(e) => this.changeBgc(e)} className="nav-menu-header default-bgc" style={{ marginLeft: '0.5vw', background: '#fefefe', padding: 5 }} key={index}>{v}<Icon type="close" style={{ marginLeft: '1vw' }} onClick={(e) => this.removeEl(e, v)} /></li>
                )}
              </ul>
              <Switch>
                <Route exact path="/index" component={Index}></Route>
                <Route path="/index/userManagement" component={UserManagement}></Route>
                <Route path="/index/roleManagement" component={RoleManagement}></Route>
                <Route path="/index/instituteManagement" component={InstituteManagement}></Route>
                <Route path="/index/authorityManagement" component={AuthorityManagement}></Route>

                <Route path="/index/PropertyAutoCheck" component={PropertyAutoCheck}></Route>
                <Route path="/index/PropertyDiscard" component={PropertyCount}></Route>
                <Route path="/index/PropertyFix" component={PropertyFix}></Route>
                <Route path="/index/PropertyIn" component={PropertyIn}></Route>
                <Route path="/index/PropertyLend" component={PropertyLend}></Route>
                <Route path="/index/PropertyOut" component={PropertyOut}></Route>
                <Route path="/index/PropertyZSGC" component={propertyHistory}></Route>
                <Route path="/index/PropertyArea" component={PropertyArea}></Route>
                <Route path="/index/dbCenter" component={dbcenter}></Route>

                <Route path="/index/toobarGeneral" component ={General} ></Route>
                <Route path="/index/toobarCommit" component ={Commit} ></Route>
                <Route path="/index/toobarAccept" component ={Accept} ></Route>
                <Route path="/index/toobarFinish" component ={Finish} ></Route>
                <Route path="/index/toobarReply" component ={Reply} ></Route>
                <Route path="/index/toobarFollow" component ={Follow} ></Route>

                <Route path="/index/projectSetup" component ={Setup} ></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    ) : (
        <Router>
          <Switch>
            <Route path="/login" component={Login} ></Route>
            <Redirect to='/login' />
          </Switch>
        </Router>
      )
  }
}

export default Layouts;