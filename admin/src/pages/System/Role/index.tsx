import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button } from 'antd';

import RoleModal from './components/RoleModal';
import MenuPerm from './components/MenuPerm';

import { getStore, setStore } from '@/utils/session';

const getRoleListTest = () => {
  return getStore('roleList') || [];
};

const putRoleTest = (data) => {
  const roleList = getStore('roleList') || [];
  const current = roleList.find((i) => {
    return i.id === data.id;
  });
  current.menuPerm = data.menuPerm;
  setStore('roleList', roleList);
};

const RoleView = () => {
  const [currentRow, setCurrentRow] = useState<any>();

  // RoleModal
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  // MenuPerm
  const [menuPermVisible, setMenuPermVisible] = useState(false);

  // List
  const [list, setList] = useState([]);

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
        </Space>
      ),
    },
  ];

  const fetchList = () => {
    const RoleList = getRoleListTest();
    setList(RoleList);
  };

  useEffect(() => {
    fetchList();
  }, []);

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
          putRoleTest({ id: currentRow.id, menuPerm: keys });
        }}
        current={currentRow}
      />

      <Table columns={columns} dataSource={list} rowKey="id" />
    </Card>
  );
};

export default RoleView;
