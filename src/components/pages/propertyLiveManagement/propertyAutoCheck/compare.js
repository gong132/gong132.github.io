import React from 'react'
import { Icon, Table, Form, Select, AutoComplete, Input } from 'antd'
import api from '../../../../api/index'
const { Option } = Select
const InputGroup = Input.Group;
class Compare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          id: '1',
          updateTime: '20190719'
        }
      ],
      totalWidth: '',
      columns: [
        {
          fixed: 'left',
          title: '',
          dataIndex: 'id',
          width: 40,
          align: 'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder: 'ascend'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 100,
          sorter: (a, b) => a.createTime - b.createTime,
        },
        {
          title: '模块编码',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '资产编码',
          dataIndex: 'assetsCode',
          width: 100,
          sorter: (a, b) => a.assetsCode - b.assetsCode,
        },

        {
          title: '资产状态',
          dataIndex: 'status',
          width: 100,
          sorter: (a, b) => a.status - b.status,
        },
        {
          title: '占用U数',
          dataIndex: 'uUpShelfCnt',
          width: 100,
          sorter: (a, b) => a.uUpShelfCnt - b.uUpShelfCnt,
        },
        {
          title: 'U位号',
          dataIndex: 'locationU',
          width: 100,
          sorter: (a, b) => a.locationU - b.locationU,
        },
        {
          title: '数据中心',
          dataIndex: 'dbcenter',
          width: 100,
          sorter: (a, b) => a.dbcenter - b.dbcenter,
        },
        {
          title: '部署楼层',
          dataIndex: 'floor',
          width: 100,
          sorter: (a, b) => a.floor - b.floor,
        },
        {
          title: '房间号',
          dataIndex: 'room',
          width: 100,
          sorter: (a, b) => a.room - b.room,
        },
        {
          title: '列',
          dataIndex: 'col',
          width: 40,
          sorter: (a, b) => a.col - b.col,
        },
        {
          title: '机柜名称',
          dataIndex: 'equName',
          width: 100,
          sorter: (a, b) => a.equName - b.equName,
        },
        {
          title: '操作员',
          dataIndex: 'userName',
          sorter: (a, b) => a.userName  - b.userName ,
        },
      ]
    }
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const classList = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    console.log(classList[0].innerText)
    const first_char = classList[0].innerText
    const third_char = classList[2].innerText
    const di_1 = this.state.columns.filter(v => {
      return v.title == first_char
    })
    const di_2 = this.state.columns.filter(v => {
      return v.title == third_char
    })
    console.log(di_1)
    //分别获取每一个框的值，再将他们组合
    const second_sel = classList[1].innerText.trim()
    let first_sel = di_1[0].dataIndex
    let third_sel = di_2[0].dataIndex
    let fourth_sel = classList[3].innerText.trim()
    let params = {};
    params[first_sel] = second_sel;
    params[third_sel] = fourth_sel;
    console.log(params)
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    console.log(api)
    api.Warning_selectAll(params)
      .then(res => {
        console.log(res)
        const data = res.data.data || []
        //根据获取的status和newStatus来添加描述
        data.map(v => {
          // v.status == 0 ? v.status = '资产下架' : v.status == 1 ? v.status = "资产上架" : v.status = '待定'
          if (v.status == 0 && v.newStatus == 1) {
            console.log(123)
            v['discribe'] = "资产下架->资产上架"
          }
          else if (v.status == 1 && v.newStatus == 0) {
            v['discribe'] = "资产上架->资产下架"
          }
        })
        console.log(res)
        this.setState({
          data: data,
        })
      })
  }
  componentWillMount() {
    this.selectAll()
    let width = 0;
    let arr = [];
    let arr2 = [];
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
      arr.push(v.title)
      arr2.push(v.dataIndex)
    })
    console.log(width)
    this.setState({
      totalWidth: width,
      title: arr,
      dataIndex: arr2
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.innerText)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //编辑数据
        values["equipmentInfoId"] = this.props.infoId//获取infoid
        console.log(values)
        if (e.target.innerText === '确定') {
          console.log('这里放编辑数据的接口')
          api.JG_edit(values)
            .then(res => {
              console.log(res)
              this.props.updataEdit()
            })
        }
        //添加数据
        else {
          console.log('这里放添加数据的接口')
          api.JG_add(values)
            .then(res => {
              console.log(res)
              this.props.updataEdit()
            })
        }
        this.props.updateParent()
      }
    });
  }
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
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh', background: '#57595b', position: 'absolute', top: 0, left: 0, zIndex: 99, opacity: .8 }}></div>
        <div style={{ position: "absolute", zIndex: 100, top: 80, background: '#f7f7f7', boxShadow: '0 0 10px #ececec', borderRadius: 6, padding: '5px', width: '45vw', height: '80vh' }}>
          <span>详情</span><span onClick={this.props.updateParent} className="glyphicon glyphicon-remove" style={{ position: 'relative', left: '40vw', cursor: 'pointer' }}></span>
          <div style={{ fontFamily: 'aria', border: '2px #ebebeb solid', background: 'white', height: '69vh', overflow: 'auto' }}>
            <div style={{ display: 'flex',  marginLeft: 13 }}>
              <InputGroup compact>
                <Select defaultValue="标签码">
                  <Option value="0">标签码</Option>
                  <Option value="1">资产名称</Option>
                  <Option value="2">资产编号（SN号）</Option>
                  <Option value="3">模块编码</Option>
                </Select>
                <AutoComplete
                  style={{ width: 150 }}
                />
              </InputGroup>
              <ul className="nav">
              <li><Icon type="file-add" style={{ color: '#00a65a', paddingRight: 5 }} />导出Excel</li>
              </ul>
            </div>
            <Table bordered components={this.components}
              columns={
                columns
              }
              scroll={{ x: this.state.totalWidth + 200, y: 500 }}
              dataSource={this.state.data}
              pagination={{
                defaultPageSize: 15,
                total: this.state.total,
                showTotal: this.showTotal,
                position: "bottom"
              }} />
          </div>
          <div style={{ border: '2px #ebebeb solid', padding: 3 }}><button onClick={this.props.updateParent}>关闭</button></div>
        </div>
      </React.Fragment>
    )
  }
}
export default Form.create()(Compare)