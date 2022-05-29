import React from "react";
import User from "./User"
import Message from "./Message"
import "./MessagePanal.scss"

export default class MessagePanal extends React.Component {
  render(){
    return (
      <div>
        <div className="horizontal-line" ></div>
        <div className="MessagePanal">
          <div  className="MessagePanel-user">
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
          </div>
          <div className="vertical-line"></div>
          <div className="MessagePanel-chatroom">
            <div className="messages">
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
            </div>
            <div className="user-input">
              <label>message</label>
              <input></input>
            </div>
          </div>
        </div>
      </div>
    )
  }
}