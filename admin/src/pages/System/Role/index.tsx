import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button } from 'antd';
import RoleModal from './components/RoleModal';
import { getStore } from '@/utils/session';

const getRoleListTest = () => {
  return getStore('roleList') || [];
};

const RoleView = () => {
  // RoleModal
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState();

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
        values={currentRow || {}}
      />

      <Table columns={columns} dataSource={list} rowKey="id" />
    </Card>
  );
};

export default RoleView;
