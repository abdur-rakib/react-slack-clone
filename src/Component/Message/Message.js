import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <img src={message.userImage} className="rounded-circle" alt="user" />
      <div className="message__info">
        <p>
          <span className="font-weight-bold">{message.username}</span>{" "}
          <span className="message__time">
            {new Date(message.timestamp.toDate()).toLocaleTimeString()}
          </span>
        </p>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
