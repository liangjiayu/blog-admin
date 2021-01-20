import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { getStore, setStore } from '@/utils/session';

// export type RoleModalProps = {
//   onCancel: (flag?: boolean, formVals?: FormValueType) => void;
//   onSubmit: (values: FormValueType) => Promise<void>;
//   updateModalVisible: boolean;
//   values: Partial<TableListItem>;
// };

const addRoleTest = (data) => {
  const roleList = getStore('roleList') || [];
  roleList.push({ ...data, id: new Date().getTime() });
  setStore('roleList', roleList);
};

const RoleModal = (props) => {
  const [form] = Form.useForm();

  // 回显表单的字段
  if (props.visible) {
    form.setFieldsValue(props.values);
  }

  const onFinish = (values: any) => {
    console.log(props);

    // console.log('Success:', values);
    // addRoleTest(values);
    // props.onSuccess();
  };

  return (
    <>
      <Modal
        title="新增"
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
          <Form.Item label="角色名称" name="roleName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="角色编码" name="roleCode" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleModal;
