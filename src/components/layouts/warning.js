import React from 'react'
import { Form, Select, Input, TreeSelect, Table } from 'antd'
import api from '../../api/index'
const { Option } = Select
const { TreeNode } = TreeSelect;


class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      titles: ['数据中心', '部署楼层'],
      submit: '',
      dataIndex: ['dbcenter', 'floor'],
      value: undefined,
      obj: [
        { 'floor': '部署楼层' },
        { 'room': '房间号' },
        { 'col': '列' }
      ],
      totalWidth: "",
      showAlarm: false,
      right_click: false,
      columns: [

        {
          fixed: 'left',
          title: '',
          dataIndex: 'id_custom',
          width: 40,
          align: 'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder: 'ascend'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (text, record, index) => <div className="action">
            <a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span>查看</a>
          </div>
        },
        {
          title: '模块编码',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '位置',
          dataIndex: 'locationU',
          width: 100,
          sorter: (a, b) => a.moduleIp - b.moduleIp,
        },
        {
          title: '告警类型',
          dataIndex: 'alarmInfoType',
          width: 140,
        },
        {
          title: '告警状态',
          dataIndex: 'alarmInfoStatus',
          width: 100,
          sorter: (a, b) => a.alarmInfoStatus - b.alarmInfoStatus,
        },
        {
          title: '机柜名称',
          dataIndex: 'equipmentName',
          width: 100,
          sorter: (a, b) => a.equipmentName - b.equipmentName,
        },
        {
          title: '数据中心',
          dataIndex: 'dbcenter',
          width: 100,
          sorter: (a, b) => a.dbcenter - b.dbcenter,
        },
        {
          title: '部署楼层',
          dataIndex: 'floor',
          width: 100,
          sorter: (a, b) => a.floor - b.floor,
        },
        {
          title: '部署房间',
          dataIndex: 'room',
          width: 100,
          sorter: (a, b) => a.room - b.room,
        },
        {
          title: '列',
          dataIndex: 'col',
          width: 100,
          sorter: (a, b) => a.col - b.col,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: (a, b) => a.createTime - b.createTime,
        },
      ]
    }
  }
  onChange = value => {
    console.log(value);
    this.setState({ value });
  };
  componentWillMount() {
    let width = 0;
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
    })
    //获取小铃铛中的数据
    api.alarm_selectAll()
      .then(res => {
        console.log(res)
        console.log(res.data.data)
        const data = res.data.data || []
        data.map((v, index) => {
          v["id_custom"] = index + 1
        })
        this.setState({
          data: data,
          totalWidth: width
        })
      })
  }
  componentDidMount() {
    console.log(document.getElementsByClassName("ant-table-wrapper")[0])
    document.getElementsByClassName("ant-table-wrapper")[0].style.minHeight = 359 + 'px'
  }
  handleSubmit(e) {
    console.log(e)
    //将id拼接成字符串发给后端
    let arr = []
    this.state.data.map(v => {
      arr.push(v.id)
    })
    arr = arr.join(",")
    let params = {
      ids: arr
    }
    // params["ids"] = arr
    console.log(params)
    api.alarm_update(params)
      .then(res => {
        console.log(res)
        if (res.status==200) {
          this.props.updateParent()
        }
      })
  }
  //鼠标移入事件
  onMouseEnter () {
    this.setState({
      showAlarm: true
    })
  }
  //鼠标离开事件
  mouseLeave(record, event) {
    if (this.state.right_click) {
      const minus = Math.abs(event.clientX - this.state.clientX) >= Math.abs(event.clientY - this.state.clientY) ? Math.abs(event.clientX - this.state.clientX) : Math.abs(event.clientY - this.state.clientY)
      // console.log(minus)
      if (minus > 8) {
        const alert_alarm = document.getElementsByClassName("custom_alarm")[0]
        // console.log(alert_alarm)
        alert_alarm.style.display = "none"
      }
    }
  }
  //右键事件 
  rightClick(record, event) {
    //如果是待确认，就在下面执行右键代码事件
    if (this.state.showAlarm) {
      event.preventDefault()
      console.log('右键事件', record)
      this.setState({
        id: record.id
      })
      console.log(event.clientX)
      //获取点击的位置，放置弹框的位置
      //1.先获取弹框
      const alert_alarm = document.getElementsByClassName("custom_alarm")[0]
      console.log(alert_alarm)
      alert_alarm.style.display = "block"
      alert_alarm.style.left = event.clientX + 3 + 'px'
      alert_alarm.style.top = event.clientY + 3 + 'px'
    }
    //右键之后如果再进行移动某些范围，就将弹框清除
    this.setState({
      right_click: true,
      clientX: event.clientX,
      clientY: event.clientY
    })
  }
  //改变状态事件
  changeStatus (e) {
    this.setState({
      showAlarm:false,
      right_click:false
    })
    //需要id 和 事件编号
    let num = "";
    console.log(e.target.innerText)
    if (e.target.innerText == "已处理") {
      num = 1
    } else if (e.target.innerText == "误警告") {
      num = 3
    } else if (e.target.innerText == "取消") {
      num = 2
    }
    console.log(this.state.id, num)
    let params = {
      "id": this.state.id,
      "alarmInfoStatus": num
    }
    console.log("发送请求")
    api.change_status(params)
      .then(res => {
        console.log(res)
      })
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
    const { titles, data } = this.state
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, left: '10vw', top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '75vw', height: '65vh' }}>
          <span>详情</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '70vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '54vh', overflow: 'auto', padding: 10 }}>
            <Table
              onRow={record => {
                return {
                  onContextMenu: event => { this.rightClick(record, event) },
                  onMouseEnter: event => { this.onMouseEnter(record, event) },
                  onMouseMove: event => { this.mouseLeave(record, event) }
                }
              }
              }
              bordered components={this.components}
              columns={
                columns
              }
              scroll={{ x: this.state.totalWidth + 100 }}
              dataSource={this.state.data}
            />
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>全部已读</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
        {this.state.showAlarm ? <div className="custom_alarm" style={{ display: 'none' }}>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">已处理</p>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">误警告</p>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">取消</p>
        </div> : null}
      </React.Fragment >
    )
  }
}
export default Form.create()(Edit)