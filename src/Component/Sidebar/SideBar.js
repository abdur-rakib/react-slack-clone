import React from "react";
import { Layout, Menu, Button, message } from "antd";

import {
  PaperClipOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CrownOutlined,
  MoreOutlined,
  SaveOutlined,
  SelectOutlined,
  StarFilled,
  PushpinOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/util";
import { Link } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";
import { Form, Input } from "antd";
import { useStateValue } from "../../redux/StateProvider";

const { Sider } = Layout;
const SideBar = () => {
  const [{ user }] = useStateValue();
  const [channels, setChannels] = useState([]);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [state] = useStateValue();
  const { displayName } = state.user;

  const handleOk = () => {
    if (name.trim().length === 0) {
      message.error("Please enter name");
    } else {
      setLoading(true);

      db.collection("rooms")
        .add({
          name,
          description,
          timestamp: new Date().toISOString(),
          creadtedBy: displayName,
        })
        .then(() => {
          setLoading(false);
          setVisible(false);
          setName("");
          setDescription("");
          message.success(`${name} added successfully`);
        });
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      {/* Modal */}
      <Modal
        title="Add Channel"
        visible={visible}
        onOk={handleOk}
        loading={loading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            disabled={loading}
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {loading ? "Adding" : "Add"}
          </Button>,
        ]}
      >
        <div>
          <Form.Item>
            <Input
              placeholder="Enter channel name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder="Enter channel description (not required)"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Item>
        </div>
      </Modal>

      {/* End of Modal */}
      <div className="d-flex align-items-center  sider__header">
        <StarFilled style={{ color: "green" }} className="mr-1" />
        <div className="sider__name mr-3">{user.displayName}</div>
        <SelectOutlined />
      </div>
      <div style={{ borderBottom: "1px solid gray" }}></div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<CrownOutlined />}>
          Mentions & reactions
        </Menu.Item>
        <Menu.Item key="2" icon={<SaveOutlined />}>
          Saved items
        </Menu.Item>
        <Menu.Item key="3" icon={<MoreOutlined />}>
          More
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          People & User groups
        </Menu.Item>
        <Menu.Item key="5" icon={<AppstoreOutlined />}>
          Apps
        </Menu.Item>
        <Menu.Item
          key="8"
          onClick={() => setVisible(true)}
          icon={<PlusOutlined />}
        >
          Add Channel
        </Menu.Item>

        <div style={{ borderBottom: "1px solid gray" }}></div>
        {/* <Menu.Item key="7" icon={<PushpinOutlined />}>
          Channels
        </Menu.Item> */}

        <SubMenu key="7" icon={<PushpinOutlined />} title="Channels">
          {channels.length !== 0 &&
            channels.map((channel) => (
              <Menu.Item key={channel.id}>
                <Link to={`/room/${channel.id}`}>#{channel.name} </Link>
              </Menu.Item>
            ))}
        </SubMenu>
        <div style={{ borderBottom: "1px solid gray" }}></div>
        <Menu.Item key="6" icon={<PaperClipOutlined />}>
          File Browser
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
