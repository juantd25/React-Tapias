import React, { useState, useEffect, Fragment } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import M from "materialize-css";
// import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const ENDPOINT = "https://maihospitalv2.mybluemix.net/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    console.log(users);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    // eslint-disable-next-line
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  let options = {
    draggable: true,
    edge: "left",
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200,
    preventScrolling: true,
    position: "top",
    direction: "top",
    hoverEnabled: true,
    toolbarEnabled: true,
    transitionMovement: "30px",
  };

  M.Sidenav.init(document.querySelectorAll(".sidenav"), options);

  M.FloatingActionButton.init(
    document.querySelectorAll(".fixed-action-btn"),
    options
  );

  M.Tooltip.init(document.querySelectorAll(".tooltipped"), options);

  return (
    <Fragment>
      <InfoBar room={room} />
      <div className="container" style={{ height: "90%", width: "90%" }}>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* <footer>
        <a href="https://flagsoluciones.com/" onClick={(e) => sendMessage(e)}>
          ®Flag Soluciones SAS
        </a>
      </footer> */}
    </Fragment>
  );
};

export default Chat;
