import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOpenFilled,
  DatabaseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Switch, Route, Link } from "react-router-dom";
import pageRoutes from "../../../config/router"

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <SubMenu
            key="sub1"
            icon={<FolderOpenFilled />}
            title="Harga Perikanan"
          >
            {pageRoutes.map((data,i)=>{
                return (
                    <Menu.Item key={i}><Link to={data.link}>{data.name}</Link></Menu.Item>
                )
            })}
          </SubMenu>
          <Menu.Item key="2" icon={<DatabaseOutlined />}>
            List Penjualan
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Setting
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Harga Perikanan</Breadcrumb.Item>
            <Breadcrumb.Item>List Harga Perikanan</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Switch>
                {pageRoutes.map((data, i)=>{
                    return(
                        <Route key= {i} path={data.path} component={data.component} />
                    )
                })}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          eFishery ©2021 Created by Moch Reza J A
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
