import React, { Component } from 'react';
// import { connect } from 'dva';
import { router } from 'umi';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';


class House extends Component {

  componentDidMount() {
    // 页面传产取值
    console.log('>>>>>ziiziziziiziziziziizi');
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div onClick={()=>  router.push('/submenu/home')}>ziiziziziiziziziziizi</div>
      </PageHeaderWrapper>
    );
  }
}

export default House;
