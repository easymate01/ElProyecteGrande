import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub/negotiate") // URL to your hub
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connection established.");
        // Additional initialization
      })
      .catch((err) => console.error(err));

    newConnection.on("ReceiveMessage", (user, message) => {
      setMessages([...messages, { user, message }]);
    });

    return () => {
      newConnection.stop();
    };
  }, [messages]);

  const sendMessage = (user, message) => {
    connection
      .invoke("SendMessage", user, message)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* Render messages from the 'messages' state */}
      {/* Form to send messages with 'sendMessage' */}
    </div>
  );
};

export default Chat;
