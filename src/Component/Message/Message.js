import React from "react";
import dayjs from "dayjs";

const Message = ({ message }) => {
  return (
    <div className="message">
      <img src={message.userImage} className="rounded-circle" alt="user" />
      <div className="message__info">
        <p>
          <span className="font-weight-bold">{message.username}</span>{" "}
          <span className="message__time">
            {dayjs(message.timestamp).format("h:m A")}
          </span>
        </p>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
