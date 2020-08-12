import React from "react";
import { Layout, AutoComplete, Input, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
const { Header } = Layout;

const Head = () => {
  return (
    <Header className="">
      <div className="header">
        <div className="header__leftIcon mx-2">
          <Tooltip placement="bottom" title="History">
            <ClockCircleOutlined />
          </Tooltip>
        </div>
        <div className="header__search mx-2">
          {/* <SearchOutlined /> */}
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
              width: 300,
              marginTop: "10px",
            }}
          >
            <Input size="small" placeholder="Search LaggerUnited" enterButton />
          </AutoComplete>
        </div>
        <div className="header__rightIcon mx-2">
          <Tooltip placement="bottom" title="Help">
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
      </div>
      <Avatar
        shape="square"
        dot
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        className="mt-2"
      />
    </Header>
  );
};

export default Head;
