import React from 'react'
import {Form, Select, Input } from 'antd'
import api from '../../../../api/index'
const { Option } = Select

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titles: ['角色名称', '状态', '组织名称', '描述'],
      submit: '',
      dataIndex: ['roleName', 'status', 'organizationId', 'description'],
      organizationName:[]
    }
  }
  componentWillMount() {
    console.log(this.props.organizationName)
    this.props.titles ? this.state.title = '添加' : this.state.title = '编辑'
    this.props.submit ? this.state.submit = "添加" : this.state.submit = "确定"
    this.setState({
      submit: this.state.submit,
      organizationName:this.props.organizationName || []
    })
  }
  componentDidMount() {
    console.log(this.props.content)
    if (this.props.content) {
      this.state.dataIndex.map(v => {
        const obj = {}
        if(v == "organizationId") {
          obj[v] = this.props.content["name"]
        }else {
          obj[v] = this.props.content[v]
        }      
        this.props.form.setFieldsValue(obj)
      })
    }
    console.log(this.props.content)
    const classList = Array.from(document.getElementsByClassName('ant-input'))
    const classList2 = Array.from(document.getElementsByClassName('ant-form-item-label'))
    const classList3 = Array.from(document.getElementsByClassName('ant-form-item-control'))
    console.log(classList,classList2,classList3)
    classList[0].style.width=12+'vh'
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.status == "正常" ? values.status=1:values.status=2
        //编辑数据
        console.log(values)
        if (e.target.innerText === '确定') {
          console.log('这里放编辑数据的接口')
          console.log(this.props.organizationName)
          this.props.organizationName.map(v => {
            console.log(v.organizationName,values.organizationId)
            v.organizationName == values.organizationId? values.organizationId=v.id:values.organizationId=values.organizationId
          })
          values["id"] = this.props.content.id
          api.Role_edit(values)
            .then(res => {
              console.log(res)
              if (res.status == 200) {
                this.props.updataEdit()
              }  
            })
        }
        //添加数据
        else {
          console.log('这里放添加数据的接口')
          api.Role_add(values)
            .then(res => {
              console.log(res)
              if (res.status == 200) {
                this.props.updataEdit()
              }  
            })
        }
        this.props.updateParent()
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    };
    const { getFieldDecorator } = this.props.form;
    const dataIndex = this.state.dataIndex
    const titles = this.state.titles
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '70vh' }}>
          <span>{this.props.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '59vh', overflow: 'auto' }}>
            <div style={{ height: '29vh', display: 'flex', }}>
              <Form {...formItemLayout}>
                {titles.map((v, index) => {
                  return (
                    <Form.Item label={v} wrapperCol={{ span: 10, offset: 0 }} colon={false}>
                      {dataIndex[index] == 'status' ? (getFieldDecorator(`${dataIndex[index]}`, { initialValue: '正常' })(
                      <Select>
                        <Option value="正常">正常</Option>
                        <Option value="停用">停用</Option>
                      </Select>
                    )) :dataIndex[index] == 'organizationId'? (getFieldDecorator(`${dataIndex[index]}`, {rules:[{required:true}]} )(<Select>
                      {this.state.organizationName.map(v => {
                         return <Option value={v.id}>{v.organizationName}</Option>
                      })}
                    </Select>)) :dataIndex[index] == 'roleName'?(getFieldDecorator(`${dataIndex[index]}`, {rules:[{required:true}]} )(<Input style={{ width: '10vw' }} required></Input>)):(getFieldDecorator(`${dataIndex[index]}`, {
                      })(<Input style={{ width: '12vw' }} className="custom_col" />))}
                    </Form.Item>
                  )
                })}
              </Form>
            </div>
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>{this.state.submit}</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </React.Fragment>
    )
  }
}
export default Form.create()(Edit)