import React from 'react'
import { Form, Select, Input, TreeSelect, Tree } from 'antd'
import api from '../../../../api/index'
const { Option } = Select
const { TreeNode } = TreeSelect;


class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      titles: ['数据中心', '部署楼层'],
      submit: '',
      dataIndex: ['dbcenter', 'floor'],
      value: undefined,
      obj: [
        { 'floor': '部署楼层' },
        { 'room': '房间号' },
        { 'col': '列' }
      ]
    }
  }
  onChange = value => {
    console.log(value);
    this.setState({ value });
  };
  componentWillMount() {
    //检查页面传过来的data数据
    console.log(this.props.data)
    console.log(this.props.record)
    console.log(this.props.smallAdd)
    if (this.props.titles == "添加") {
      console.log("查询获取数据中心")
      api.dbCenter_selectAll()
        .then(res => {
          console.log(res)
          this.setState({
            data: res.data.data
          })
        })
    }
    this.props.titles ? this.state.title = '添加' : this.state.title = '编辑'
    this.props.submit ? this.state.submit = "添加" : this.state.submit = "确定"
    this.setState({
      submit: this.state.submit
    })
  }
  componentDidMount() {
    if (this.props.content) {
      this.props.dataIndex.map(v => {
        const obj = {}
        obj[v] = this.props.content[v]
        this.props.form.setFieldsValue(obj)
      })
    }
    console.log(this.props.content)
    const classList3 = Array.from(document.getElementsByClassName('ant-form-item-control'))
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    let values = {};
    //拿到两个输入框的内容
    const custom_class = document.getElementsByClassName("label_custom")[0]
    const classList2 = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    const classList3 = Array.from(document.getElementsByClassName('ant-input'))
    //如果是小添加就不走下面的
    let text_1 = ""
    let text_2 = classList3[0].value
    console.log(classList3[0].value)
    if (!this.props.smallAdd) {
      console.log(classList2[0].innerText)
      text_1 = classList2[0].innerText
    }
    let key = "floor"
    if (this.props.smallAdd) {
      console.log(custom_class.innerText)
      this.state.obj.map(v => {
        console.log(Object.values(v)[0], custom_class.innerText)
        if (Object.values(v)[0] == custom_class.innerText) {
          key = Object.keys(v)[0]
        }
      })
      text_2 = classList3[1].value
      console.log(key)
    }
    //拿用户id
    const userId = window.localStorage.getItem("id")
    //将输入框中的数据与传过来的数据进行匹配，拿取对应的字段
    console.log(this.props.data)
    this.props.data.map(v_0 => {
      console.log(v_0, values)
      if (!this.props.smallAdd) {
        text_1 == v_0.dbcenter ? values["mapsId"] = v_0.mapsId : values["mapsId"] = values["mapsId"]
        // values["userId"] = userId
      }
      else {
        values["id"] = this.props.record.id
        values["mapsId"] = this.props.record.mapsId
      }     
      values[key] = text_2
    })
    console.log(values)
    if (e.target.innerText === '确定') {
      console.log('这里放编辑数据的接口')
      console.log()
      api.Area_edit(values)
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            this.props.updataEdit()
          }  
        })
    }
    //添加数据
    else {
      console.log('这里放添加数据的接口')
      values["userId"] = userId
      api.Area_add(values)
        .then(res => {
          console.log(res)
          if(res.status == 200) {
            this.props.updataEdit()
          }       
        })
    }
    this.props.updateParent()
  }

  render() {
    const dataIndex = this.state.dataIndex
    // console.log(dataIndex)
    const { titles, data } = this.state
      // console.log(data)
      // console.log(titles)
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '50vh' }}>
          <span>{this.state.title}</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '39vh', overflow: 'auto', padding: 10 }}>
            <div style={{ height: 30 }}>
              数据中心：{this.props.smallAdd ? <Input defaultValue={this.props.record.dbcenter} disabled></Input> : <TreeSelect
                showSearch
                style={{ width: 100 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                onChange={this.onChange}
              >
                {
                  data.length > 0 ? data.map(v_0 => (
                    v_0.country ? (<TreeNode title={v_0.country} value={v_0.country}>
                      {v_0.provinceVOS.length > 0 ? v_0.provinceVOS.map(v_1 => (
                        <TreeNode title={v_1.province} value={v_1.province}>
                          {v_1.cityVOS.length > 0 ? v_1.cityVOS.map(v_2 => <TreeNode value={v_2.city} title={v_2.city}>
                            {v_2.dbcenterVOS.length > 0 ? v_2.dbcenterVOS.map(v_3 => (
                              <TreeNode title={v_3.dbcenter} value={v_3.dbcenter}></TreeNode>
                            )) : ("is loading")}
                          </TreeNode>) : ("is loading")}
                        </TreeNode>
                      )) : ("is loading")}
                    </TreeNode>) : ("is loading")
                  )) : ("is loading")
                }
              </TreeSelect>}
              <div style={{ height: 10 }}></div>
              {this.props.smallAdd ? (
                this.state.title == "编辑" ? (
                  this.props.record.col ? (
                    <div><span className="label_custom">列</span>：<Input defaultValue={this.props.record.col}></Input></div>) :
                    this.props.record.room ? (
                      <div><span className="label_custom">房间号</span>: <Input defaultValue={this.props.record.room}></Input></div>) :
                      <div><span className="label_custom">部署楼层</span>: < Input defaultValue={this.props.record.floor}></Input></div>) :
                  (this.props.record.floor ? (this.props.record.room ? (
                    <div><span className="label_custom">列</span>: <Input placeholder="列"></Input></div>) : (<div><span className="label_custom">房间号</span>: <Input placeholder="房间号"></Input></div>
                    )
                  ) : (<div><span className="label_custom">部署楼层</span>: <Input placeholder="部署楼层"></Input></div>)
                  )) : (
                  <div><span className="label_custom">部署楼层</span>：<Input placeholder="部署楼层"></Input></div>
                )
              }
            </div>

          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={(e) => this.handleSubmit(e)}>{this.state.submit}</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </React.Fragment >
    )
  }
}
export default Form.create()(Edit)