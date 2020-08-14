import React, { useState } from "react";
import { db } from "../../firebase/util";
import { useStateValue } from "../../redux/StateProvider";

const ChatInput = ({ channelName, channelId }) => {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId && input.trim().length !== 0) {
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          timestamp: new Date().toISOString(),
          username: user.displayName,
          userImage: user.photoURL,
        })
        .then(() => {
          setInput("");
        });
    }
  };
  return (
    <div className="chatInput">
      <form action="" onSubmit={sendMessage}>
        <input
          className="form-control"
          type="text"
          placeholder={`Message ${channelName}`}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>
    </div>
  );
};

export default ChatInput;
