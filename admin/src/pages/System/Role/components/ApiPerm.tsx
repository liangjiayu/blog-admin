import React, { useEffect, useState } from 'react';
import { Modal, Tree, message } from 'antd';

import { updateRole } from '@/services/role';

type ApiPermProps = {
  onCancel: () => void;
  onSuccess: () => void;
  visible: boolean;
  current: any;
};

const apiGroup = [
  { name: '用户管理', value: 'user' },
  { name: '角色管理', value: 'role' },
];

const apiData = [
  {
    name: '新增用户',
    value: 'user:add',
    apiGroup: 'user',
  },
  {
    name: '删除用户',
    value: 'user:del',
    apiGroup: 'user',
  },
  {
    name: '新增角色',
    value: 'role:add',
    apiGroup: 'role',
  },
  {
    name: '删除角色',
    value: 'role:del',
    apiGroup: 'role',
  },
];

const handleApiTree = () => {
  const tree: any[] = [];
  apiGroup.forEach((item) => {
    const row: any = {};

    const rowChildren: any[] = [];

    apiData.forEach((sub) => {
      if (sub.apiGroup === item.value) {
        rowChildren.push({
          title: sub.name,
          key: sub.value,
        });
      }
    });

    row.title = item.name;
    row.key = item.value;
    row.children = rowChildren;

    tree.push(row);
  });

  return tree;
};

const apiTree = handleApiTree();

const ApiPerm: React.FC<ApiPermProps> = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (keys) => {
    setCheckedKeys(keys);
  };

  const onSubmit = () => {
    // 过滤分组
    const apiPerm = checkedKeys.filter((item) => {
      const flag = apiGroup.some((sub) => {
        if (sub.value === item) {
          return true;
        }
        return false;
      });
      if (flag) {
        return false;
      }
      return true;
    });

    updateRole({ roleId: props.current.roleId, apiPerm: apiPerm.join() }).then(() => {
      message.success('提交成功');
      props.onSuccess();
    });
  };

  useEffect(() => {
    if (props.visible) {
      if (props.current && props.current.apiPerm) {
        const apiPerm = props.current.apiPerm.split(',');
        setCheckedKeys(apiPerm);
      } else {
        setCheckedKeys([]);
      }
    }
  }, [props.visible]);

  return (
    <>
      <Modal
        title="API管理"
        visible={props.visible}
        onOk={onSubmit}
        onCancel={props.onCancel}
        width={640}
        destroyOnClose
      >
        <div>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={apiTree}
            defaultExpandAll
          />
        </div>
      </Modal>
    </>
  );
};

export default ApiPerm;
