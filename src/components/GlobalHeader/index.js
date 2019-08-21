import React, { PureComponent } from 'react';
import { Icon, Button } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import { array } from 'prop-types';
import styles from './index.less';
import Breadcrumb from './breadcrumb'
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  changeRouter(e) {
    console.log(e)
  }

  render() {
    const { collapsed, isMobile, logo } = this.props;
    const array = ['需求管理', "Epic管理", 'Story管理', '用例', '故障', '报表']
    const routes = ['command','Epic','Story','example','fail','table']
    const outdom = array.map((v,index) => <div className={styles.toptitle} >
      <Link to={`/main/${routes[index]}`}><span style={{ color: "#2f87f3" }} onClick={(e) => this.changeRouter(e)}>{v}</span></Link>
      
    </div>)
    return (
      <div className={styles.header}>
        <span className={styles.trigger} onClick={this.toggle} style={{ color: "#908e8e" }}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        {outdom}
        <RightContent {...this.props} />
      </div>
    );
  }
}
