import React, { Component } from 'react'
import { Icon, Table, Form, Select, Button, Input, AutoComplete, TreeSelect } from 'antd'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import api from '../../../../api/index'
import './propertyIn.css'
import Edit from './edit'
import { thisExpression } from '@babel/types';
const { Option } = Select
const InputGroup = Input.Group;
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

class PropertyStandingBook extends Component {

  constructor() {
    super()
    this.updateParent = this.updateParent.bind(this)
    this.updataEdit = this.updataEdit.bind(this)
    this.state = {
      data: [
        {
          key: 0,
          createDate: '2018-02-11',
          organizationNo: 120,
          organizationName: '晨腾',
          level: '一级',
          id: '1'
        }
      ],
      isShow: false,
      isShowAdd: false,
      totalWidth: '',
      content: {},
      title: [],
      dataIndex: [],
      btns: '',
      select_arr: [
        '机柜编号', '模块编号', '机柜名称', '模块IP', '模块数量', 'U位数量', '数据中心', '部署楼层', '房间号', '列'],
      columns: [
        {
          fixed: 'left',
          title: '',
          dataIndex: 'id',
          width: 60,
          align: 'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder: 'ascend'
        },
        {
          title: '机柜编号',
          dataIndex: 'code',
          width: 100,
          sorter: (a, b) => a.code - b.code,
        },
        {
          title: '机柜名称',
          dataIndex: 'name',
          width: 140,
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: '模块编号',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '模块IP',
          dataIndex: 'moduleIp',
          width: 100
        },
        {
          title: '模块数量',
          dataIndex: 'moduleCnt',
          width: 100,
          sorter: (a, b) => a.moduleCnt - b.moduleCnt,
        },
        {
          title: '模块状态',
          dataIndex: 'moduleStatus',
          width: 100
        },
        {
          title: 'U位数量',
          dataIndex: 'uWeiCnt',
          width: 100,
          sorter: (a, b) => a.uWeiCnt - b.uWeiCnt,
        },
        {
          title: 'U位占位数',
          dataIndex: 'uUpShelfCnt',
          width: 140,
          sorter: (a, b) => a.uUpShelfCnt - b.uUpShelfCnt,
        },
        {
          title: '排序字段',
          dataIndex: 'seq',
          width: 100
        },
        {
          title: '部门id',
          dataIndex: 'organizationId',
          width: 100
        },
        {
          title: '占位方式',
          dataIndex: 'way',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 160
        },
        {
          title: ' 修改时间',
          dataIndex: 'updateTime',
          width: 160
        },
        {
          title: ' 创建者',
          dataIndex: 'createUserId',
          width: 100
        },
        {
          title: ' 修改者',
          dataIndex: 'updateUserId',
          width: 100
        },
        {
          title: ' 机柜型号',
          dataIndex: 'type',
          width: 100
        },

        {
          title: '数据中心',
          dataIndex: 'dbcenter',
          width: 100
        },
        {
          title: '楼层',
          dataIndex: 'floor',
          width: 60
        },
        {
          title: '房间',
          dataIndex: 'room',
          width: 60
        },
        {
          title: '列',
          dataIndex: 'col',
          width: 40
        },
        {
          title: '组织名称',
          dataIndex: 'orgName',
          width: 100
        },
        {
          title: 'infoId',
          dataIndex: 'equipmentInfoId'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record, index) => <div className="action">
            {this.state.btns.indexOf("解绑") !== -1 ? <a href="javascript:;"><span className="glyphicon glyphicon-paperclip fix"></span> 解绑</a> : null}&nbsp;
            {this.state.btns.indexOf("解绑") !== -1 ? <a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a> : null}&nbsp;
          {this.state.btns.indexOf("删除") !== -1 && text.moduleStatus == "下线" ? (<a href="javascript:;" onClick={() => this.delete(text)}><span className="glyphicon glyphicon-trash location"></span>删除</a>) : null}
          </div>
        },
      ],
    }
  }

  hidePages() {
    this.setState({
      isShow: false
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  //添加数据
  addInstitute() {
    this.setState({
      isShowAdd: true,
      isShow: false
    })
  }
  //删除数据一个数据
  delete(text) {
    console.log(text.id)
    api.JG_remove({ "id": text.id })
      .then(res => {
        console.log(res)
        this.selectAll()
      })
      .catch(console.log('err'))
  }
  //编辑使弹框消失
  updateParent() {
    this.setState({
      isShow: false,
      isShowAdd: false
    })
  }
  //编辑数据
  edit(text, record, index) {
    console.log(text, record, index)
    this.setState({
      isShow: true,
      isShowAdd: false,
      content: text,
      index: index,
    })
    setTimeout(() => {
      this.props.form.setFieldsValue({
      })
    }, 0)
  }
  //根据编辑页面返回的数据来更新data
  updataEdit() {
    this.selectAll()
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const startTime = document.getElementById('startTime').value
    const endTime = document.getElementById("endTime").value
    const classList = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    console.log(classList[0].innerText)
    const first_char = classList[0].innerText
    const third_char = classList[2].innerText
    let fifth_char = classList[4].innerText.trim()
    fifth_char == '上线' ? fifth_char = 1 : fifth_char == '下线' ? fifth_char = 0 : fifth_char = ""
    console.log(fifth_char)
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
    console.log(fourth_sel)
    let params = {};
    params[first_sel] = second_sel;
    console.log(params[third_sel])
    params[third_sel] ? params[third_sel] = params[third_sel] : params[third_sel] = fourth_sel;
    params["moduleStatus"] = fifth_char
    params["createStartDate"] = startTime
    params["createEndDate"] = endTime
    console.log(params)
    this.selectAll(params)
    params = {}
  }
  //查询所有数据
  selectAll(params) {
    api.JG_selectAll(params)
      .then(res => {
        console.log(res.data.data)
        let data = res.data.data || []
        data.map(v => {
          v.moduleStatus == 1 ? v.moduleStatus = "上线" : v.moduleStatus = "下线"
        })
        this.setState({
          data: res.data.data
        })
      })
  }
  componentDidMount() {
    const classList2 = document.getElementsByClassName("ant-select-selection ant-select-selection--multiple")[0]
    console.log(classList2)
    classList2.style.width = "12vw"
    //修改搜索框的宽度
    const classList = Array.from(document.getElementsByClassName('ant-select-selection'))
    classList.map(v => {
      v.style.width = "100px"
    })
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-wrapper'))
    console.log(className)
    className[0].style.height = 74 + 'vh'
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
        let btns = api.distr_anth(res)[1]["机柜管理"]
        this.setState({
          btns: btns
        })
      })
  }

  showTotal(total) {
    return total
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };
  render() {
    const { btns } = this.state
    const treeData = [
      {
        title: '上线',
        value: '0-0',
        key: '0-0',
      },
      {
        title: '下线',
        value: '0-1',
        key: '0-1',
      },
    ];
    const tProps = {
      treeData,
      onChange: this.onChange,
      treeCheckable: true,
      style: {
        width: 160,
      },
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    //搜索框

    return (
      <React.Fragment>
        <div style={{ display: 'flex', paddingRight: '22vw', padding: 3, height: '6vh', boxSizing: 'border-box', paddingRight: 0 }}>
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
              style={{ maxWidth: 120 }}
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
              style={{ maxWidth: 120 }}
              onChange={this.handleChange}
            />
          </InputGroup>
          <TreeSelect {...tProps} placeholder='状态' />
          <p className="search-up-down">创建时间：</p><Input type="date" id="startTime" />-<Input type="date" id="endTime" />
          <Button onClick={(e) => this.inquiry(e)} type="primary"><Icon type="search" />查询</Button>
        </div>

        <ul className="nav">
          {btns.indexOf("添加")!==-1?<li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />添加</li>:null}
          {btns.indexOf("添加")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导入</li>:null}
          {btns.indexOf("添加")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />导出Excel</li>:null}
          {btns.indexOf("添加")!==-1?<li><span className="glyphicon glyphicon-hdd" style={{ color: '#00a65a', marginRight: 5 }}></span>机柜型号</li>:null}
        </ul>
        <Table rowSelection={rowSelection} bordered components={this.components}
          columns={
            columns
          }
          scroll={{ x: this.state.totalWidth + 200, y: 400 }}
          dataSource={this.state.data}
          pagination={{
            showSizeChanger: 'true',
            defaultPageSize: 15,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />

        {this.state.isShow ? <Edit dataIndex={this.state.dataIndex} title={this.state.title} content={this.state.content} updateParent={this.updateParent} infoId={this.state.data[this.state.index].equipmentInfoId} updataEdit={this.updataEdit}></Edit> : null}

        {this.state.isShowAdd ? (<Edit dataIndex={this.state.dataIndex} title={this.state.title} updateParent={this.updateParent} titles={'登记'} submit={'添加'} updataEdit={this.updataEdit}></Edit>) : null}
      </React.Fragment>

    )
  }
}
export default Form.create()(PropertyStandingBook);