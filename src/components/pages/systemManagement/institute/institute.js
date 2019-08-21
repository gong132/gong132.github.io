import React, { Component } from 'react'
import { Icon, Table, Form, Select, Modal, Input } from 'antd'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import Edit from './edit'
import api from '../../../../api/index'
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

class InstituteManagement extends Component {

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
          level: '一级'
        }
      ],
      isShow: false,
      isShowAdd: false,
      visible: false,
      totalWidth: '',
      obj: [],
      content: {},
      btns:'',
      columns: [
        {
          title: '编号',
          dataIndex: 'organizationNo',
          width: 60,
          align: 'center',
          // sorter: (a, b) => a.organizationNo - b.organizationNo,
        },
        {
          title: '组织名称',
          dataIndex: 'organizationName',
          width: 70,
        },
        {
          title: '模块数量',
          dataIndex: 'limitModuleCnt',
          width: 70,
        },
        {
          title: '资产数量',
          dataIndex: 'limitAssetsCnt',
          width: 70,
        },

        {
          title: '排序',
          dataIndex: 'seq',
          width: 40,
        },

        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 140,
        },
        {
          title: '地址',
          dataIndex: 'address',
          width: 160,
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (text, record, index) => <div className="action">
            {this.state.btns.indexOf("编辑")!==-1?<a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a>:null}&nbsp; &nbsp;
            {this.state.btns.indexOf("编辑")!==-1?<a href="javascript:;" onClick={() => this.showModal(text, record, index)}><span className="glyphicon glyphicon-trash delete"></span> 删除</a>:null}</div>
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
  //控制提示框
  showModal = (text, record, index) => {
    this.setState({
      visible: true,
      text: text
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
    }, this.delete(this.state.text));
  };
  //添加数据
  addInstitute() {
    this.setState({
      isShowAdd: true,
      isShow: true
    })
  }
  //删除数据一个数据
  delete(text) {
    console.log(text.organizationNo)
    api.remove({ "organizationNo": text.organizationNo })
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
    console.log('弹框消失')
    this.setState({
      isShow: false,
      isShowAdd: false,
      isShowMenu: false,
      isShowModel: false
    })
  }
  //根据编辑页面返回的数据来更新data
  updataEdit() {
    this.selectAll()
  }
  //编辑数据
  edit(text, record, index) {
    console.log(text, record, index)
    text.level === 0 ? text.level = "一级" : text.level = "二级"
    this.setState({
      isShow: true,
      isShowAdd: false,
      content: record
    })
    setTimeout(() => {
      this.props.form.setFieldsValue({
        'organizationName': text.organizationName,
        'organizationNo': text.organizationNo,
        'level': text.level,
        'id': text.id
      })
    }, 0)
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const time = document.getElementById('time').value;
    const params = {
      "organizationName": name,
      "organizationNo": num,
      "createDate": time
    }
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    api.selectAll(params)
      .then(res => {
        console.log(res)
        this.setState({
          data: res.data.data,
        })
      })
  }
  componentWillMount() {
    this.selectAll()
    let width = 0;
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
    })
    console.log(width)
    this.setState({
      totalWidth: width,
    })
    //获取权限
    const id = window.localStorage.getItem('id')
    const params = {
      "userId": id
    }
    api.Layouts(params)
      .then(res => {
        res = res.data.data
        let btns = api.distr_anth(res)[1]["机构管理"]
        this.setState({
          btns:btns
        })
      })
  }
  componentDidMount() {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight - 240 + 'px'
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    const { getFieldDecorator } = this.props.form;
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
          {btns.indexOf("新增") !== -1?<li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />新增</li>:null}
          {btns.indexOf("导入") !== -1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />导入</li>:null}
        </ul>
        <form id="inquiry" method="post">
          <label htmlFor="name">名称:  </label>
          <input type="text" id='name' />
          <label htmlFor="num">编号:  </label>
          <input type="text" id='num' />
          <label htmlFor="time">创建时间:  </label>
          <input type="date" id='time' />
          {btns.indexOf("查询") !== -1?<button onClick={(e) => this.inquiry(e)} id="btn">查询</button>:null}
        </form>
        <Table bordered components={this.components} columns={
          columns
        }

          dataSource={this.state.data} pagination={{
            defaultPageSize: 12,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />

        {this.state.isShow ? <Edit title={'编辑'} updataEdit={this.updataEdit} arr={this.state.data} content={this.state.content} updateParent={this.updateParent}></Edit> : null}

        {this.state.isShowAdd ? (<Edit submit={"添加"} title={'添加'} updataEdit={this.updataEdit} organizationName={this.state.organizationName} arr={this.state.data} updateParent={this.updateParent}></Edit>) : null}
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
      </React.Fragment>

    )
  }
}
export default Form.create()(InstituteManagement);