import React, { Component } from 'react'
import { Icon, Table, Form, Select, Button, Input, AutoComplete, Modal } from 'antd'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import api from '../../../../api/index'
import AMap from './map'
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

class DBcenter extends Component {

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
      select_arr: [
        '数据中心', '国家', '省/州/区', '市'],
      columns: [
        {
          title: '',
          dataIndex: 'id',
          width: 60,
          align:'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder:'ascend'
        },
        {
          title: '国家',
          dataIndex: 'country',
          width: 60,
        },
        {
          title: '省/州/区',
          dataIndex: 'province',
          width: 100,
        },
        {
          title: '市',
          dataIndex: 'city',
          width: 80,
        },
        {
          title: '数据中心',
          dataIndex: 'dbcenter',
          width: 100,
          sorter: (a, b) => a.dbcenter - b.dbcenter,
        },
        {
          title: '经度',
          dataIndex: 'longitude',
          width: 100,
          sorter: (a, b) => a.moduleCnt - b.moduleCnt,
        },
        {
          title: '纬度',
          dataIndex: 'latitude',
          width: 100
        },
        // {
        //   title: '部门名称',
        //   dataIndex: 'organizationName',
        //   width: 100,
        // },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 160
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (text, record, index) => <div className="action">
          <a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a>&nbsp;
          {text.moduleStatus == "下线" ? (<a href="javascript:;" onClick={() => this.showModal(text, record, index)}><span className="glyphicon glyphicon-trash location"></span>删除</a>) : null}
          </div>
        },
      ],
    }
  }
  //控制提示框
  showModal = (text, record, index) => {
    console.log(text, record, index)
    console.log(record.room)
    console.log(record.room == undefined)
    this.setState({
      visible: true,
      text:record
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  hideModal_confim = () => {
    console.log('确认删除')
    this.setState({
      visible: false,
    },this.delete(this.state.text));
  };

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
    console.log('添加数据')
    this.setState({
      isShowAdd: true,
    })
  }
  //删除数据一个数据
  delete(text) {
    console.log(text.id)
    api.dbCenter_delete({ "id": text.id })
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
    console.log("根据编辑页面返回的数据来更新data")
      this.selectAll()
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const classList = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    const startTime = document.getElementById('startTime').value
    const endTime = document.getElementById("endTime").value
    console.log(classList[0].innerText)
    const first_char = classList[0].innerText
    // const third_char = classList[2].innerText
    // let fifth_char = classList[4].innerText.trim()
    // fifth_char == '上线' ? fifth_char = 1 : fifth_char == '下线' ? fifth_char = 0 : fifth_char = ""
    // console.log(fifth_char)
    const di_1 = this.state.columns.filter(v => {
      return v.title == first_char
    })
    // const di_2 = this.state.columns.filter(v => {
    //   return v.title == third_char
    // })
    console.log(di_1)
    //分别获取每一个框的值，再将他们组合
    const second_sel = classList[1].innerText.trim()
    let first_sel = di_1[0].dataIndex
    // let third_sel = di_2[0].dataIndex
    // let fourth_sel = classList[3].innerText.trim()
    // console.log(fourth_sel)
    let params = {};
    params[first_sel] = second_sel;
    params["createStartDate"] = startTime
    params["createEndDate"] = endTime
    console.log(params)
    this.selectAll(params)
    params = {}
  }
  //查询所有数据
  selectAll(params) {
    api.dbCenter_selectAll_s(params)
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
  componentDidMount () {
    //修改搜索框的宽度
    const classList = Array.from(document.getElementsByClassName('ant-select-selection'))
    classList.map(v => {
      v.style.width="100px"
    })
      //调整表格大小
      const className = Array.from(document.getElementsByClassName('ant-table-body'))
      console.log(className)
      className[0].style.height = document.body.clientHeight +'px'
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
  }

  showTotal(total) {
    return total
  }
  goBack() {
    this.props.history.goBack()
  }
  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };
  render() {
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
        <div style={{ display: 'flex', paddingRight: '22vw', margin: 3, height: 30, paddingRight: 0 }}>
          <Button type="primary" onClick={()=>this.goBack()}>返回</Button>
          <InputGroup compact >
            <Select defaultValue="数据中心" className="custom_sel">
              {this.state.select_arr.map(v => {
                return (
                  <Option value={v} >{v}</Option>
                )
              })}
            </Select>
            <AutoComplete
              dataSource={this.state.dataSource}
              style={{ maxWidth: 150 }}
              onChange={this.handleChange}
            />
          </InputGroup>  
          <p className="search-up-down">创建时间:</p><Input type="date" id="startTime"/>-<Input type="date" id="endTime" />
          <Button onClick={(e) => this.inquiry(e)} type="primary"><Icon type="search" />查询</Button>
          <li onClick={() => this.addInstitute()} style={{ listStyle: 'none', padding: '5px 0 0 15px' }}><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />添加</li>
        </div>
        <Table bordered components={this.components}
          columns={
            columns
          }
          // scroll={{ x: this.state.totalWidth + 200, y: 400 }}
          dataSource={this.state.data}
          pagination={{
            showSizeChanger:'true',
            defaultPageSize: 15,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
        <Modal
          title="提示框"
          visible={this.state.visible}
          onOk={this.hideModal_confim}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>是否确认执行该操作</p>
        </Modal>
        {this.state.isShowAdd ?<AMap title={'添加'} updataEdit={this.updataEdit} updateParent={this.updateParent}></AMap> : null}
        {this.state.isShow ?<AMap title={'编辑'} updataEdit={this.updataEdit} content={this.state.content} updateParent={this.updateParent}></AMap> : null}
      </React.Fragment>

    )
  }
}
export default Form.create()(DBcenter);