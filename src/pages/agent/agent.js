import React, { Component } from 'react';
// import { connect } from 'dva';
import { Button, Drawer, Tree } from 'antd';
import { router } from 'umi';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';


class Analysis extends Component {

  componentDidMount() {
    // 页面传产取值
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div onClick={()=>  router.push('/submenu/home')}>2222</div>
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
