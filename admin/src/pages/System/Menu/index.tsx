import React, { useState, useEffect } from 'react';
import { Card, Table, Space } from 'antd';
import AddMenu from './components/AddMenu';
import { getStore } from '@/utils/session';

/**
 * {
 *  path,
 *  name,
 *  component,
 *  hideInMenu:false,
 *  routes:[],
 * }
 */

const getMenuListTest = () => {
  const MenuList = getStore('MenuList') || [];
  return MenuList;
};

const MenuView = () => {
  const [list, setList] = useState([]);

  const fetchList = () => {
    const MenuList = getMenuListTest();
    setList(MenuList);
  };

  useEffect(() => {
    fetchList();
  }, []);

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

  return (
    <Card>
      <div className="site-toolbar">
        <AddMenu onSuccess={fetchList} />
      </div>
      <Table columns={columns} dataSource={list} rowKey="id" pagination={false} />
    </Card>
  );
};

export default MenuView;
