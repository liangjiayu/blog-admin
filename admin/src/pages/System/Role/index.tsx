import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, Popconfirm } from 'antd';

import RoleModal from './components/RoleModal';
import MenuPerm from './components/MenuPerm';

import { getRoleList, putRoleItem, delRoleItem } from './service';

const RoleView = () => {
  const [currentRow, setCurrentRow] = useState<any>();

  // RoleModal
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  // MenuPerm
  const [menuPermVisible, setMenuPermVisible] = useState(false);

  // List
  const [list, setList] = useState([]);

  const fetchList = () => {
    const RoleList = getRoleList();
    setList(RoleList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentRow(record);
              setRoleModalVisible(true);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              setCurrentRow(record);
              setMenuPermVisible(true);
            }}
          >
            菜单授权
          </a>
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              delRoleItem({ id: record.id });
              fetchList();
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div className="site-toolbar">
        <Button
          type="primary"
          onClick={() => {
            setCurrentRow(undefined);
            setRoleModalVisible(true);
          }}
        >
          新增角色
        </Button>
      </div>

      {/* 角色详情 */}
      <RoleModal
        visible={roleModalVisible}
        onCancel={() => {
          setCurrentRow(undefined);
          setRoleModalVisible(false);
        }}
        onSuccess={() => {
          setRoleModalVisible(false);
          fetchList();
        }}
        current={currentRow}
      />

      {/* 菜单授权 */}
      <MenuPerm
        visible={menuPermVisible}
        onCancel={() => {
          setCurrentRow(undefined);
          setMenuPermVisible(false);
        }}
        onSuccess={(keys) => {
          setMenuPermVisible(false);
          putRoleItem({ id: currentRow.id, menuPerm: keys });
        }}
        current={currentRow}
      />

      <Table columns={columns} dataSource={list} rowKey="id" />
    </Card>
  );
};

export default RoleView;
