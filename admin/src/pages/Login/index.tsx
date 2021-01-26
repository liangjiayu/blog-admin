import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './index.less';
import { userLogin } from '@/services/login';
import { setStore } from '@/utils/session';
import { history, useModel } from 'umi';

const LoginView = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onFinish = (values: any) => {
    userLogin({ ...values }).then((res) => {
      const { data } = res;
      setStore('TOKEN', data.token);
      setStore('USER_INFO', data.user);
      setStore('ROLE_INFO', data.role);
      setInitialState({
        ...initialState,
        token: data.token,
        userInfo: data.user,
        roleInfo: data.role,
      });
      setTimeout(() => {
        history.push('/');
      }, 10);
    });
  };

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.containerBox}>
        <div className={styles.containerLogo}>MIN系统</div>
        <Form onFinish={onFinish} size="large">
          <Form.Item name="username" rules={[{ required: true, message: '请输入邮箱!' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div></div>
    </div>
  );
};

export default LoginView;
