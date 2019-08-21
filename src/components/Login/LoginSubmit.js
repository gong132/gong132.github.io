import React, { useState, useEffect }  from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {


  const [count, setCount] = useState(0);


  useEffect(() => console.log('useEffect',count),[count]);

  const clsString = classNames(styles.submit, className);

  return (
    <FormItem>
      <Button onClick={()=> setCount(count + 1)}>测试{count}</Button>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

export default LoginSubmit;
