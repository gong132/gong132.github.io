import React, { Component } from 'react'
import { Icon, Table, Form, Select, Button, Input, AutoComplete, TreeSelect } from 'antd'
import '../../../../common/css/table.css'
import { Resizable } from 'react-resizable';
import api from '../../../../api/index'
import './propertyStand.css'
import Edit from './edit'
import axios from 'axios'
import * as utils from './utils'
const { Option } = Select
const InputGroup = Input.Group;
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

class PropertyStandingBook extends Component {

  constructor() {
    super()
    this.updateParent = this.updateParent.bind(this)
    this.updataEdit = this.updataEdit.bind(this)
    this.state = {
      data: [
        {
          key: 0,
          createDate: '2018-02-11',
          name: '终结者2号',
          code: '1332',
          signCode: 'afda',
          id: '1'
        }
      ],
      isShow: false,
      isShowAdd: false,
      totalWidth: '',
      content: {},
      title: [],
      dataIndex:[],
      isShowDelete: true,
      btns:[],
      columns: [
        {
          fixed: 'left',
          title: 'ID',
          dataIndex: 'id',
          width: 60,
          align:'center',
          sorter: (a, b) => a.id - b.id,
          defaultSortOrder:'ascend'
        },
        {
          title: '标签码',
          dataIndex: 'signCode',
          width: 140,
          sorter: (a, b) => a.signCode - b.signCode,
        },
        {
          title: '资产编码(SN号)',
          dataIndex: 'code',
          width: 140,
          sorter: (a, b) => a.code - b.code,
        },
        {
          title: '资产名称',
          dataIndex: 'name',
          width: 100,
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: '资产类型',
          dataIndex: 'typeId',
          width: 100,
          sorter: (a, b) => a.typeId - b.typeId,
        },
        {
          title: '资产型号',
          dataIndex: 'modelId',
          width: 100,
          sorter: (a, b) => a.modelId - b.modelId,
        },
        {
          title: '资产状态',
          dataIndex: 'status',
          width: 100,
          sorter: (a, b) => a.status - b.status,
        },
        
        {
          title: '品牌',
          dataIndex: 'brandId',
          width: 70,
          sorter: (a, b) => a.brandId - b.brandId,
        },
        {
          title: '模块编号',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '部门Id',
          dataIndex: 'organizationId',
          width: 90,
          sorter: (a, b) => a.organizationId - b.organizationId,
        },
        {
          title: '模块ID',
          dataIndex: 'equipModuleId',
          width: 90,
          sorter: (a, b) => a.equipModuleId - b.equipModuleId,
        },
        {
          title: 'u高',
          dataIndex: 'occupyU',
          width: 90,
          sorter: (a, b) => a.occupyU - b.occupyU,
        },
        {
          title: 'u位实际位置',
          dataIndex: 'locationU',
          width: 160,
          sorter: (a, b) => a.locationU - b.locationU,
        },
        {
          title: 'u位上一次的位置',
          dataIndex: 'locationPre',
          width: 180,
          sorter: (a, b) => a.locationPre - b.locationPre,
        },
        {
          title: '电流',
          dataIndex: 'electricity',
          width: 70,
          sorter: (a, b) => a.electricity - b.electricity,
        },
        {
          title: '额定功率(KVA)',
          dataIndex: 'ratePower',
          width: 120,
        },
        {
          title: '电源数量',
          dataIndex: 'powerNum',
          width: 100,
          sorter: (a, b) => a.powerNum - b.powerNum,
        },
        {
          title: '重量',
          dataIndex: 'weight',
          width: 80,
          sorter: (a, b) => a.weight - b.weight,
        },
        {
          title: '负责人',
          dataIndex: 'principal',
          width: 90,
          sorter: (a, b) => a.principal - b.principal,
        },
        {
          title: ' 联系方式',
          dataIndex: 'contactWay',
          width: 100,
          sorter: (a, b) => a.contactWay - b.contactWay,
        },
        {
          title: '首次使用时间',
          dataIndex: 'firstTime',
          width: 130,
          sorter: (a, b) => a.firstTime - b.firstTime,
        },
        {
          title: '最后使用时间',
          dataIndex: 'lastTime',
          width: 130,
          sorter: (a, b) => a.lastTime - b.lastTime,
        },
        {
          title: '购入价格',
          dataIndex: 'purchasePrice',
          width: 100,
          sorter: (a, b) => a.purchasePrice - b.purchasePrice,
        },
        {
          title: '报废价格',
          dataIndex: 'retirementPrice',
          width: 100,
          sorter: (a, b) => a.retirementPrice - b.retirementPrice,
        },
        {
          title: '上次维保时间',
          dataIndex: 'repairTime',
          width: 130,
          sorter: (a, b) => a.repairTime - b.repairTime,
        },
        {
          title: '维保周期',
          dataIndex: 'repairCycle',
          width: 100,
          sorter: (a, b) => a.repairCycle - b.repairCycle,
        },
        {
          title: ' 维保公司',
          dataIndex: 'repairCompany',
          width: 100,
          sorter: (a, b) => a.repairCompany - b.repairCompany,
        },
        {
          title: '维保负责人',
          dataIndex: 'repairPrincipal',
          width: 120,
          sorter: (a, b) => a.repairPrincipal - b.repairPrincipal,
        },
        {
          title: '维保联系方式',
          dataIndex: 'repairContactWay',
          width: 140,
          sorter: (a, b) => a.repairContactWay - b.repairContactWay,
        },
        {
          title: '备注信息',
          dataIndex: 'notes',
          width: 100,
          sorter: (a, b) => a.notes - b.notes,
        },
        {
          title: '创建者',
          dataIndex: 'createUserId',
          width: 90,
          sorter: (a, b) => a.createUserId - b.createUserId,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 100,
          sorter: (a, b) => a.createTime - b.createTime,
        },
        {
          title: '修改者',
          dataIndex: 'updateUserId',
          width: 90,
          sorter: (a, b) => a.updateUserId - b.updateUserId,
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          sorter: (a, b) => a.updateTime - b.updateTime,
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 250,
          render: (text, record, index) => <div className="action">
            {this.state.btns.indexOf("编辑")!==-1?<a href="javascript:;" onClick={() => this.edit(text, record, index)}><span className="glyphicon glyphicon-pencil edit"></span> 编辑</a>:null}&nbsp;
            {this.state.btns.indexOf("维保")!==-1?<a href="javascript:;" onClick={() => this.fix(text, record, index)}><span className="glyphicon glyphicon-wrench fix"></span>维保</a>:null}&nbsp;
          <a href="javascript:;"><span className="glyphicon glyphicon-map-marker location"></span>定位</a>&nbsp;
          {this.state.btns.indexOf("删除")!==-1&&text.status === '资产下架'?(<a href="javascript:;" onClick={() => this.delete(text, record, index)}><span className="glyphicon glyphicon-trash delete"></span>删除</a>):null}
          </div>
        },
      ],
    }
  }

  hidePages() {
    this.setState({
      isShow: false
    })
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
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const btnContent = document.getElementsByClassName('btn-add')[0].innerText
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       if (btnContent === '提 交') {
  //         this.hidePages()
  //         //编辑的数据
  //         console.log('提交了编辑后的数据')
  //         if (values.level === "一级") {
  //           values.level = 0
  //         }
  //         else {
  //           values.level = 1
  //         }
  //         api.edit(values)
  //           .then(res => {
  //             console.log(res)
  //             if (res.data.code === 1002) {
  //               alert('机构编号不能重复')
  //             }
  //             this.selectAll()
  //           })
  //           .catch(console.log('err'))
  //       }
  //       else if (btnContent === '添 加') {
  //         this.hidePages()
  //         api.add({ values })
  //           .then(res => {
  //             console.log(res)
  //             this.selectAll()
  //           })
  //           .catch(console.log('err'))
  //       }
  //     }
  //   });
  // }
  //资产维保
  fix() {
    console.log('资产维保')
  }
  //模板设置
  modelSetting () {

  }
  //添加数据
  addInstitute() {
    this.setState({
      isShowAdd: true,
      isShow: true
    })
  }
    //编辑使弹框消失
    updateParent() {
      this.setState({
        isShow: false,
        isShowAdd: false
      })
    }
   //根据编辑页面返回的数据来更新data
   updataEdit() {
     this.selectAll()
  }
  //删除数据一个数据
  delete(text) {
    console.log(text)
    if(text.id)
    api.ZC_remove({ "id": text.id })
      .then(res => {
        console.log(res)
        this.selectAll()
      })
      .catch(console.log('err'))
  }
  //删除多个数据
  deleteSome() {

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
    }, () => {
      console.log(this.state.content)
    })
  }
  //查找数据
  inquiry(e) {
    e.preventDefault()
    const classList = document.getElementsByClassName('ant-select-selection__rendered')
    console.log(classList)
    console.log(classList[0].innerText)
    console.log(classList[1].innerText)
    console.log(classList[2].innerText)

    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    let text = ''
    classList[0].innerText.trim() == '资产上架'? text = 1:classList[0].innerText.trim() == '资产下架'?text =0:text=""
    const params = {
      "firstTime": startTime,
      "lastTime": endTime,
      "status": text,
      "typeId": classList[1].innerText.trim(),
      "modelId": classList[2].innerText.trim(),
      "brandId": classList[3].innerText.trim()
    }
    console.log(params)
    this.selectAll(params)
  }
  //查询所有数据
  selectAll(params) {
    console.log(api)
    api.ZC_selectAll(params)
      .then(res => {
        console.log(res.data.data)
        const data = res.data.data || []
        //将0或1转换
        data.map(v => {
          v.status > 0 ? v.status = '资产上架' : v.status = "资产下架"
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
      dataIndex:arr2
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
        let btns = api.distr_anth(res)[1]["资产台账"]
        this.setState({
          btns:btns
        })
      })
  }
  componentDidMount () {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight-250 +'px'
  }

  showTotal(total) {
    return total
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };
  handleChange (value) {
    console.log(value)
  }
  render() {
    const {data, btns} = this.state;
    const treeData = [
      {
        title: '资产上架',
        value: '资产上架',
        key: '0-0',
      },
      {
        title: '资产下架',
        value: '资产下架',
        key: '0-1',
      },
    ];

    //处理搜索框的下拉显示///
    let treeData_1 =[]
    let treeData_2 =[]
    let treeData_3 =[]
    data.map(v => {
      v.typeId?treeData_1.push({title:v.typeId,key:v.typeId,value:v.typeId}):treeData_1=treeData_1
    })
    data.map(v => {
      v.modelId?treeData_2.push({title:v.modelId,key:v.modelId,value:v.modelId}):treeData_2=treeData_2
    })
    data.map(v => {
      v.brandId?treeData_3.push({title:v.brandId,key:v.brandId,value:v.brandId}):treeData_3=treeData_3
    })
    
    const tProps_0 = {
      treeData,
      onChange: this.onChange,
      treeCheckable: true,
      style: {
        width: 160,
      },
    };
    const tProps_1 = {
      treeData:treeData_1,
      onChange: this.onChange,
      treeCheckable: true,
      style: {
        width: 160,
      },
    };
    const tProps_2 = {
      treeData:treeData_2,
      onChange: this.onChange,
      treeCheckable: true,
      style: {
        width: 160,
      },
    };
    const tProps_3 = {
      treeData:treeData_3,
      onChange: this.onChange,
      treeCheckable: true,
      style: {
        width: 160,
      },
    };
////////////////////////////////

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
    //搜索框
    console.log(data)
    return (
      <React.Fragment>
        {/* <div style={{ display: 'flex', paddingRight: '15vw', margin: 3 }}>
          <InputGroup compact>
            <Select defaultValue="标签码">
              {this.state.columns.map(v => {
                return(
                  <Option value={v.title}>{v.title}</Option>
                )          
              })}
            </Select>
            <AutoComplete
              style={{ width: 150 }}
            />
          </InputGroup>
          <InputGroup compact>
            <Select defaultValue="标签码">
            {this.state.columns.map(v => {
                return(
                  <Option value={v.title}>{v.title}</Option>
                )          
              })}
            </Select>
            <AutoComplete       
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup compact>
            <Select defaultValue="标签码">
            {this.state.columns.map(v => {
                return(
                  <Option value={v.title}>{v.title}</Option>
                )          
              })}
            </Select>
            <AutoComplete
              style={{ width: 150 }}
            />
          </InputGroup>
        </div> */}
        <div style={{ display: 'flex', margin: 3, height: 30 }}>
          <TreeSelect {...tProps_0} placeholder='资产状态' />
          <TreeSelect {...tProps_1} placeholder='类型' />
          <TreeSelect {...tProps_2} placeholder='型号' />
          <TreeSelect {...tProps_3} placeholder='品牌' />
          <p className="search-up-down">上下架时间：</p><Input type="date" id="startTime" />-<Input type="date" id="endTime" />
          <Button type="primary" onClick={(e) => this.inquiry(e)}><Icon type="search" />查询</Button>
        </div>

        <ul className="nav">
          {btns.indexOf("登记")!==-1?<li onClick={() => this.addInstitute()}><Icon type="plus" style={{ color: '#00a65a', marginRight: 5 }} />登记</li>:null}
          {btns.indexOf("登记")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导入</li>:null}
          {btns.indexOf("登记")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />导出Excel</li>:null}
          {btns.indexOf("登记")!==-1?<li><Icon type="file-add" style={{ color: '#00a65a', marginRight: 5 }} />Excel导出表头</li>:null}
          {btns.indexOf("登记")!==-1?<li onClick={() => this.modelSetting()}><span className="glyphicon glyphicon-tasks" style={{ color: '#00a65a', marginRight: 5 }}></span>模板设置</li>:null}
          {btns.indexOf("登记")!==-1?<li><span className="glyphicon glyphicon-plus-sign" style={{ color: '#00a65a', marginRight: 5 }}></span>扩展属性</li>:null}
        </ul>
        <Table rowSelection={rowSelection} bordered components={this.components}
          columns={
            columns
          }
          column={{
            align: 'center'
          }}
          scroll={{ x: this.state.totalWidth + 200, y: document.body.clientHeigh-240 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 13,
            pageSize:13,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />

        {this.state.isShow ? (<Edit title={this.state.title} dataIndex={this.state.dataIndex} updateParent={this.updateParent} content={this.state.content} updataEdit={this.updataEdit}></Edit>) : null}
        {this.state.isShowAdd ? (<Edit updataEdit={this.updataEdit} updateParent={this.updateParent} dataIndex={this.state.dataIndex} title={this.state.title} titles={'登记'} submit={'添加'} ></Edit>) : null}
      </React.Fragment>

    )
  }
}
export default Form.create()(PropertyStandingBook);