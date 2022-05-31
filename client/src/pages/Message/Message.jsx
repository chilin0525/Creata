import React from "react";
import "./Message.scss"
export default class Chatroom extends React.Component {
  render(){
    return (
      // <div className="receiver-message">
      this.props.role=="sender" ?
        <div className="sender-message">
          <div className="message-item">
            <div className="message-img">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"></img>
            </div>
            <div className="message-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos in tenetur eos asperiores dolore similique, odio dolorum architecto veniam, laborum et. Harum aut dolore hic. Rem quidem atque cum accusantium?
            </div>
          </div>
        </div>
      :
        <div className="receiver-message">
          <div className="message-item">
            <div className="message-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos in tenetur eos asperiores dolore similique, odio dolorum architecto veniam, laborum et. Harum aut dolore hic. Rem quidem atque cum accusantium?
            </div>
          </div>
        </div>
    )
  }
}