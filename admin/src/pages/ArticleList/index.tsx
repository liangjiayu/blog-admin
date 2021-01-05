/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { request, history } from 'umi';
import { Table, Button, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const getListData = (data: any) => {
  return request('/api/article/list', { method: 'post', data });
};

const IndexView = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({ current: 1, pageSize: 10, total: 0 });

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '封面',
      dataIndex: 'cover',
    },
  ];

  const fetchList = (query: any) => {
    setLoading(true);
    getListData({ ...query }).then((res) => {
      setLoading(false);
      const { data } = res;
      setList(data.rows);
      setPages({
        current: data.current,
        pageSize: data.size,
        total: data.total,
      });
    });
  };

  const onChangeTable = (pagination: any) => {
    const query = {
      pageSize: pagination.pageSize,
      pageNum: pagination.current,
    };
    fetchList(query);
  };

  useEffect(() => {
    const query = {
      pageSize: pages.pageSize,
      pageNum: pages.current,
    };
    fetchList(query);
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <div className="site-toolbar">
          <Button
            type="primary"
            onClick={() => {
              history.push('/article/add');
            }}
          >
            新增文章
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={pages}
          loading={loading}
          onChange={onChangeTable}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default IndexView;
