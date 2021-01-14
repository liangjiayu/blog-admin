import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Switch, Radio } from 'antd';

/**
 * {
 *  path,
 *  name,
 *  component,
 *  hideInMenu:false,
 *  routes:[],
 * }
 */

const AddMenu = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
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
        closable={false}
        onClose={onClose}
        visible={visible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 10 }}>关闭</Button>
            <Button type="primary">确定</Button>
          </div>
        }
      >
        <Form labelCol={{ span: 6 }}>
          <Form.Item label="菜单类型">
            <Radio.Group>
              <Radio value="1">菜单</Radio>
              <Radio value="2">按钮/权限</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="name" label="菜单名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="path" label="路径" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="component" label="组件" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="是否路由菜单">
            <Switch />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddMenu;
