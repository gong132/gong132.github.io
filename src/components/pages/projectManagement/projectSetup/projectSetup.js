import React from 'react'
import { Button, Table, Icon } from 'antd'
import api from '../../../../api/index'
import Register from './Register'
import './css.css'
class Setup extends React.Component {
  constructor(props) {
    super(props)
    this.updateParent=this.updateParent.bind(this)
    this.state = {
      data: [],
      showAdd:false,
      totalwidth:'',
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 80,
          align: 'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder: 'ascend'
        },
        {
          title: '项目编号',
          dataIndex: 'itemNo',
          width: 100,
          align: 'center',
        },
        {
          title: '项目名称',
          dataIndex: 'itemName',
          width: 120,
          align: 'center',
        },
        {
          title: '计划开始时间',
          dataIndex: 'startTime',
          width: 120,
          align: 'center',
        },
        {
          title: '计划结束时间',
          dataIndex: 'endTime',
          width: 120,
          align: 'center',
        },
        {
          title: '工程造价',
          dataIndex: 'budget',
          width: 120,
          align: 'center',
        },
        {
          title: '项目类型',
          dataIndex: 'type',
          width: 120,
          align: 'center',
        },
        {
          title: '项目跟踪人',
          dataIndex: 'name',
          width: 120,
          align: 'center',
        },
        {
          title: '项目状态',
          dataIndex: 'status',
          width: 120,
          align: 'center',
        },
        {
          title: '建设单位',
          dataIndex: 'company',
          width: 120,
          align: 'center',
        },
        {
          title: '立项人',
          dataIndex: 'applicantName',
          width: 100,
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 90,
          render: (text, record, index) => <div className="action">
            <a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span>查看</a>
          </div>
        },
      ]
    }
  }
  //查询
  select () {
    api.project_select()
      .then(res => {
        const data = res.data.data["items"].records
        data.map (v => {
          v["name"]=v.picUser.name
          v["company"]=v.itemCompany.name
        })
        console.log(data)
        this.setState({
          data:data
        })
      })
  }
  componentDidMount () {
    
  }
  componentWillMount() {
    this.select()
    let width = 0;
    this.state.columns.map(v => {
      typeof v.width === 'number' ? width = width + v.width : width = width;
    })
    this.setState ({
      totalwidth:width
    })
  }
  //展示编辑页面
  addInstitute() {
    this.setState({
      showAdd:true
    })
  }
  //隐藏编辑页面
  updateParent() {
    this.setState({
      showAdd:false
    })
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
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <div>
        <ul className="nav">
          <li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />登记</li>
        </ul> 
        <Table bordered
        scroll={{x:this.state.totalwidth}}
        rowSelection={rowSelection}
        rowKey = {record => record.id}
          columns={
            columns
          }
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 15,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
          {this.state.showAdd?<Register updateParent={this.updateParent} title={"登记"} submit={"添加"}></Register>:null}
      </div>
    )
  }
}
export default Setup