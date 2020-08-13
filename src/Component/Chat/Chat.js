import React from "react";
import { useParams } from "react-router-dom";
import { StarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const Chat = () => {
  const { roomId } = useParams();
  return (
    <div>
      <div className="chat__header">
        <div className="chat__headerLeft  d-flex align-items-center">
          <span className="font-weight-bold mr-1">#{roomId}</span>
          <Tooltip placement="bottom" title="Star conversation">
            <StarOutlined />
          </Tooltip>
        </div>
        <div className="chat__headerRight">
          <Tooltip placement="bottom" title="Details">
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGray", marginLeft: "-5px" }}
      ></div>
    </div>
  );
};

export default Chat;
