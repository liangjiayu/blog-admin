import React from 'react';
import { Form, Input, Modal } from 'antd';
import { getStore, setStore } from '@/utils/session';

type RoleModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const addRoleTest = (data) => {
  const roleList = getStore('roleList') || [];
  roleList.push({ ...data, id: new Date().getTime() });
  setStore('roleList', roleList);
};

const putRoleTest = (data) => {
  const roleList = getStore('roleList') || [];
  const current = roleList.find((i) => {
    return i.id === data.id;
  });
  current.roleName = data.roleName;
  current.roleCode = data.roleCode;
  setStore('roleList', roleList);
};

const RoleModal: React.FC<RoleModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  if (props.visible) {
    form.setFieldsValue(props.current);
  }

  const onFinish = (values: any) => {
    if (props.current?.id) {
      putRoleTest({ ...values, id: props.current.id });
    } else {
      addRoleTest(values);
    }
    props.onSuccess();
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
          labelCol={{ span: 6 }}
          name="basic"
          onFinish={onFinish}
          preserve={false}
          initialValues={{}}
        >
          <Form.Item label="角色编码" name="roleCode" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="角色名称" name="roleName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleModal;
