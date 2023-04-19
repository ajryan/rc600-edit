import electron from "electron";
import React, { useState } from "react";
import Head from "next/head";
import { Breadcrumb, Button, Form, InputNumber, Layout, theme } from "antd";

import MainMenu from "../components/main-menu";

const { ipcRenderer } = electron;

const { Content, Header, Sider } = Layout;

const Home: React.FC = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  // TODO: react context
  const [memoryNumber, setMemoryNumber] = useState(1);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
        >
          <MainMenu />
        </Sider>

        <Layout className="content-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Form layout="inline" style={{ margin: 16 }}>
              <Form.Item>
                <Button
                  onClick={async () => {
                    const selectedFolder = await ipcRenderer.invoke(
                      "api",
                      "load-data-folder"
                    );
                    console.log({ selectedFolder });
                  }}
                >
                  Choose data folder
                </Button>
              </Form.Item>
              <Form.Item label="Memory">
                <InputNumber
                  min={1}
                  max={99}
                  value={memoryNumber}
                  onChange={setMemoryNumber}
                />
              </Form.Item>
            </Form>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb
              style={{ margin: "16px 0" }}
              items={[{ key: "loop", title: "Loop" }]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              Router outlet
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
