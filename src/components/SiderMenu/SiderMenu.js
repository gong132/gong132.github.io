/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React, { PureComponent, Suspense } from 'react';
import { Layout,Icon, Modal,Tabs,Form, Input } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import { title } from '../../defaultSettings';
import imgURL from '@/assets/logo.png';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;
let firstMount = true;

class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
      visible:false,
      content:{},
    };
  }

  componentDidMount() {
    firstMount = false;
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
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          content: values
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14, offset: 2 },

    };
    console.log(this.props)
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });

    return (
      
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="创建"
          cancelText="取消"
          onCancel={this.handleCancel}
          okButtonProps={{}}
          cancelButtonProps={{}}
        >
          <Tabs defaultActiveKey="1" onChange={() => this.callback()}>
            <TabPane tab="新建任务分组" key="1">
              <Form {...formItemLayout} layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="任务分组名称">
                  {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                </Form.Item>
                <Form.Item label="任务分组描述">
                  {getFieldDecorator('description', {
                  })(<TextArea placeholder="请输入" />)}
                </Form.Item>
              </Form>
            </TabPane>
            {/* <TabPane tab="从模板创建" key="2">
              从模板创建
            </TabPane> */}
          </Tabs>,
        </Modal>

        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={imgURL} />
            <h1>VisualALM</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>

          <div className={styles.toptitle}>
            <div style={{color:"#212529"}}>分组</div>
          </div>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />

          <div className={styles.floor}>
            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <div style={{color:"#212529"}}>视图</div>
                <Icon type="question-circle" className={styles.tips_query} />
              </div>
              <Icon type="plus" />
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="unordered-list" className={styles.tips_query} />
                <div className={styles.maginleft}><Link to="/main/index">所有任务</Link> </div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="unordered-list" className={styles.tips_query} />
                <div className={styles.maginleft}>新建任务</div>
              </div>
              <Icon type="plus" onClick={() => this.showModal()} />
              {/* <span className={styles.maginright}>...</span> */}
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="shopping" className={styles.tips_query} />
                <div className={styles.maginleft}>今日的任务</div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="border" className={styles.tips_query} />
                <div className={styles.maginleft}>未完成的任务</div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="mail" className={styles.tips_query} />
                <div className={styles.maginleft}>已完成的任务</div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="user-add" className={styles.tips_query} />
                <div className={styles.maginleft}>待认领的任务</div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

            <div className={styles.titleside}>
              <div className={styles.tipside}>
                <Icon type="user" className={styles.tips_query} />
                <div className={styles.maginleft}>我执行的任务</div>
              </div>
              <span className={styles.maginright}>...</span>
            </div>

          </div>
        </Suspense>
      </Sider>
    );
  }
}
export default Form.create()(SiderMenu)