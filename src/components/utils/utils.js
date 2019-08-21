import React from 'react'
class Utils extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 123,
    }
  }

  //系统管理
  goToUserManagement(props) {
    console.log(props)
    props.history.push('/index/userManagement')
  }
  goToRoleManagement(props) {
    console.log(props)
    props.history.push('/index/roleManagement')
  }
  goToInstituteManagement(props) {
    console.log(props)
    props.history.push('/index/instituteManagement')
  }
  goToAuthorityManagement(props) {
    props.history.push('/index/authorityManagement')
  }
  //资产信息管理

  goToPropertyArea(props) {
    props.history.push('/index/PropertyArea')
  }
  goToDBcenter(props) {
    props.history.push("/index/dbCenter")
  }
  goToPropertyAutoCheck(props) {
    props.history.push('/index/PropertyAutoCheck')
  }
  goToPropertyDiscard(props) {
    props.history.push('/index/PropertyDiscard')
  }
  goToPropertyFix(props) {
    props.history.push('/index/PropertyFix')
  }
  goToPropertyIn(props) {
    props.history.push('/index/PropertyIn')
  }
  goToPropertyLend(props) {
    props.history.push('/index/PropertyLend')
  }
  goToPropertyOut(props) {
    props.history.push('/index/PropertyOut')
  }
  goToPropertyZSGC(props) {
    props.history.push('/index/PropertyZSGC')
  }

  //工单管理
  goTotoolbarGeneral(props) {
    props.history.push('/index/toobarGeneral')
  }
  goTotoolbarCommit(props) {
    props.history.push('/index/toobarCommit')
  }
  goTotoolbarAccept(props) {
    props.history.push('/index/toobarAccept')
  }
  goTotoolbarFinish(props) {
    props.history.push('/index/toobarFinish')
  }
  goTotoolbarReply(props) {
    props.history.push('/index/toobarReply')
  }
  goTotoolbarFollow(props) {
    props.history.push('/index/toobarFollow') 
  }

  //项目管理
  goToProjectSetup(props) {
    props.history.push('/index/projectSetup') 
  }
  goToProjectRegister(props) {
    props.history.push('/index/projectRegister') 
  }
}

// export default withRouter(Utils)
export default Utils