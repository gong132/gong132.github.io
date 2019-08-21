import React, { Component } from 'react'
import { Icon, Table, Select, Button, Input, AutoComplete } from 'antd'
import api from '../../../../api/index'
import { Resizable } from 'react-resizable';
import './propertyFix.css'
const InputGroup = Input.Group;
const { Option } = Select
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};
class propertyHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btns:'',
      right_click: false,
      id: '',
      showAlarm: false,
      data: [

      ],
      select_arr: [
        '模块编码', '模块IP', '机柜编号', '机柜名称', '创建时间', '数据中心', '部署楼层', '房间号', '列'],
      totalWidth: '',
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
          title: '模块编码',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '模块IP',
          dataIndex: 'moduleIp',
          width: 100,
          sorter: (a, b) => a.moduleIp - b.moduleIp,
        },
        {
          title: '告警类型',
          dataIndex: 'alarmInfoType',
          width: 140,
        },
        {
          title: '告警级别',
          dataIndex: 'alarmInfoLevel',
          width: 140,
          sorter: (a, b) => a.alarmInfoLevel - b.alarmInfoLevel,
        },
        {
          title: '告警状态',
          dataIndex: 'alarmInfoStatus',
          width: 100,
          sorter: (a, b) => a.alarmInfoStatus - b.alarmInfoStatus,
        },
        {
          title: '机柜编号',
          dataIndex: 'equipmentCode',
          width: 100,
          sorter: (a, b) => a.equipmentCode - b.equipmentCode,
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
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const classList = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    const startTime = document.getElementById('startTime').value
    const endTime = document.getElementById("endTime").value
    console.log(startTime,endTime)
    console.log(classList[0].innerText)
    const first_char = classList[0].innerText
    const third_char = classList[2].innerText
    const di_1 = this.state.columns.filter(v => {
      return v.title === first_char
    })
    const di_2 = this.state.columns.filter(v => {
      return v.title === third_char
    })
    console.log(di_1)
    //分别获取每一个框的值，再将他们组合
    const second_sel = classList[1].innerText.trim()
    console.log(second_sel)
    let first_sel = di_1[0].dataIndex
    let third_sel = di_2[0].dataIndex
    let fourth_sel = classList[3].innerText.trim()
    let params = {};
    params["createStartDate"] = startTime
    params["createEndDate"] = endTime
    params[first_sel] = second_sel;
    params[third_sel] ? params[third_sel] = params[third_sel] : params[third_sel] = fourth_sel;
    console.log(params)
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    api.Warning_selectAll(params)
      .then(res => {
        console.log(res)
        const data = res.data.data || []
        //根据获取的status和newStatus来添加描述
        data.map(v => {
          switch (Number(v.alarmInfoType)) {
            case 0:
              v.alarmInfoType = "下线"
              break;
            case 1:
              v.alarmInfoType = "上线"
              break;
            case 2:
              v.alarmInfoType = "空标签"
              break;
            case 3:
              v.alarmInfoType = "资产信息不全 "
              break;
            case 4:
              v.alarmInfoType = "模块上线 "
              break;
            case 5:
              v.alarmInfoType = "模块下线 "
              break;
          }
          switch (Number(v.alarmInfoLevel)) {
            case 1:
              v.alarmInfoLevel = "一级告警"
              break;
            case 2:
              v.alarmInfoLevel = "二级告警"
              break;
            case 3:
              v.alarmInfoLevel = "三级告警 "
              break;
          }
          switch (Number(v.alarmInfoStatus)) {
            case 0:
              v.alarmInfoStatus = "待确认"
              break;
            case 1:
              v.alarmInfoStatus = "已确认"
              break;
            case 2:
              v.alarmInfoStatus = "取消"
              break;
            case 3:
              v.alarmInfoStatus = "误警 "
              break;
          }
        })
        console.log(res)
        this.setState({
          data: data,
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
    console.log(width)
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
        let btns = api.distr_anth(res)[1]["告警信息"]
        this.setState({
          btns: btns
        })
      })
  }
  //鼠标移入事件
  onMouseEnter(record, event) {
    // console.log(record.alarmInfoStatus)
    // console.log(event.clientX)
    //判断移入的行是不是待确认的,是的话就可以显示弹框
    if (record.alarmInfoStatus == "待确认") {
      this.setState({
        showAlarm: true
      })
    }
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
    if (this.state.showAlarm || record.alarmInfoStatus == "待确认") {
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
  changeStatus(e) {
    this.setState({
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
    setTimeout(() => {
      this.askAgain(this)
    }, 0);
  }
  //发送状态改变请求后隐藏弹框，再次请求
  askAgain(self) {
    console.log(self)
    self.selectAll()
    self.setState({
      showAlarm: false
    })
  }
  componentDidMount() {
    //修改搜索框的宽度
    const classList = Array.from(document.getElementsByClassName('ant-select-selection'))
    classList.map(v => {
      v.style.width = "100px"
      return null;
    })
    const classList2 = Array.from(document.getElementsByClassName('ant-input-group-compact'))
    classList2.map(v => {
      v.style.width = "220px"
      return null;
    })
    const classList3 = Array.from(document.getElementsByClassName('ant-input'))
    classList3.map(v => {
      v.style.width = "140px"
      return null;
    })
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight - 200 + 'px'
  }
  components = {
    header: {
      cell: ResizeableTitle,
    },
  };
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
    return (
      <React.Fragment>
        <div style={{ display: 'flex', margin: 3, height: 30 }}>
          <InputGroup compact >
            <Select defaultValue="模块编码" className="custom_sel">
              {this.state.select_arr.map(v => {
                return (
                  <Option value={v} >{v}</Option>
                )
              })}
            </Select>
            <AutoComplete
              dataSource={this.state.dataSource}
              style={{ maxWidth: 100 }}
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup compact>
            <Select defaultValue="模块编码">
              {this.state.select_arr.map(v => {
                return (
                  <Option value={v} >{v}</Option>
                )
              })}
            </Select>
            <AutoComplete
              dataSource={this.state.dataSource}
              style={{ maxWidth: 100 }}
              onChange={this.handleChange}
            />
          </InputGroup>
          <p className="search-up-down" style={{ width: 70 }}>创建时间：</p><Input type="date" id="startTime" />-<Input type="date" id="endTime" />
          <Button type="primary" onClick={(e) => this.inquiry(e)}><Icon type="search" />查询</Button>
          {this.state.btns.indexOf("Excel导出")!==-1?<li style={{ listStyle: 'none', padding: '5px 0 0 15px' }}><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导出</li>:null}
        </div>
        <Table
          onRow={record => {
            return {
              onMouseEnter: event => { this.onMouseEnter(record, event) },
              onContextMenu: event => { this.rightClick(record, event) },
              onMouseMove: event => { this.mouseLeave(record, event) }
            }
          }
          }
          bordered components={this.components}
          columns={
            columns
          }
          scroll={{ x: this.state.totalWidth + 200, y: document.body.clientHeight - 200 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 25,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
        {this.state.showAlarm ? <div className="custom_alarm" style={{ display: 'none' }}>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">已处理</p>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">误警告</p>
          <p onClick={(e) => { this.changeStatus(e) }} className="custom_alarm_son">取消</p>
        </div> : null}
      </React.Fragment>
    )
  }
}
export default propertyHistory;