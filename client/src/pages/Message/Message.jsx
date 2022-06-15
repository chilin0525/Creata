import React from "react";
import "./Message.scss"

export default class Chatroom extends React.Component {
  render(){
    return (
      // <div className="receiver-message">
      this.props.role==="receiver" ?
        <div className="sender-message">
          <div className="message-item">
            <div className="message-img">
              <img 
                alt="user"
                referrerPolicy="no-referrer"
                src={this.props.url?this.props.url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}>
              </img>
            </div>
            <div className="message-text">
              {/* Lorem ip */}
              {this.props.message}
            </div>
          </div>
        </div>
      :
        <div className="receiver-message">
          <div className="message-item">
            <div className="message-text">
              {this.props.message}
            </div>
          </div>
        </div>
    )
  }
}