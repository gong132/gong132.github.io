import React, { Component } from 'react'
import { Icon, Table, Form, Layout } from 'antd'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import api from '../../../../api/index'
import axios from 'axios'
import Edit from './edit'
import './userManagement.css'
const { Sider, Content } = Layout;

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


class UserManagement extends Component {

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
          name: '晨腾',
          level: '一级',
          roleName: '超级管理员 操作员',
          sex: '男'
        }
      ],
      isShow: false,
      isShowAdd: false,
      bool: true,
      totalWidth: '',
      content: {},
      title: [],
      dataIndex: [],
      organizationName: [],
      organizationId:'',
      btns:[],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 60,
          sorter: (a, b) => a.id - b.id,
          align: 'center'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          width: 120,
        },

        {
          title: '姓名',
          dataIndex: 'name',
          width: 100,
        },
        {
          title: '用户名',
          dataIndex: 'loginName',
          width: 90
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width: 50
        },
        {
          title: '年龄',
          dataIndex: 'age',
          width: 50
        },
        {
          title: '电话',
          dataIndex: 'phone',
          width: 150
        },
        {
          title: '用户类型',
          dataIndex: 'userType',
          width: 100,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 60,
        },
        {
          title: '组织名称',
          dataIndex: 'organizationName',
          width: 100,
        },
        {
          title: '角色',
          dataIndex: 'roleName',
          width: 200,
        },
        {
          title: '操作',
          fixed: 'right',
          key: 'action',
          render: (text, record, index) => <div className="action">
            {this.state.btns.indexOf("编辑") !== -1?<a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a>:null}
            &nbsp; &nbsp;
          {this.state.btns.indexOf("删除") !== -1?<a href="javascript:;" onClick={() => this.delete(text, record, index)}><span className="glyphicon glyphicon-trash delete"></span> 删除</a>:null}</div>
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

  //添加数据
  addInstitute() {
    this.setState({
      isShowAdd: true,
      isShow: false,
      bool: false
    })
  }
  //删除数据一个数据
  delete(text) {
    console.log(text.id)
    const params = {
      "id": text.id
    }
    // api.remove({ "id": text.id })8060
    // axios.get('http://192.168.0.108:8060/user/delete', { params: params })
    api.User_remove(params)
      .then(res => {
        console.log(res)
        this.selectAll()
      })
      .catch(console.log('err'))
  }
  //删除多个数据
  deleteSome() {

  }
  //编辑使弹框消失
  updateParent() {
    this.setState({
      isShow: false,
      isShowAdd: false
    })
  }
  //根据编辑页面返回的数据来更新data
  updataEdit() {
    this.selectAll()
  }
  //编辑数据
  edit(text, record, index) {
    console.log(text, record, index)
    this.setState({
      isShow: true,
      isShowAdd: false,
      content: text,
    })
    setTimeout(() => {
      this.props.form.setFieldsValue({
        'organizationName': text.organizationName,
        'organizationNo': text.organizationNo,
        'id': text.id
      })
    }, 0)
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const time = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const params = {
      "name": name,
      "startTime": time,
      "endTime":endTime
    }
    this.selectAll(params)
  }
  //组织结构过滤查询
  sendOrganizationId (e) {
    const text = e.target.innerText
    console.log(text)
    let params = {}
    this.state.organizationName.map(v => {
      if(v.organizationName == text) {
        params["organizationId"] = v.id
        return
      }
    })
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    // api.selectAll(params)
    console.log(params)
    // axios.get('http://192.168.0.101:8060/user/page', { params: params })
    api.User_selectAll(params)
      .then(res => {
        const data = res.data.data.users
        data.map(data => {
          let str = "";
          data.sex == 1 ? data.sex = "男" : data.sex == 0 ? data.sex = "女" : data.sex = ""
          data.userType == 1 ? data.userType = "管理员" : data.userType == 2 ? data.userType = "操作员" : data.userType = ""
          data.organization ? data.organizationName = data.organization.organizationName : data.organizationName = ""
          data.organizationId = data.organization.id
          data.status == 1 ? data.status = "正常" : data.status == 0 ? data.status = "停用" : data.status = ""
            data.witRoles.map(v => {
              if(v) {
                str += v.roleName + " "
              }           
              data.roleName = str
            }) 
        })
        this.setState({
          data: data
        })
      })
    //查询组织机构
    // axios.get('http://192.168.0.107:8060/organization/selectAll')
    api.selectAll()
      .then(res => {
        this.setState({
          organizationName: res.data.data,
          organizationId:res.id
        }, () => console.log(this.state.organizationName))
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
        let btns = api.distr_anth(res)[1]["用户管理"]
        this.setState({
          btns:btns
        })
      })
  }
  componentDidMount () {
    console.log(this.state.organizationName)
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight-300 +'px'
  }
  showTotal(total) {
    return total
  }
  render() {
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
    const { btns } = this.state
    return (
      <React.Fragment>
        <form height="5vh" id="inquiry" method="post">
          <label htmlFor="name">姓名:  </label>
          <input type="text" id='name' />
          {/* <label htmlFor="num">编号:  </label>
          <input type="text" id='num' /> */}
          <label htmlFor="time">创建时间:  </label>
          <input type="date" id='startTime' />
          --
          <input type="date" id='endTime' />
          {btns.indexOf("查询")!==-1?<button onClick={(e) => this.inquiry(e)} id="btn">查询</button>:null}
        </form>
        <Layout style={{height:'81vh'}}>
          <Sider style={{ backgroundColor: 'white' }}>
            <p className="user_header">组织结构</p>
            <ul className="nav_left">
              {this.state.organizationName.map(data => {
                return <li onClick={(e) => {this.sendOrganizationId(e)}}>{data.organizationName}</li>
              })}
            </ul>
          </Sider>
          <Content>
            <p className="user_header">操作员列表</p>
            <ul className="nav" style={{ backgroundColor: '#f4f4f4' }}>
              {btns.indexOf("新增")!==-1?<li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />新增</li>:null}
            </ul>
            <Table bordered components={this.components} columns={
              columns
            }
              scroll={{ x: this.state.totalWidth + 100, y: document.body.clientHeight - 100 }}
              dataSource={this.state.data}
              pagination={{
                defaultPageSize: 28,
                total: this.state.total,
                showTotal: this.showTotal,
                
              }} />
          </Content>
        </Layout>

        {this.state.isShow ? <Edit editName={"编辑"} organizationName={this.state.organizationName} content={this.state.content} dataIndex={this.state.dataIndex} title={this.state.title} updateParent={this.updateParent} updataEdit={this.updataEdit}></Edit> : null}
        {this.state.isShowAdd ? <Edit submit={1} organizationName={this.state.organizationName} editName={"添加"} dataIndex={this.state.dataIndex} title={this.state.title} updateParent={this.updateParent} updataEdit={this.updataEdit}></Edit> : null}

      </React.Fragment>

    )
  }
}
export default Form.create()(UserManagement);