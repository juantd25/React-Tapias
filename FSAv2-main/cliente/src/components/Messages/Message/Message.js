import React from "react";
// import M from "materialize-css";
import "./Message.css";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // let options = {
  //   inDuration: 250,
  //   onCloseEnd: null,
  //   onCloseStart: null,
  //   onOpenEnd: null,
  //   onOpenStart: null,
  //   outDuration: 200,
  // };

  // M.Materialbox.init(document.querySelectorAll(".materialboxed"), options);

  const getDate = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${hours}:${minutes}${ampm}`;

    let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    let tempDate = new Date();
    let strDate = `${formatTwoDigits(tempDate.getDate())}.${formatTwoDigits(
      tempDate.getMonth() + 1
    )}.${tempDate.getFullYear()} `;
    return strDate + strTime;
  };

  return isSentByCurrentUser ? (
    <div className="messageContainerRight justifyEnd">
      <div className="messageBox backgroundRed">
        <span className="messageText">{text}</span>
      </div>
      <i className="material-icons sentText pr-10">person</i>
    </div>
  ) : (
    <div className="messageContainerLeft justifyStart">
      <div>
        <p className="sentText pr-10">
          <i className="material-icons">adb</i>
        </p>
      </div>
      <div className="messageBox backgroundLight">
        <div className="input-field">
          <span className="messageText colorDark validate" id="hora">
            {text}
          </span>
          <label
            className="active"
            htmlFor="hora"
            style={{ fontSize: "0.8em" }}
          >
            {getDate()}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Message;
