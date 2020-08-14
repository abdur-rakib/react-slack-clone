import React from "react";
import { Layout, AutoComplete, Input, Tooltip, Popconfirm } from "antd";
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { useStateValue } from "../../redux/StateProvider";
import { auth } from "../../firebase/util";
import { actionTypes } from "../../redux/reducer";
const { Header } = Layout;

const Head = () => {
  const [{ user }, dispatch] = useStateValue();

  const confirm = () => {
    auth.signOut();
    dispatch({ type: actionTypes.DELETE_USER });
  };
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
            <Input size="small" placeholder="Search LaggerUnited" />
          </AutoComplete>
        </div>
        <div className="header__rightIcon mx-2">
          <Tooltip placement="bottom" title="Help">
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
      </div>
      <Popconfirm
        placement="bottomRight"
        title="Logout?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Avatar shape="square" src={user.photoURL} className="mb-1 mt-2" />
      </Popconfirm>
    </Header>
  );
};

export default Head;
