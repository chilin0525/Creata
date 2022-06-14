import React from "react";
import User from "./User"
import MessageEmpty from "./MessageEmpty"
import Message from "./Message"
import "./MessagePanal.scss"
import sendIcon from "./send.png"
import axios from 'axios'
import { ContactsOutlined, ControlPointSharp, ThreeSixty } from "@material-ui/icons";

export default class MessagePanal extends React.Component {

  // componentDidUpdate(previousProps, previousState){
  //   // this.getMessage();
  //   console.log("Update")
  //   console.log(previousState)
  //   console.log(this.state)
  //   // prevent infinite loop
  //   if( previousState==null || (previousState.messages.length != this.state.messages.length)){
  //     this.getMessage()
  //   }
  // }

  // componentDidMount(){
  //   this.getMessage();
  // }

  state = {
    chatid: null
  }

  clickHandler = (userid) => {
    console.log("this is click")
    console.log(userid)
    this.setState({chatid: userid})
  }

  render(){
    console.log("message panel render")
    console.log(this.state.chatid)
    // console.log(this.state.messages)
    return (
      <div>
        <div className="horizontal-line" ></div>
        <div className="MessagePanal">
          <div  className="MessagePanel-user">

            {
              this.props.chatuser?
                this.props.chatuser.map((user) => {
                  console.log(user)
                  return <User id={user.id} name={user.name} url={user.url} clickHandler={this.clickHandler}/>
                })
              :
                <User/>
            }
          </div>
          <div className="vertical-line"></div>
          <div className="MessagePanel-chatroom">
            <div className="messages">
              {/* <Message role="sender"/> */}
              {/* <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/>
              <Message role="sender"/>
              <Message role="receiver"/> */}
              
              {
                this.state.chatid?
                  this.props.messages.map((message) => {
                    if(this.props.userid==message.sender_ID && this.state.chatid==message.receiver_ID){
                      return <Message role="sender" message={message.message}/>
                    }
                    else if(this.props.userid==message.receiver_ID && this.state.chatid==message.sender_ID){
                      return <Message role="receiver" message={message.message} url={this.props.userName2Img[message.sender_ID]}/>
                    }
                  })
                :
                  <MessageEmpty/> 
              }
            </div>
            <div className="user-input">
              {/* <label>message</label> */}
              <input></input>
              <div className="send-icon">
                <img src={sendIcon}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}