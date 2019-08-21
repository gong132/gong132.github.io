import React, { Component } from 'react'
import { Icon, Table, Select, Button, Input, AutoComplete,  } from 'antd'
import api from '../../../../api/index'
import { Resizable } from 'react-resizable';
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
      data: [

      ],
      select_arr: [
        '标签码', '资产名称', 'U位号', '模块编码', '模块IP', '机柜编号', '机柜名称', '创建时间'],
      totalWidth: '',
      btns:'',
      columns: [
        {
          fixed: 'left',
          title: '',
          dataIndex: 'id',
          width: 40,
          align:'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder:'ascend'
        },
        {
          title: '标签码',
          dataIndex: 'signCode',
          width: 140,
          sorter: (a, b) => a.signCode - b.signCode,
        },
        {
          title: '资产名称',
          dataIndex: 'name',
          width: 100,
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: '资产描述',
          dataIndex: 'discribe',
          width: 160,
        },
        {
          title: 'U位号',
          dataIndex: 'locationU',
          width: 160,
          sorter: (a, b) => a.locationU - b.locationU,
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
          title: '机柜名称',
          dataIndex: 'equipmentName',
          width: 100,
          sorter: (a, b) => a.equipmentName - b.equipmentName,
        },
        {
          title: '机柜编号',
          dataIndex: 'equipmentCode',
          width: 100,
          sorter: (a, b) => a.equipmentCode - b.equipmentCode,
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
    console.log(classList[0].innerText)
    const first_char = classList[0].innerText
    const third_char = classList[2].innerText
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const di_1 = this.state.columns.filter(v => {
      return v.title == first_char
    })
    const di_2 = this.state.columns.filter(v => {
      return v.title == third_char
    })
    console.log(di_1)
    //分别获取每一个框的值，再将他们组合
    const second_sel = classList[1].innerText.trim()
    let first_sel = di_1[0].dataIndex
    let third_sel = di_2[0].dataIndex
    let fourth_sel = classList[3].innerText.trim()
    let params = {};
    params[first_sel] = second_sel;
    params[third_sel] = fourth_sel;
    params[startTime] = startTime
    params[endTime] = endTime
    console.log(params)
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    console.log(api)
    api.History_selectAll(params)
      .then(res => {
        console.log(res)
        const data = res.data.data || []
        //根据获取的status和newStatus来添加描述
        data.map(v => {
          // v.status == 0 ? v.status = '资产下架' : v.status == 1 ? v.status = "资产上架" : v.status = '待定'
          if (v.status == 0 && v.newStatus == 1) {
            console.log(123)
            v['discribe'] = "资产下架->资产上架"
          }
          else if (v.status == 1 && v.newStatus == 0) {
            v['discribe'] = "资产上架->资产下架"
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
        let btns = api.distr_anth(res)[1]["资产历史"]
        this.setState({
          btns:btns
        })
      })
  }
  componentDidMount() {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight - 200 + 'px'
    //修改搜索框的宽度
    const classList = Array.from(document.getElementsByClassName('ant-select-selection'))
    classList.map(v => {
      v.style.width = "100px"
    })
    const classList2 = Array.from(document.getElementsByClassName('ant-input-group-compact'))
    classList2.map(v => {
      v.style.width = "220px"
    })
    const classList3 = Array.from(document.getElementsByClassName('ant-input'))
    classList3.map(v => {
      v.style.width = "140px"
    })
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
            <Select defaultValue="机柜编号" className="custom_sel">
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
            <Select defaultValue="机柜编号">
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
          {this.state.btns.indexOf("Excel导出")!==-1?<li style={{ listStyle: 'none',padding:'5px 0 0 15px'}}><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导出</li>:null}
        </div>
        <Table bordered components={this.components}
          columns={
            columns
          }
          column={{
            align: 'center'
          }}
          scroll={{ x: this.state.totalWidth + 200, y: document.body.clientHeight-200 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 28,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
      </React.Fragment>
    )
  }
}
export default propertyHistory;