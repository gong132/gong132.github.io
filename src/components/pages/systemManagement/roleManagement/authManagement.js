import React from 'react'
import { Tree } from 'antd';
import api from '../../../../api/index'

const { TreeNode } = Tree;

class AuthManagement extends React.Component {
  constructor() {
    super()
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  componentWillMount () {
    
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 100, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '35vw', height: '70vh' }}>
          <span>授权</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '30vw', cursor:'pointer' }}></span>
          <div style={{ display: 'flex', border: '2px #ebebeb solid', background:'white',height:'59vh'}}>
            <div className="body-border" style={{width:'20vw', border: '2px #ebebeb solid'}}>
              <p style={{ background: '#f2f2f2', border: '2px #ebebeb solid' }}>资源名称</p>
              <Tree
                checkable
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                defaultExpandAll
              >
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0" >
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </div>
            <div className="body-border" style={{marginLeft:10}}>
              <br/>
              <button>全选</button><br />
              <br />
              <button>反选</button><br />
              <br />
              <button>取消</button>
            </div>
          </div>
          <div style={{border:'2px #ebebeb solid',padding:3}}><button>确定</button> <button onClick={this.props.updateParent}>取消</button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default AuthManagement;
