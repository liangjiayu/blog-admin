import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import { addUser, updateUser } from '@/api/user';
import { getRoleAll } from '@/api/role';

type UserModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const UserModal: React.FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);

  // 回显表单的字段
  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue(props.current);
    }
  }, [props.visible]);

  useEffect(() => {
    getRoleAll({}).then((res) => {
      const { data } = res;
      const list = data.map((item) => {
        return {
          label: item.roleName,
          value: item.roleId,
        };
      });
      setRoleList(list);
    });
  }, []);

  const onFinish = (values: any) => {
    if (props.current?.userId) {
      updateUser({ ...values, userId: props.current.userId }).then(() => {
        props.onSuccess();
      });
    } else {
      addUser(values).then(() => {
        props.onSuccess();
      });
    }
  };

  return (
    <>
      <Modal
        title={props.current ? '编辑' : '新增'}
        visible={props.visible}
        onOk={() => {
          form.submit();
        }}
        onCancel={props.onCancel}
        width={640}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          name="basic"
          onFinish={onFinish}
          preserve={false}
          initialValues={{}}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="角色" name="roleId" rules={[{ required: true }]}>
            <Select options={roleList}></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
