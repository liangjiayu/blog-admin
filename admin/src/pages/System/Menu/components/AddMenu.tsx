import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Switch, Radio, message } from 'antd';
import { getStore, setStore } from '@/utils/session';

/**
 * {
 *  type, menu btn
 *  path,
 *  name,
 *  component,
 *  hideInMenu:false,
 *  routes:[],
 * }
 */

const postMenuTest = (data) => {
  const MenuList = getStore('MenuList') || [];
  MenuList.push(data);
  setStore('MenuList', MenuList);
};

const AddMenu = (props) => {
  const { onSuccess } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    form.resetFields();
    setVisible(true);
  };
  const closeDrawer = () => {
    setVisible(false);
  };

  // *** Form ***
  const onFormFinish = (values: any) => {
    const id = new Date().getTime();
    const row = { id, ...values };
    postMenuTest(row);
    closeDrawer();
    message.success('保存成功');
    onSuccess();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        新增
      </Button>
      <Drawer
        title="新增菜单"
        placement="right"
        width="600"
        onClose={closeDrawer}
        visible={visible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 10 }} onClick={closeDrawer}>
              关闭
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              确定
            </Button>
          </div>
        }
      >
        <Form
          labelCol={{ span: 6 }}
          onFinish={onFormFinish}
          form={form}
          initialValues={{ type: 'menu', hideInMenu: false }}
        >
          <Form.Item label="菜单类型" name="type">
            <Radio.Group>
              <Radio value="menu">菜单</Radio>
              <Radio value="btn">按钮/权限</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="name" label="菜单名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="path" label="菜单路径" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="component" label="前端组件" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="隐藏路由" name="hideInMenu" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddMenu;
