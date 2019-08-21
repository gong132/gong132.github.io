import React, { Component,PureComponent } from 'react';
// import { connect } from 'dva';
import { Button, Drawer, Tree } from 'antd';
import {router} from 'umi';
import { getTimeDistance } from '@/utils/utils';
// import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import styles from './Analysis.less';
import moment from 'moment';
import LineMarkerEcharts from '@/components/LineMarkerEcharts/LineMarkerEcharts';

const { DirectoryTree, TreeNode } = Tree;

// @connect(({ chart, loading }) => ({
//   // chart,
//   // loading: loading.effects['chart/fetch'],
// }))
class Analysis extends Component {
  constructor(props){
    super(props)
    this.stl="";
    // this.time=moment().format('YYYY-MM-DD HH:mm:ss');
    this.state={
      time:moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }

  // state = {
  //   visibletest: false,
  //   // constart: true,
  // };

  componentWillMount(){
    this.stl= setInterval(() => {
      console.log('setInterval');
      this.setState({
        time:moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.stl)
  }




  // handleRangePickerChange = rangePickerValue => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue,
  //   });

  //   dispatch({
  //     type: 'chart/fetchSalesData',
  //   });
  // };

  // selectDate = type => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue: getTimeDistance(type),
  //   });

  //   dispatch({
  //     type: 'chart/fetchSalesData',
  //   });
  // };

  // isActive = type => {
  //   const { rangePickerValue } = this.state;
  //   const value = getTimeDistance(type);
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0], 'day') &&
  //     rangePickerValue[1].isSame(value[1], 'day') 
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  hanldeClick = () => {
    // this.setState({
    //   visibletest: true,
    // });
    
  }

  // onClose = () => {
  //   this.setState({
  //     visibletest: false,
  //   });
  // };

  // onSelect = (keys, event) => {
  //   console.log('Trigger Select', keys, event);
  // };

  // onExpand = () => {
  //   console.log('Trigger Expand');
  // };

  // hanldeRouter=()=>{
  //   router.push({
  //     pathname:'/agent',
  //     query: {
  //            a: 'b',
  //          },
  //   });
  // }


  render() {
    // const { visibletest } = this.state;

    const t=moment().format('YYYY-MM-DD HH:mm:ss');
    return (
      <div>
        <Button onClick={this.hanldeClick}>测试按钮</Button>
        <Button onClick={this.hanldeRouter} type="primary">测试路由</Button>
        <div>测试时间{this.state.time}</div>
        <LineMarkerEcharts />
      </div>
    );
  }
}

export default Analysis;
