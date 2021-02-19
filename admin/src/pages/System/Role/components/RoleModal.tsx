import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

import { addRole, updateRole } from '@/api/role';

type RoleModalProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const RoleModal: React.FC<RoleModalProps> = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  useEffect(() => {
    if (props.visible) {
      form.setFieldsValue(props.current);
    }
  }, [props.visible]);

  const onFinish = (values: any) => {
    if (props.current?.roleId) {
      updateRole({ ...values, roleId: props.current.roleId }).then(()=>{
        props.onSuccess();
      })
    } else {
      addRole(values).then(() => {
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
