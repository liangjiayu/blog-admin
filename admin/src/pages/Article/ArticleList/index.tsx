/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Table, Button, Card, Space, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getArticleList, delArticle } from '@/services/article';

import SearchMore from './components/SearchMore';

let listParams = {
  pageSize: 10,
  pageNum: 1,
  keyword: undefined,
};

const IndexView = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchList = () => {
    // console.log(listParams);
    setLoading(true);
    getArticleList({ ...listParams }).then((res) => {
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

  const onSearch = (values) => {
    listParams = {
      pageSize: listParams.pageSize,
      pageNum: 1,
      ...values,
    };
    fetchList();
  };

  const onChangeTable = (pagination: any) => {
    listParams.pageSize = pagination.pageSize;
    listParams.pageNum = pagination.current;
    fetchList();
  };

  const onDelete = (id) => {
    setLoading(true);
    delArticle({ id }).then(() => {
      fetchList();
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
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
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              history.push({ pathname: '/article/add', query: { id: record.id } });
            }}
          >
            详情
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              onDelete(record.id);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <SearchMore onSearch={onSearch} formData={listParams}></SearchMore>
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
