import React from 'react'
import { Form, Select, Input } from 'antd'
import api from '../../../../api/index'
import './propertyStand.css'
const { Option } = Select

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      submit: '',
      dataIndex: [],
    }
  }
  componentWillMount() {
    console.log(this.props.title)
    this.props.title.splice(this.props.title.length-1,1)
    this.props.titles ? this.state.title = '登记' : this.state.title = '编辑'
    this.props.submit ? this.state.submit = "添加" : this.state.submit = "确定"
    this.setState({
      title: this.state.title,
      submit: this.state.submit
    })
    console.log(this.props.title)
    this.props.dataIndex.splice(this.props.dataIndex.length-1,1)
    this.setState({
      dataIndex: this.props.dataIndex
    })
  }
  componentDidMount() {
    if (this.props.content) {
      this.props.dataIndex.splice(this.props.dataIndex.length-1,1)
      this.props.dataIndex.map(v => {
        const obj = {}
        obj[v] = this.props.content[v]
        this.props.form.setFieldsValue(obj)
      })
    }
    const classList = Array.from(document.getElementsByClassName('col_custom'))
    console.log(classList[8])
    const classList2 = Array.from(document.getElementsByClassName('ant-form-item-label'))
    classList2[8].style.width = "8vw"
    // classList[8].style.width = "32vw"
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        //编辑数据
        if (e.target.innerText === '确定') {
          console.log('这里放编辑数据的接口')
          api.ZC_edit(values)
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
          values["createUserId"] = window.localStorage.id
          api.ZC_add(values)
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
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };
    const { getFieldDecorator } = this.props.form;
    const dataIndex = this.state.dataIndex
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '80vh' }}>
          <span>{this.state.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', border: '2px #ebebeb solid', background: 'white', height: '69vh', overflow: 'auto' }}>
            <Form {...formItemLayout}>
              {this.props.title.map((v, index) => {
                return (
                  <Form.Item label={v} wrapperCol={{ span: 10, offset: 0 }} colon={false}>
                    {dataIndex[index] == 'code' ? (getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: true }],
                    })(<Input style={{ width: '12vw' }} className="custom_col" />)) : dataIndex[index] == 'id' ? (getFieldDecorator(`${dataIndex[index]}`)(<Input disabled style={{ width: '12vw' }} className="custom_col" />)) : (getFieldDecorator(`${dataIndex[index]}`, {
                    })(<Input style={{ width: '12vw' }} className="custom_col" />))}
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