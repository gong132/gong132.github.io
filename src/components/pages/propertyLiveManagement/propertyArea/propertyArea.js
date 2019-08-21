import React from 'react'
import { Icon, Table, Form, Select, Button, Input, AutoComplete, Modal } from 'antd'
import api from '../../../../api/index'
import { Resizable } from 'react-resizable';
import axios from 'axios'
import Edit from './edit'
import Utils from '../../../../components/utils/utils'
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
class PropertyArea extends React.Component {
  constructor(props) {
    super(props)
    this.updateParent = this.updateParent.bind(this)
    this.updataEdit = this.updataEdit.bind(this)
    this.state = {
      isShowAdd: false,
      isShow: false,
      smallAdd: false,
      visible: false,
      btns:'',
      data: [

      ],
      columns: [
        {
          title: '数据中心',
          dataIndex: 'dbcenter',
          width: 140,
          align: 'center'
        },
        {
          title: '所属区域',
          dataIndex: 'floor',
          width: 100,
          align: 'center'
        },
        {
          title: '组织名称',
          dataIndex: 'orgName',
          width: 100,
          sorter: (a, b) => a.orgName - b.signCode,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 100,
        },
        {
          title: '操作',
          dataIndex: 'action',
          render: (text, record, index) => <div className="action">
            {this.state.btns.indexOf("编辑")!==-1 &&record.floor ? <a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a> : null}
            {this.state.btns.indexOf("添加")!==-1 &&record.col ? null : <a href="javascript:;" onClick={() => this.add(text, record, index)}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />添加</a>}&nbsp;
          {this.state.btns.indexOf("删除")!==-1?<a href="javascript:;" onClick={() => this.showModal(text, record, index)}><span className="glyphicon glyphicon-trash delete"></span>删除</a>:null}
          </div>
        },
      ]
    }
  }

  //控制提示框
  showModal = (text, record, index) => {
    console.log(text, record, index)
    console.log(record.room)
    console.log(record.room == undefined)
    if (record.room && record.col && record.floor) {
      record["type"] = 3
    }
    else if (record.room && record.floor) {
      record["type"] = 2
    }
    else if (record.floor) {
      record["type"] = 1
    }
    else {
      record["type"] = 0
    }
    this.setState({
      visible: true,
      text: record
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
    }, this.delete());
  };

  //编辑使弹框消失
  updateParent() {
    this.setState({
      isShow: false,
      isShowAdd: false
    })
  }

  //添加数据
  add(text, record, index) {
    console.log(text, record, index)
    //判断是不是小添加
    if (record) {
      this.setState({
        smallAdd: true,
        record: record,
        isShowAdd: true,
        isShow: false,
      })
    }
    else {
      this.setState({
        isShowAdd: true,
        isShow: false,
        smallAdd: false
      })
    }
  }
  //编辑使弹框消失
  updateParent() {
    this.setState({
      isShow: false,
      isShowAdd: false
    })
  }
  //编辑数据
  edit(text, record, index) {
    console.log(text, record, index)
    this.setState({
      isShow: true,
      isShowAdd: false,
      content: text,
      index: index,
      smallAdd: true,
      record: record
    })
    setTimeout(() => {
      this.props.form.setFieldsValue({
      })
    }, 0)
  }
  //根据编辑页面返回的数据来更新data
  updataEdit() {
    this.selectAll()
  }

  //删除
  delete() {
    console.log('删除')
    // api.Area_delete()
    console.log(this.state.text)
    let params = {
      "mapsId": this.state.text.mapsId,
      "type": this.state.text.type,
      "floor": this.state.text.floor,
      "room": this.state.text.room,
      "col": this.state.text.col
    }
    if (this.state.text.room || this.state.text.col) {
      params["floor"] = this.state.text.floor_0
    }
    console.log(params)
    // axios.delete('http://192.168.43.86:8062/areaManage/deleteById', { params: params })
    api.Area_delete(params)
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.selectAll()
        }
      })
  }

  //查询所有数据
  selectAll(params) {
    console.log(api)
    let obj = {
    }
    // axios.get('http://192.168.0.109:8062/areaManage/getAreaDate')
    api.Area_selectAll(params)
      .then(res => {
        console.log(res)
        const data = res.data.data || []
        //将0或1转换
        console.log(data)
        //自定义一个数组和对象来处理后端返回的数据
        let arr = []
        let obj = {}
        data.map((v_0, index_0) => {
          v_0["key"] = index_0;
          v_0.children ? v_0.children.map((v_1, index_1) => {
            console.log(v_1)
            v_1["key"] = index_0 + "-" + index_1
            obj = JSON.parse(JSON.stringify(v_1))
            obj["dbcenter"] = v_0.dbcenter
            obj["mapsId"] = v_0.mapsId
            obj.children ? obj.children.map((v_2, index_2) => {
              v_2["key"] = index_0 + "-" + index_1 + "-" + index_2
              v_2["floor_0"] = v_1.floor
              v_2["floor"] = v_2.room
              v_2["mapsId"] = v_0.mapsId
              v_2["dbcenter"] = v_0.dbcenter
              v_2.children ? v_2.children.map((v_3, index_3) => {
                v_3["key"] = index_0 + '-' + index_1 + '-' + index_2 + '-' + index_3
                v_3["mapsId"] = v_0.mapsId
                v_3["floor_0"] = v_2.floor_0
                v_3["room"] = v_2.floor
                v_3["floor"] = v_3.col
                v_3["dbcenter"] = v_0.dbcenter
              }) : (v_2.children = null)
            }) : (obj.children = null)
            if (obj.children != null) {
              console.log(obj.children)
              obj.children.map((v_4, index_4) => {
                if (v_4.room == null || v_4.room == "") {
                  obj.children.length > 1 ? obj.children.splice(index_4, 1) : obj.children = null
                }
                else {
                  console.log(v_4.children)
                  v_4.children.map((v_5, index_5) => {
                    if (v_5.col == null || v_5.col == "") {
                      console.log(v_5)
                      v_4.children.length > 1 ? v_4.children.splice(index_5, 1) : v_4.children = null
                      console.log(v_4.children)
                    }
                  })
                }
              })
            }
            arr.push(obj)
          }) : (arr.push(data[index_0]))
        })
        console.log(data)
        console.log(arr)
        this.setState({
          data: arr,
        })
      })
  }

  componentWillMount() {
    this.selectAll()
    let width = 0;
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
    })
    console.log(width)
    this.setState({
      totalWidth: width,
    })
    //获取权限
    const id = window.localStorage.getItem('id')
    const params = {
      "userId": id
    }
    api.Layouts(params)
      .then(res => {
        res = res.data.data
        console.log(res)
        let btns = api.distr_anth(res)[1]["区域管理"]
        this.setState({
          btns:btns
        })
      })
  }
  componentDidMount() {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-wrapper'))
    console.log(className)
    className[0].style.height = 80 + 'vh'
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

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    const { btns } = this.state
    console.log(btns)
    return (
      <React.Fragment>
        <ul className="nav">
          {btns.indexOf('添加')!== -1?<li onClick={() => this.add()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />添加</li>:null}
          {btns.indexOf("Excel导入")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导入</li>:null}
          {btns.indexOf("导出Excel")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />导出Excel</li>:null}
          {btns.indexOf("数据中心")!==-1?<li onClick={() => Utils.prototype.goToDBcenter(this.props)}><span className="glyphicon glyphicon-hdd" style={{ color: '#00a65a', marginRight: 5 }}></span>数据中心</li>:null}
        </ul>
        <Table bordered components={this.components}
          columns={
            columns
          }
          rowSelection={rowSelection}
          scroll={{ y: document.body.clientHeight - 200 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 8,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
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
        {this.state.isShow ? <Edit dataIndex={this.state.dataIndex} record={this.state.record} smallAdd={this.state.smallAdd} title={this.state.title} content={this.state.content} updateParent={this.updateParent} infoId={this.state.data[this.state.index].equipmentInfoId} updataEdit={this.updataEdit} data={this.state.data}></Edit> : null}

        {this.state.isShowAdd ? (<Edit record={this.state.record} smallAdd={this.state.smallAdd} data={this.state.data} dataIndex={this.state.dataIndex} title={this.state.title} updateParent={this.updateParent} titles={'添加'} submit={'添加'} updataEdit={this.updataEdit}></Edit>) : null}
      </React.Fragment>
    )
  }
}

export default Form.create()(PropertyArea)