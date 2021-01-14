import React, { useState } from 'react';
import { Card, Table, Space } from 'antd';
import AddMenu from './components/AddMenu';

/**
 * {
 *  path,
 *  name,
 *  component,
 *  hideInMenu:false,
 *  routes:[],
 * }
 */

const MenuView = () => {
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '组件',
      dataIndex: 'component',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: '4646',
      name: '系统管理',
      path: '/System',
      component: '/System',
      hideInMenu: false,
      routes: [],
    },
  ];

  return (
    <Card>
      <div className="site-toolbar">
        <AddMenu />
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Card>
  );
};

export default MenuView;
