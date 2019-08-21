import React, { Component} from 'react'
import { Icon, Table, Button, Input, TreeSelect } from 'antd'
import api from '../../../../api/index'
import { Resizable } from 'react-resizable';
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
class propertyHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [

      ],
      totalWidth: '',
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
          title: '资产名称',
          dataIndex: 'name',
          width: 100,
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: '资产U高',
          dataIndex: 'occupyU',
          width: 100,
          sorter: (a, b) => a.occupyU - b.occupyU,
        },
        {
          title: '首次使用时间',
          dataIndex: 'firstTime',
          width: 160,
          sorter: (a, b) => a.firstTime - b.firstTime,
        },
        {
          title: '最后使用时间',
          dataIndex: 'lastTime',
          width: 160,
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
          title: '资产状态',
          dataIndex: 'status',
          width: 100,
          sorter: (a, b) => a.status - b.status,
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
          title: '部署房间',
          dataIndex: 'room',
          width: 100,
          sorter: (a, b) => a.room - b.room,
        },
        {
          title: '列',
          dataIndex: 'col',
          width: 100,
          sorter: (a, b) => a.col - b.col,
        },
        {
          title: '机柜名称',
          dataIndex: 'equipmentName',
          width: 100,
          sorter: (a, b) => a.equipmentName - b.equipmentName,
        },
        {
          title: '模块编号',
          dataIndex: 'moduleCode',
          width: 100,
          sorter: (a, b) => a.moduleCode - b.moduleCode,
        },
        {
          title: '资产u位实际位置',
          dataIndex: 'locationU',
          sorter: (a, b) => a.locationU - b.locationU,
        },
      ]
    }
  }
//查询
  inquiry(e) {
    e.preventDefault()
    const classList = Array.from(document.getElementsByClassName('ant-select-selection__rendered'))
    console.log(classList)
    console.log(classList[0].innerText)
    console.log(classList[1].innerText)
    console.log(classList[2].innerText)
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    let text = ''
    classList[0].innerText.trim() === '资产上架'? text = 1:classList[0].innerText.trim() === '资产下架'?text =0:text=""
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
    api.Count_selectAll(params)
      .then(res => {
        console.log(res.data.data)
        let data = res.data.data
        //将0或1转换
        data !== null ? data.map(v => {
          console.log(v.status)
          return v.status == 0 ? v.status = '资产下架':v.status == 1 ? v.status = "资产上架":v.status = '待定'
        }):data = ''
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
      return null;
    })
    console.log(width)
    this.setState({
      totalWidth: width,
      title: arr,
      dataIndex:arr2
    })
  }
  componentDidMount () {
    //调整表格大小
    const className = Array.from(document.getElementsByClassName('ant-table-body'))
    console.log(className)
    className[0].style.height = document.body.clientHeight - 200 + 'px'
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
  render () {
    let data = this.state.data || [];
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
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <React.Fragment>
        <div style={{ display: 'flex', margin: 3, height: 30 }}>
          <TreeSelect {...tProps_0} placeholder='资产状态' />
          {/* <TreeSelect {...tProps_1} placeholder='类型' />
          <TreeSelect {...tProps_2} placeholder='型号' />
          <TreeSelect {...tProps_3} placeholder='品牌' />
          <p className="search-up-down">上下架时间：</p><Input type="date" id="startTime" />-<Input type="date" id="endTime" /> */}
          <Button type="primary" onClick={(e) => this.inquiry(e)}><Icon type="search" />查询</Button>
        </div>
        <Table bordered components={this.components}
          columns={
            columns
          }
          column={{
            align: 'center'
          }}
          scroll={{ x: this.state.totalWidth + 200, y: document.body.clientHeight - 200 }}
          dataSource={this.state.data}
          pagination={{
            defaultPageSize: 28,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom"
          }} />
      </React.Fragment>
    )
  }
}
export default propertyHistory;