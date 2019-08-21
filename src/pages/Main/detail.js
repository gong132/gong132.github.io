/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import { Layout, Icon } from 'antd';
import styles from './detail.less'

const { Header, Content, Footer, Sider } = Layout;

class Detail extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className={styles.custom_header}>工作流关联关系建立</div>
          </Header>
          <Layout>
            <Sider style={{ background: '#fff', padding: 0 }}>
              <div className={styles.custom_sider_content_1}>需求</div>
              <div className={styles.custom_sider_img_top_1}>
                <div className={styles.custom_sider_img_top_1_img} />
              </div>
              <div className={styles.custom_sider_content_2}>Epic 1</div>
              <div className={styles.custom_sider_img_top_2}>
                <div className={styles.custom_sider_img_top_2_img} />
              </div>
              <div className={styles.custom_sider_content_3}>Story 1</div>
            </Sider>
            <Content style={{ background: '#fff', padding: 0 }}>
              <div className={styles.custom_content}>
                <div className={styles.content_top}>
                  <div className={styles.content_top_left}>
                    <p className={styles.content_top_left_title}>方法1：<span className={styles.content_top_left_def}>(推荐)</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>类型：</span> <span className={styles.custom_line_col_2}>Epic</span><span className={styles.custom_line_col_1}>状态: </span><span className={styles.custom_yellow}>已排期</span><span className={styles.custom_blue}>(查看工作流)</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>优先级：</span><span className={styles.custom_line_col_2}><Icon type="arrow-up" />中优先级(一般)</span><span><span className={styles.custom_line_col_1}>解决结果：</span></span>未解决</p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>影响版本：</span><span className={styles.custom_line_col_2}>无</span><span className={styles.custom_line_col_1}>解决版本：</span><span>无</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>模块：</span><span className={styles.custom_line_col_2}>无</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>标签：</span><span className={styles.custom_line_col_2_row_5}>PMO</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>关联需求：</span><span className={styles.custom_blue}>REQ-2664</span><span>关于全面实现开户阶段对客户进行黑名单筛查的IT需求申请</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>需求提出部门：</span><span className={styles.custom_line_col_2}>合规法律部</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>Epic Name：</span><span>综合柜台：开户流程进行黑名单检查</span></p>
                  </div>
                  <div className={styles.content_top_right}>
                    <span className={styles.content_top_left_title}>
                        方法2: 直接使用jira链接功能，需注意链接方向！
                    </span>
                    <div className={styles.custom_img} />
                  </div>
                </div>
                <div className={styles.content_bottom}>
                  <div className={styles.content_top_left_title}>Epic关联：</div>
                  <div className={styles.content_bottom_right}>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>类型：</span><span className={styles.custom_line_col_2}>Story</span><span className={styles.custom_line_col_1}>状态：</span><span>开始</span><span className={styles.custom_blue}>(查看工作流)</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>优先级：</span><span className={styles.custom_line_col_2}><Icon type="arrow-up" />中优先级(一般)</span><span className={styles.custom_line_col_1}>解决结果：</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>影响版本：</span><span className={styles.custom_line_col_2}>无</span><span className={styles.custom_line_col_1}>解决版本：</span><span className={styles.custom_blue}>V2.0.22</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>模块：</span>无</p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>标签：</span>无</p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>Epic Link：</span>关于全面实现开户阶段对客户进行黑名单筛选的IT需求申请</p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>Sprint：</span><span>ITBS-Sprint1802</span></p>
                    <p className={styles.custom_line}><span className={styles.custom_line_col_1}>Story Points：</span>6</p>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>

      </React.Fragment>
    )
  }
}

export default Detail