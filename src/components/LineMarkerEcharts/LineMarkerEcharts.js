import React, { Component } from 'react';
import  './dark';

// 引入 ECharts 主模块
const echarts = require('echarts');

class EchartsTest extends Component {

  componentDidMount() {
    const {option} =this.props;
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'),'dark');

    myChart.setOption(option);
  }

  render() {
    return (
      <div id="main" style={{ width: 400, height: 400 }} />
    )
  }
}

export default EchartsTest;


