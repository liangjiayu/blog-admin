import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';

import { addUser, updateUser } from '../service';

type UserModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const RoleList = [
  {
    roleId: 1,
    roleName: '管理员',
    roleCode: 'admin',
  },
  {
    roleId: 2,
    roleName: '测试人员',
    roleCode: 'test',
  },
];

const RoleListoptions = RoleList.map((item) => {
  return {
    label: item.roleName,
    value: item.roleId,
  };
});

const UserModal: React.FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue(props.current);
    }
  }, [props.visible]);

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
            <Select options={RoleListoptions}></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
