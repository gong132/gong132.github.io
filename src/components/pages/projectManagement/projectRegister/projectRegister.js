import React from 'react'
import { Form, Input } from 'antd'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ["项目编号", "项目名称", "计划开始日期", "计划结束日期", , "预算", "项目类型", "质量等级", "项目跟踪人", "所属组织", "项目状态"],
      dataIndex: ["itemNo", "itemName", "startTime", "endTime", "budget", "type", "level", "leadUserId", "belongOrganization", "status"]
    }
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 10 },
    };
    return (
      <div>
        项目登记
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '50vh' }}>
          <span>{this.state.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '39vh', overflow: 'auto', padding: 10 }}>
            <div style={{ height: 30 }}>
            </div>
            <Form {...formItemLayout}>
              {this.state.title.map(v => {
                return (
                  <Form.Item
                    label={v}
                    wrapperCol={{ span: 10, offset: 0 }}
                  >
                    <Input style={{ width: '10vw' }}></Input>
                  </Form.Item>
                )
              })}
            </Form>
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>{this.state.submit}</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </div>
    )
  }
}
export default Register