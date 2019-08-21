import React from 'react'
import { Tree, Form } from 'antd';
import axios from 'axios';
import api from '../../../../api/index'

const { TreeNode } = Tree;

class ModelManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auths: []
    }
  }
  componentDidMount() {

  }
  componentWillMount() {
    api.Auth_selectAll()
      .then(res => {
        console.log(res.data.data)
        this.setState({
          auths: res.data.data,
        })
      })
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    let data = {

    };
    data["resourceIds"] =  checkedKeys.concat(info.halfCheckedKeys).join(",");
    data["roleId"] = this.props.roleId;
    this.setState ({
      data:data
    },()=>console.log(this.state.data))
  };

  //提交权限操作
  commitAuth() {
    console.log(this.state.data)
    api.Auth_commit(this.state.data)
      .then(res => {
        console.log(res)
      })
      this.props.updateParent()
  }
  //全选按钮
  select_all () {
    const classList = Array.from(document.getElementsByClassName('ant-tree-checkbox'))
    console.log(classList)
    classList.map(v => {
      v.classList.add("ant-tree-checkbox-checked")
    })
  }
  //反选按钮
  ant_select_all () {
    const classList = Array.from(document.getElementsByClassName('ant-tree-checkbox'))
    classList.map(v => {
      v.className.indexOf("ant-tree-checkbox-checked") == -1?v.classList.add("ant-tree-checkbox-checked"):v.classList.remove("ant-tree-checkbox-checked")
    })
  }
  //取消按钮
  cancel_all () {
    const classList = Array.from(document.getElementsByClassName('ant-tree-checkbox'))
    classList.map(v => {
      v.classList.remove("ant-tree-checkbox-checked")
    })
  }
  render() {
    const { auths } = this.state
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 100, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '35vw', height: '70vh' }}>
          <span>授权</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '30vw', cursor: 'pointer' }}></span>
          <div style={{ display: 'flex', border: '2px #ebebeb solid', background: 'white', height: '59vh' }}>
            <div className="body-border" style={{ width: '20vw', border: '2px #ebebeb solid', overflow: 'auto' }}>
              <p style={{ background: '#f2f2f2', border: '2px #ebebeb solid' }}>模块信息</p>
              <div>
                {
                  auths.length > 0 ? (
                    <Tree
                      checkable
                      showLine={true}
                      onSelect={this.onSelect}
                      onCheck={this.onCheck}
                      defaultExpandAll
                    >
                      {
                        auths.map(v_0 => (
                          v_0.parentId == 1 ? (<TreeNode title={v_0.name} key={v_0.id}>
                            {auths.map(v_1 => (
                              (parseInt(v_1.parentId / 10) === v_0.parentId) ? (<TreeNode title={v_1.name} key={v_1.id}>
                                {auths.map(v_2 => (
                                  (parseInt(v_2.parentId / 10) === v_1.parentId) ? (<TreeNode title={v_2.name} key={v_2.id}></TreeNode>) : ("isloading")
                                ))}
                              </TreeNode>) : ("isloading")
                            ))}
                          </TreeNode>) : ('isloading')
                        ))
                      }
                    </Tree>
                  ) : ('is loading')
                }
              </div>
            </div>
            <div className="body-border" style={{ marginLeft: 10 }}>
              <br />
              <button onClick={() => this.select_all()}>全选</button><br />
              <br />
              <button onClick={() => this.ant_select_all()}>反选</button><br />
              <br />
              <button onClick = {()=>this.cancel_all()}>取消</button>
            </div>
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={()=>this.commitAuth()}>确定</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Form.create()(ModelManagement);
