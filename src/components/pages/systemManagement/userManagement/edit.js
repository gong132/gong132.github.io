import React from 'react'
import { Form, Select, Input } from 'antd'
import axios from 'axios'
import api from '../../../../api/index'
const { Option } = Select
const InputGroup = Input.Group;

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      submit: '',
      dataIndex: [],
      data: [],
      arr: [],
      organizationName: []
    }
  }
  //查询所有角色
  selectAll(params) {
    api.Role_selectAll(params)
      .then(res => {
        console.log(res)
        const data = res.data.data
        this.setState({
          data: data
        }, () => this.getRoleList(res.data.data))
      })
  }
  componentWillMount() {

    //截取传过来的表单数据
    console.log(this.props.organizationName)
    console.log(this.props.title)
    let arr_0 = [...new Set(this.props.title)]
    arr_0[arr_0.length - 1] == "操作" ? arr_0.splice(arr_0.length - 1, 1) : arr_0 = arr_0
    console.log(arr_0)
    arr_0.splice(0, 2)
    arr_0.push('密码')
    let arr = [];
    console.log(this.props.content)
    if (this.props.editName == "编辑") {
      this.props.content.roleName ? arr = this.props.content.roleName.trim().split(" ") : arr = [];
      console.log(arr)
    }
    if (this.props.editName == "添加") {
      arr = []
    }
    // else{
    //点击新增进入页面后进行的处理
    console.log('点击新增进入页面后进行的处理')
    Array.from(document.getElementsByClassName('ant-select-selection__choice')).map(v => {
      v.remove()
    })
    console.log(Array.from(document.getElementsByClassName('ant-select-selection__choice__content')))
    // }
    this.props.titles ? this.state.title = '登记' : this.state.title = '编辑'
    this.props.submit ? this.state.submit = "添加" : this.state.submit = "确定"
    this.setState({
      title: this.state.title,
      submit: this.state.submit
    })
    // this.props.dataIndex.push("password")
    let arr_1 = [...new Set(this.props.dataIndex)]
    arr_1.splice(arr_1.length - 1, 1)
    console.log(arr_1)
    arr_1.splice(0, 2)
    arr_1.push('password')
    console.log(arr_1)
    this.setState({
      dataIndex: arr_1,
      arr,
      title: arr_0,
      organizationName: this.props.organizationName || []
    })

    this.selectAll({
      index: 0,
      size: 20
    })
  }
  //获取角色列表
  getRoleList(data) {
    console.log(data)
    this.setState({
      data
    })
    //拿到data后拿出角色值和this.props.content中的roleName中的值进行比较
  }

  componentDidMount() {
    const classList = document.getElementsByClassName("ant-select")
    console.log(classList)
    // classList[4].style.width = 12 + 'vw'
    console.log(this.props.content)
    console.log(this.props.organizationName)
    if (this.props.content) {
      console.log(this.props.content, this.props.dataIndex)
      // this.props.dataIndex.splice(this.props.dataIndex.length - 1, 1)
      this.props.dataIndex.map(v => {
        const obj = {}
        obj[v] = this.props.content[v]
        this.props.form.setFieldsValue(obj)
      })
    }
    else {
      return
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    let className = []
    if (e.target.innerText == "添加") {
      console.log("如果是确定，就清一下className的缓存,再取值")
      className = []
      console.log(className)
    }
    //取角色框的值
    className = Array.from(document.getElementsByClassName("ant-select-selection__choice__content"))
    console.log(className)

    let roleName_content = ""
    if (className.length > 0) {
      className.map(v => {
        console.log(v.innerText)
        roleName_content += v.innerText + " "
      })
      console.log(roleName_content)
    } else if (className.length == 0) {
      alert("请勾选至少一个角色")
      return
    }
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        //将编辑或者提交的数据进行转换
        console.log(this.state.data)//角色，用来取id
        let str = ""//用来存匹配的id
        values["roleName"] = roleName_content
        console.log(values.roleName)
        console.log(values)
        let arr;
        if (typeof (values.roleName) == "string") {
          arr = values.roleName.split(" ")
        } else {
          arr = values.roleName
        }
        // let arr = values.roleName.split(" ")
        console.log(arr)
        if (arr.length > 0) {
          this.state.data.map((v) => {
            // console.log(v.roleName)
            arr.map(v_0 => {
              console.log(v.roleName, v_0)
              console.log(v.id)
              if (v_0 == v.roleName) {
                console.log("相同")
                str += v.id + ","
              }
            })
          })
        }
        console.log(str)
        values.role = str
        values.sex == "男" ? values.sex = 1 : values.sex == "女" ? values.sex = 0 : values.sex = -1;
        values.userType == "管理员" ? values.userType = 1 : values.userType == "操作员" ? values.userType = 2 : values.userType = -1;
        values.status == "正常" ? values.status = 1 : values.status == "停用" ? values.status = 0 : values.status = -1
        this.props.organizationName.map((v) => {
          if (v.organizationName == values.organizationName) {
            values.organizationId = v.id
          }
        })
        //编辑数据/添加数据
        if (this.props.content) {
          values["id"] = this.props.content.id//编辑需要传id
        }

        console.log(values)
        console.log('这里放编辑数据的接口')
        if (e.target.innerText == "编辑") {
          values["id"] = this.props.content.id
          if (values.password == null) {
            // delete values["password"]
          }
        }
        // //给用户添加角色
        // api.add_User_role(values)
        //   .then(res => {
        //     console.log(res)
        //   })
        // api.User_edit(values)
        // axios.post('http://192.168.0.101:8060/user/edit', values)
        api.User_edit(values)
          .then(res => {
            console.log(res)
            if (res.status == 200) {
              this.props.updataEdit()
            }
          })
        this.props.updateParent()
      }

    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };
    const { getFieldDecorator } = this.props.form;
    const dataIndex = this.state.dataIndex
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '50vw', height: '55vh' }}>
          <span>{this.props.editName}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '45vw', cursor: 'pointer' }}></span>
          {/* <p style={{color:'red'}}>密码不修改请留空。</p> */}
          <div style={{ display: 'flex', border: '2px #ebebeb solid', background: 'white', height: '44vh', overflow: 'auto' }}>
            <Form {...formItemLayout}>
              {this.state.title.map((v, index) => {
                return (
                  <Form.Item label={v} wrapperCol={{ span: 14, offset: 0 }} colon={false}>
                    {dataIndex[index] == 'sex' ? (getFieldDecorator(`${dataIndex[index]}`, { initialValue: '男' })(
                      <Select>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                      </Select>
                    )) : dataIndex[index] == 'userType' ? (getFieldDecorator(`${dataIndex[index]}`, { initialValue: '操作员' })(
                      <Select>
                        <Option value="操作员">操作员</Option>
                        <Option value="管理员">管理员</Option>
                      </Select>
                    )) : dataIndex[index] == 'status' ? (getFieldDecorator(`${dataIndex[index]}`, { initialValue: '正常' })(
                      <Select>
                        <Option value="正常">正常</Option>
                        <Option value="停用">停用</Option>
                      </Select>
                    )) : dataIndex[index] == 'roleName' ? ((
                      <Select mode="multiple"
                        placeholder="Please select roles"
                        defaultValue={this.state.arr}
                        style={{ width: '12vw' }}
                        showArrow
                      >
                        {this.state.data.map(v =>
                          <Option className="select_custom" value={v.roleName}>{v.roleName}</Option>
                        )}
                      </Select>
                    )) : dataIndex[index] == 'organizationName' ? (getFieldDecorator(`${dataIndex[index]}`, { initialValue: `${this.props.organizationName[0].organizationName}`, })(
                      <Select
                        defaultValue={this.state.organizationName[0].organizationName}
                      >
                        {this.state.organizationName.map(v =>
                          <Option value={v.organizationName}>{v.organizationName}</Option>
                        )}
                      </Select>
                    )) : dataIndex[index] == 'name' ? (getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: true, message: 'Please input your name', }],
                    })(<Input style={{ width: '12vw' }} className="custom_col" required />)) : dataIndex[index] == 'loginName' ? (getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: true, message: 'Please input your account', }],
                    })(<Input style={{ width: '12vw' }} className="custom_col" required />)) : (dataIndex[index] == 'password' && this.props.editName == "添加") ? (getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: true, message: 'Please input your password', }],
                    })(<Input style={{ width: '12vw' }} className="custom_col" required />)) : (getFieldDecorator(`${dataIndex[index]}`)(<Input style={{ width: '12vw' }} className="custom_col" />))}
                  </Form.Item>
                )
              })}
            </Form>
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>{this.state.submit}</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </React.Fragment>
    )
  }
}
export default Form.create()(Edit)