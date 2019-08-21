import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import api from '../../../../api';
const { Option } = Select
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: ["项目编号", "项目名称", "计划开始日期", "计划结束日期", "预算", "项目类型", "质量等级", "项目跟踪人", "所属组织", "项目状态"],
      dataIndex: ["itemNo", "itemName", "startTime", "endTime", "budget", "type", "level", "leadUserId", "belongOrganization", "status"],
      leadUer:[]
    }
  }
  handleSubmit(e) {
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  }
  componentWillMount () {
    api.User_selectAll()
    .then(res => {
      const data = res.data.data.users
      console.log(data)
      this.setState({
        leadUer:data
      })
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };
    const { getFieldDecorator } = this.props.form;
    const { dataIndex } = this.state
    return (
      <div>
        项目登记
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80,left:'10vw', background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '85vw', height: '80vh' }}>
          <span>{this.props.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '80vw', cursor: 'pointer' }}></span>
          <div style={{fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '69vh', overflow: 'auto', padding: 10 }}>
            <div style={{ height: 30, width:'100vw' }}>
            基本信息
            </div>   
            <Form {...formItemLayout}>
              {this.state.labels.map((v,index) => {
                return (
                  <Form.Item
                    label={v}
                    wrapperCol={{ span: 12, offset: 0 }}
                  >
                    {dataIndex[index]=='belongOrganization'?(getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: false }],
                    })
                    (<Input style={{ width: '12vw' }}></Input>)):
                    dataIndex[index]=='leadUserId' && this.state.leadUer[0]?(getFieldDecorator(`${dataIndex[index]}`, {
                      initialValue: `${this.state.leadUer[0].name}`,
                    })
                    (<Select
                      defaultValue={this.state.leadUer[0].name}
                    >
                      {this.state.leadUer.map(v =>
                        <Option value={v.name}>{v.name}</Option>
                      )}
                    </Select>)):
                    dataIndex[index]=='startTime'?(getFieldDecorator(`${dataIndex[index]}`)
                    (<DatePicker style={{ width: '10vw' }} />)):
                    dataIndex[index]=='endTime'?(getFieldDecorator(`${dataIndex[index]}`)
                    (<Input type="date" style={{ width: '12vw' }}></Input>)):
                    (getFieldDecorator(`${dataIndex[index]}`, {
                      rules: [{ required: true }],
                    })
                    (<Input style={{ width: '12vw' }}></Input>))}
                  </Form.Item>
                )
              })}
            </Form>
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>{this.props.submit}</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </div>
    )
  }
}
export default Form.create()(Register)