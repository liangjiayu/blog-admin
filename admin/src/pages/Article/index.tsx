import React, { useState, useEffect,useCallback } from 'react';
import { request } from 'umi';
import { Table } from 'antd';

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

  const fetchList = () => {
    setLoading(true);
    getListData({ pageSize: pages.pageSize, pageNum: pages.current }).then((res) => {
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

  const fetchBusinesses = useCallback(() => {
    setLoading(true);
    getListData({ pageSize: pages.pageSize, pageNum: pages.current }).then((res) => {
      setLoading(false);
      const { data } = res;
      setList(data.rows);
      setPages({
        current: data.current,
        pageSize: data.size,
        total: data.total,
      });
    });
  }, [])

  useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])

  // fetchList();

  // setLoading()

  // useEffect(fetchList, []);

  return (
    <div>
      <Table columns={columns} dataSource={list} rowKey="id" pagination={pages} loading={loading} />
    </div>
  );
};

export default IndexView;
