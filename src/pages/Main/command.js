/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Form, Table, Select, Badge, Button, Modal, Tabs, Input, Layout, Menu, DatePicker } from 'antd'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styles from './command.less'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Header, Sider, Content } = Layout;
const { Option } = Select
const { SubMenu } = Menu;

class Command extends React.Component {
  constructor() {
    super()
    this.state = {
      total: 500,
      totalWidth: '',
      visible: false,
      content: '',
      label: ["需求标题", "提交时间", "计划完成", "流程类型", "优先级", "需求描述", "备注信息", "附件文档"],
      dataIndex: ["title", 'startTime', 'endTime', 'flowType', 'priority', 'description', 'message', 'appendix'],
      data: [
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
        { id: 1, 'delay': 0, 'title': <span>[开发任务]<Link to="/main/detail">修改理财协议书取值逻辑</Link></span>, 'number': 'p00149', 'flowType': '新增需求', 'organization': '软件研发中心', 'lead': 'gong', 'type': '待分解任务', 'startTime': '2019-8-14', 'endTime': '2019-9-1' },
      ],
      columns: [
        {
          title: '',
          dataIndex: 'id',
          width: 80,
          align: 'center',
        },
        {
          title: '延误',
          dataIndex: 'delay',
          width: 60,
          align: 'center',
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 200,
          align: 'center',
        },
        {
          title: '编号',
          dataIndex: 'number',
          width: 60,
          align: 'center',
        },
        {
          title: '流程类型',
          dataIndex: 'flowType',
          width: 120,
          align: 'center',
        },
        {
          title: '提出部门',
          dataIndex: 'organization',
          width: 120,
          align: 'center',
        },
        {
          title: '负责人',
          dataIndex: 'lead',
          width: 80,
          align: 'center',
        },
        {
          title: '待办类型',
          dataIndex: 'type',
          width: 120,
          align: 'center',
        },
        {
          title: '提出时间',
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
      ]
    }
  }

  // 弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.handleSubmit(e)
    console.log(e);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    let width = 0
    this.state.columns.map(v => {
      width += v.width
    })
    this.setState({
      totalWidth: width
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          visible: false,
          content: values
        })
      }
    });
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

  showTotal(total) {
    return `一共 ${total} 页`;
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15, offset: 0 },
      layout: 'inline'
    };
    const { getFieldDecorator } = this.props.form;
    const { label, dataIndex } = this.state
    return (
      <React.Fragment>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="新建"
          cancelText="取消"
          onCancel={this.handleCancel}
          width="50vw"
          okButtonProps={{}}
          cancelButtonProps={{}}
        >
          <Form layout="inline" labelAlign="left" {...formItemLayout} layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>

            </Form.Item>
            {label.map((v, index) => {
              return (
                <Form.Item label={v}>
                  {
                    `${dataIndex[index]}` == "title" ? (getFieldDecorator(`${dataIndex[index]}`, { rules: [{ required: true }] })(<Input placeholder="请输入" style={{ width: '30vw' }} required />)) :
                      `${dataIndex[index]}` == "title" ? (<DatePicker />) :
                        (getFieldDecorator(`${dataIndex[index]}`, { rules: [{ required: true }] })(<Input placeholder="请输入" required />))
                  }
                </Form.Item>)
            })}
          </Form>
        </Modal>
        <Button onClick={() => this.showModal()}>新建需求</Button>
        <ul className={styles.badeg_nav}>
          <li>
            <Badge count={5} text="所有待办" showZero="true">
              <a href="#" className={styles.head_example} />
            </Badge>
          </li>
          <li>
            <Badge count={15} text="需求问题" showZero="true">
              <a href="#" className={styles.head_example} />
            </Badge>
          </li>
          <li>
            <Badge count={51} text="业务工单" showZero="true">
              <a href="#" className={styles.head_example} />
            </Badge>
          </li>
          <li>
            <Badge count={12} text="工单任务" showZero="true">
              <a href="#" className={styles.head_example} />
            </Badge>
          </li>
          <li>
            <Badge count={0} text="其他项" showZero="true">
              <a href="#" className={styles.head_example} />
            </Badge>
          </li>
          <li>
            <Form {...formItemLayout}>
              <Form.Item label="排序" colon wrapperCol={{ span: 15 }}>
                {getFieldDecorator('order', { initialValue: '升序' })(
                  <Select>
                    <Option value="升序">升序</Option>
                    <Option value="降序">降序</Option>
                  </Select>)
                }
              </Form.Item>
              <Form.Item label="待办类型" colon labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('type', { initialValue: '当前阶段' })(
                  <Select>
                    <Option value="待分解任务">待分解任务</Option>
                    <Option value="开发中需求">开发中需求</Option>
                  </Select>)
                }
              </Form.Item>
              <Form.Item label="提出部门" colon labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('order', { initialValue: '全部' })(
                  <Select>
                    <Option value="软件研发中心">软件研发中心</Option>
                    <Option value="运营管理部">运营管理部</Option>
                  </Select>)
                }
              </Form.Item>
            </Form>
          </li>
        </ul>
        <Table
          bordered
          scroll={{ x: this.state.totalwidth }}
          rowKey={record => record.id}
          columns={
            columns
          }
          dataSource={this.state.data}
          pagination={{

            defaultPageSize: 15,
            total: this.state.total,
            showTotal: this.showTotal,
            position: "bottom",
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </React.Fragment>
    )
  }
}
export default Form.create()(Command)