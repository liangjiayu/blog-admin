import React, { useState, useEffect } from 'react';
import { request, history } from 'umi';
import { Form, Input, Button, Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const IndexView = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const formData = {
    id: history.location.query?.id,
    type: history.location.query?.id ? 'edit' : 'add',
  };

  const layout = {
    labelCol: { span: 4 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4 },
  };

  const getFormInit = () => {
    const id = history.location.query?.id;
    if (!id) {
      return;
    }
    request('/api/article/detail', { method: 'POST', data: { id } }).then((res) => {
      form.setFieldsValue(res.data);
    });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    if (formData.type === 'add') {
      request('/api/article/create', { method: 'POST', data: values }).then(() => {
        message.success('提交成功');
        history.push('/article/list');
      });
    } else {
      request('/api/article/update', { method: 'POST', data: { ...values, id: formData.id } }).then(
        () => {
          message.success('提交成功');
          history.push('/article/list');
        },
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getFormInit();
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          {...layout}
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="文章标题" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="文章作者" name="author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="文章描述" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="文章关键字" name="keyword" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="文章内容" name="content" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="文章图片" name="cover" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default IndexView;
