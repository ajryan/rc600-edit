import React from "react";

import {
  AudioOutlined,
  ControlOutlined,
  CustomerServiceOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  RedoOutlined,
  RightCircleFilled,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    key: "menu",
    label: "Menu",
    icon: <DesktopOutlined />,

    children: [
      {
        key: "input",
        label: "Input",
        icon: <AudioOutlined />,
      },
      {
        key: "output",
        label: "Output",
        icon: <CustomerServiceOutlined />,
      },
      {
        key: "mixer",
        label: "Mixer",
        icon: <ControlOutlined />,
      },
    ],
  },
  {
    key: "loop",
    label: "Loop",
    icon: <DatabaseOutlined />,
    children: [
      {
        key: "track",
        label: "Track",
        icon: <RedoOutlined />,
      },
      {
        key: "rec",
        label: "Rec",
        icon: <RightCircleFilled />,
      },
      {
        key: "play",
        label: "Play",
        icon: <RightCircleOutlined />,
      },
    ],
  },
];
const MainMenu: React.FC = () => (
  <Menu
    items={menuItems}
    theme="dark"
    defaultOpenKeys={["menu"]}
    defaultSelectedKeys={["input"]}
    mode="inline"
  />
);

export default MainMenu;
