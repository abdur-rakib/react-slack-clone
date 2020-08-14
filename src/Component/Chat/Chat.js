import React from "react";
import { useParams } from "react-router-dom";
import { StarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip, Skeleton } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase/util";
import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomDetails(snapshot.data());
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setRoomMessages(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          )
        );
    }
  }, [roomId]);
  const renderChat = roomDetails ? (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft  d-flex align-items-center">
          <span className="font-weight-bold mr-1">#{roomDetails.name}</span>
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
      {roomMessages && roomMessages.length === 0 ? (
        <p className="noMessage">No messages</p>
      ) : (
        roomMessages &&
        roomMessages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  ) : (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
  return renderChat;
};

export default Chat;
