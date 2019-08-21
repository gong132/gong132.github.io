import React from 'react'
import { Form, Select, Input, InputNumber } from 'antd'
import api from '../../../../api/index'
const { Option } = Select

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      titles: ['编号', '组织名称', '模块数量', '资产总数', '排序', '图标', '地址',],
      submit: '',
      dataIndex: ['organizationNo', 'organizationName', 'limitModuleCnt', 'limitAssetsCnt', 'seq', 'icon', 'address'],
      organizationName: []
    }
  }
  componentWillMount() {
    console.log(this.props.titles)
    this.props.titles ? this.state.title = '添加' : this.state.title = '编辑'
    this.props.submit ? this.state.submit = "添加" : this.state.submit = "确定"
    this.setState({
      submit: this.state.submit,
      organizationName: this.props.organizationName || []
    })
  }
  componentDidMount() {
    console.log(this.props.content)
    const userId = window.localStorage.getItem("id")
    let params = {

    }
    params["userId"] = userId
    api.select_organizationName(params)
      .then(res => {
        console.log(res)
        this.setState({
          name: res.data.data.organizationName
        })
      })
    if (this.props.content) {
      this.state.dataIndex.map(v => {
        const obj = {}
        obj[v] = this.props.content[v]
        this.props.form.setFieldsValue(obj)
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    this.props.form.validateFields((err, values) => {
      values["createUserId"] = window.localStorage.id
      if (!err) {
        console.log('Received values of form: ', values);

        if (e.target.innerText === '确定') {
          values["id"] = this.props.content.id
          console.log('这里放编辑数据的接口')
          api.edit(values)
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
          api.add(values)
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
    // console.log(dataIndex)
    const titles = this.state.titles
    // console.log(this.state.organizationName)
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '70vh' }}>
          <span>{this.props.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '59vh', overflow: 'auto' }}>
            <div style={{ height: '29vh', display: 'flex', }}>
              <Form {...formItemLayout}>
                <Form.Item label="上级机构">
                  <Select>
                    <Option value={this.state.name}>{this.state.name}</Option>
                  </Select>
                </Form.Item>
                {titles.map((v, index) => {
                  // console.log(dataIndex[index])
                  return (
                    <Form.Item label={v} wrapperCol={{ span: 10, offset: 0 }} colon={false}>
                      {dataIndex[index] == 'organizationNo' ? (getFieldDecorator(`${dataIndex[index]}`, { rules: [{ required: true }] })(
                        <Input style={{ width: '10vw' }}></Input>
                      )) : dataIndex[index] == 'organizationName' ? (getFieldDecorator(`${dataIndex[index]}`, { rules: [{ required: true }] })(<Input style={{ width: '10vw' }} />)) : dataIndex[index] == 'seq' ? (getFieldDecorator(`${dataIndex[index]}`)(<InputNumber defaultValue={0}></InputNumber>)) : dataIndex[index] == 'address' ? (getFieldDecorator(`${dataIndex[index]}`)(<Input style={{ width: '12vw' }}></Input>)) : (getFieldDecorator(`${dataIndex[index]}`, {
                      })(<Input style={{ width: '10vw' }} className="custom_col" />))}
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