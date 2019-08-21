
/* eslint-disable class-methods-use-this */
import React from 'react'
import { Calendar, Select, Radio, Col, Row, Form, Layout, Descriptions } from 'antd';
import styles from './personal.less'

const { Group, Button } = Radio;
const { Footer, Sider, Content } = Layout;

class Assignment extends React.Component {
  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  render() {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      // 'Australian walks 100km after outback crash.',
      // 'Man charged over missing wedding girl.',
      // 'Los Angeles battles huge wildfires.',
    ];
    return (
      <Layout>
        <Content>
          内容
        </Content>
        <Footer className={styles.custom_footer}>
          <Layout>
            <Content>
              <Descriptions column={2} layout="vertical" bordered title="管理或参与的项目" border size="small">
                <Descriptions.Item label="项目名称">项目名称</Descriptions.Item>
              </Descriptions>
            </Content>
            <Sider theme="light" className={styles.custom_calendar}>
              <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Calendar
                  fullscreen={false}
                  headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];
                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className={styles.month_item} key={`${index}`}>
                          {months[index]}
                        </Select.Option>,
                      );
                    }
                    const month = value.month();
                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                      options.push(
                        <Select.Option key={i} value={i} className={styles.year_item}>
                          {i}
                        </Select.Option>,
                      );
                    }
                    return (
                      <div style={{ padding: 10 }}>
                        <div style={{ marginBottom: '10px' }}>我的日历</div>
                        <Row type="flex" justify="space-between">
                          <Col>
                            <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                              <Button value="month">Month</Button>
                              <Button value="year">Year</Button>
                            </Group>
                          </Col>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              className={styles.my_year_select}
                              onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                              }}
                              value={String(year)}
                            >
                              {options}
                            </Select>
                          </Col>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              value={String(month)}
                              onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                  onPanelChange={this.onPanelChange}
                />
              </div>
            </Sider>
          </Layout>
        </Footer>

      </Layout>

    )
  }
}
export default Form.create()(Assignment)