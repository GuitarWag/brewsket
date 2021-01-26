import { Layout } from 'antd';
import * as React from 'react';

const { Header, Footer, Sider, Content } = Layout;

export const Main: React.FC = () => (
  <Layout>
    <Header style={{ color: '#fff' }}>Header</Header>
    <Layout>
      <Content style={{ height: '100vh' }}>Content</Content>
      <Sider style={{ color: '#fff' }}>Sider</Sider>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);
