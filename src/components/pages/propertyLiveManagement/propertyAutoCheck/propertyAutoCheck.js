import React, { Component } from 'react'
import { Icon, Table, } from 'antd'
import Detail from './detail'
import Compare from './compare'
import Axios from 'axios';
import api from '../../../../api';
class PropertyAutoCheck extends Component {
  constructor() {
    super()
    this.updateParent = this.updateParent.bind(this)
    this.state = {
      data: [
        {
          id: '1',
          batchNum: '0719',
          assetsNum: '1233',
          updateUserId: 'admin',
          updateTime: '20190719'
        }

      ],
      isShowDetails: false,
      isShowCompare: false,
      totalWidth: '',
      content: {},
      title: [],
      dataIndex: [],
      btns: '',
      columns: [
        {
          fixed: 'left',
          title: '',
          dataIndex: 'id',
          width: 40,
          align: 'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder: 'ascend'
        },
        {
          title: '批次号',
          dataIndex: 'batchNum',
          width: 160,
          sorter: (a, b) => a.batchNum - b.batchNum,
        },
        {
          title: '资产总数',
          dataIndex: 'assetsNum',
          width: 100,
          sorter: (a, b) => a.assetsNum - b.assetsNum,
        },

        {
          title: '操作员',
          dataIndex: 'userName',
          width: 80,
          sorter: (a, b) => a.userName - b.userName,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 180,
          sorter: (a, b) => a.createTime - b.createTime,
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record, index) => <div className="nav">
            {this.state.btns.indexOf("详情") !== -1 ? <li onClick={() => this.details(text, record, index)}><span className="glyphicon glyphicon-log-out " style={{ color: '#605ca8', marginRight: 5 }}></span>详情</li> : null}
            {/* <li onClick={() => this.compare()}><span className="glyphicon glyphicon-transfer" style={{ color: '#605ca8', marginRight: 5 }}></span>比对</li> */}
          </div>
        },
      ]
    }
  }
  //控制显示details界面
  details(text, record, index) {
    this.setState({
      isShowDetails: true,
      batchNum: text.batchNum
    })
    console.log(text, record, index)
  }
  //控制显示比对页面
  compare() {
    this.setState({
      isShowCompare: true
    })
  }
  //控制父子传值使页面消失
  updateParent() {
    this.setState({
      isShowDetails: false,
      isShowCompare: false
    })
  }
  //盘点插入
  addInstitute() {
    // Axios.post('http://192.168.0.109:8062/assetsCheck/insertCheck')
    api.Check_insert()
      .then(res => {
        console.log(res)
        this.selectAll()
      })
  }
  showTotal(total) {
    return total
  }
  //查询所有数据
  selectAll(params) {
    // api.Check_selectAll(params)
    // Axios.get('http://192.168.0.109:8062/assetsCheck/selectCheck', params)
    api.Check_selectAll(params)
      .then(res => {
        console.log(res)
        let data = res.data.data || []
        data.map(v => {
          v.moduleStatus == 1 ? v.moduleStatus = "上线" : v.moduleStatus = "下线"
        })
        this.setState({
          data: res.data.data
        })
      })
  }
  componentWillMount() {
    this.selectAll()
    let width = 0;
    let arr = [];
    let arr2 = [];
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
      arr.push(v.title)
      arr2.push(v.dataIndex)
    })
    this.setState({
      totalWidth: width,
      title: arr,
      dataIndex: arr2
    })
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
          btns: btns
        })
      })
  }
  componentDidMount() {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = 80 + 'vh'
  }
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    const { btns } = this.state
    return (
      <React.Fragment>
        <ul className="nav">
          {btns.indexOf("盘点") !== -1 ? <li onClick={() => this.addInstitute()}> <span className="glyphicon glyphicon-search" style={{ color: '#00a65a' }}></span> 盘点</li> : null}
          {btns.indexOf("盘点") !== -1 ? <li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />导入</li> : null}
        </ul>
        <Table bordered
          rowKey = {record => record.id}
          columns={
            columns
          }
          scroll={{ y: document.body.clientHeight - 200 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 15,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
        {this.state.isShowDetails ? <Detail updateParent={this.updateParent} batchNum={this.state.batchNum}></Detail> : null}
        {this.state.isShowCompare ? <Compare updateParent={this.updateParent}></Compare> : null}
      </React.Fragment>
    )
  }
}
export default PropertyAutoCheck;