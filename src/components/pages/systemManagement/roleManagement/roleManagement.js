import React, { Component } from 'react'
import { Icon, Modal, Table, Form, Select, Button, Input } from 'antd'
import './roleManagement.css'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import api from '../../../../api/index'
import utils from './utils'
import AuthManagement from './authManagement'
import ModelManagement from './MdelManagement'
import Edit from './edit'
import Axios from 'axios';
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
class RoleManagement extends Component {

  constructor() {
    super()
    this.updateParent = this.updateParent.bind(this)
    this.updataEdit = this.updataEdit.bind(this)
    this.state = {
      data: [
        {
          id: 0,
          name: 'gong',
          order: 40,
          level: '晨腾',
          state: '正常'
        }
      ],
      isShow: false,
      isShowAdd: false,
      isShowMenu: false,
      isShowModel: false,
      visible: false,
      organizationName:[],
      btns:"",
      columns: [
        {
          title: '',
          dataIndex: 'id',
          width: 40,
          sorter: (a, b) => a.id - b.id,
          align: 'center'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          width: 50,
        },
        {
          title:'描述',
          dataIndex:'description',
          width:50
        },
        {
          title:'状态',
          dataIndex:'status',
          width:50
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (text, record, index) => <div className="action">
            {/* <a href="javascript:;" onClick={() => this.setState({isShowMenu:true})}><span className="glyphicon glyphicon-ok menuAuth"></span>菜单授权</a>&nbsp; &nbsp; */}  
            {this.state.btns.indexOf("分配权限")!== -1?<a href="javascript:;" onClick={() => this.setState({ isShowModel: true, text: text })}><span className="glyphicon glyphicon-ok modelAuth"></span>分配权限</a>:null}   
            &nbsp; &nbsp;
            {this.state.btns.indexOf("编辑")!== -1?<a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a>:null}
            &nbsp; &nbsp;
            {this.state.btns.indexOf("删除")!== -1?<a href="javascript:;" onClick={() => this.showModal(text, record, index)}><span className="glyphicon glyphicon-trash delete"></span> 删除</a>:null}
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
  

  //控制提示框
  showModal = (text, record, index) => {
    this.setState({
      visible: true,
      text:text
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
    },this.delete());
  };
  //添加数据
  addInstitute() {
    this.setState({
      isShowAdd: true,
      isShow: false
    })
  }
  //删除数据一个数据
  delete() {
    console.log('确认删除后开始删除')
    console.log(this.state.text)
    const text = this.state.text
    api.Role_remove({ "id": text.id })
      .then(res => {
        console.log(res)
        this.selectAll({
          index: 1,
          size: 20
        })
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
      isShowMenu:false,
      isShowModel:false
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
      content: record
    })
  }

  //查询所有数据
  selectAll(params) {
    api.selectAll()
    .then(res => {
      let result = res.data.data || []
      console.log(result)
      this.setState({
        organizationName:result
      })
    })
    api.Role_selectAll(params)
      .then(res => {
        const arr = res.data.data || []
        arr.map( v => {
          v.status== 2?v.status="停用":v.status="正常"
        })
        console.log(res)
        this.setState({
          data: arr
        })
      })
  }
  componentWillMount() {
    this.selectAll({
      index: 0,
      size: 20
    })
    //获取权限
    const id = window.localStorage.getItem('id')
    const params = {
      "userId": id
    }
    api.Layouts(params)
      .then(res => {
        res = res.data.data
        let btns = api.distr_anth(res)[1]["角色管理"]
        this.setState({
          btns:btns
        })
      })
  }

  showTotal(total) {
    return total
  }
  render() {
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
    console.log(btns)
    return (
      <React.Fragment>
        <ul className="nav">
          { btns.indexOf("新增") !== -1?<li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />新增</li>:null}  
        </ul>
        <Table bordered components={this.components} columns={
          columns
        } dataSource={this.state.data} pagination={{
          defaultPageSize: 8,
          total: this.state.total,
          showTotal: this.showTotal,
          position: "bottom"
        }} />
        {this.state.isShowMenu ? <AuthManagement updataEdit={this.updataEdit} updateParent={this.updateParent}></AuthManagement> : null}
        {this.state.isShowModel ? <ModelManagement updataEdit={this.updataEdit} roleId={this.state.text.id} updateParent={this.updateParent}></ModelManagement> : null}
        {this.state.isShow ? <Edit title={'编辑'} updataEdit={this.updataEdit}  arr={this.state.data} content={this.state.content} organizationName={this.state.organizationName} updateParent={this.updateParent}></Edit> : null}

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
export default Form.create()(RoleManagement);