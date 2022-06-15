import React from "react";
import User from "./User"
import MessageEmpty from "./MessageEmpty"
import Message from "./Message"
import "./MessagePanal.scss"
import sendIcon from "./send.png"
import axios from 'axios'

export default class MessagePanal extends React.Component {

  inputRef = React.createRef()

  state = {
    chatid: null,
  }

  sendMessageHandler = (e)=>{
    if(this.state.sendMessage){
      axios
        .post("http://localhost:8000/message/sendmessage", { 
            message: this.state.sendMessage ,
            sender_ID: this.props.userid,
            receiver_ID: this.state.chatid
          }
        )
        .then((res)=>{
          console.log("send done")
          this.props.updateMessageAfterSend(res.data)
        })
    }
  }

  inputMessageHandler = (e)=>{
    this.setState({sendMessage: e.target.value})
  }

  clickHandler = (userid) => {
    console.log(userid)
    this.setState({chatid: userid})
  }

  render(){
    console.log("message panel render")
    // console.log(this.props)
    console.log(this.props.messages)
    return (
      <div>
        <div className="horizontal-line" ></div>
        <div className="MessagePanal">
          <div  className="MessagePanel-user">

            {
              this.props.chatuser?
                this.props.chatuser.map((user) => {
                  // console.log(user)
                  return <User chatid={this.state.chatid} id={user.id} name={user.name} url={user.url} clickHandler={this.clickHandler}/>
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
                // display no message page until user click any user in left panel
                // when click any user => set this.state.chatid = userid
                this.state.chatid?
                  // attention! props.messages little index represent early message
                  // we want to display earlier message on top 
                  // so we need iter array from last or reverse array and then iter
                  this.props.messages.slice(0).reverse().map((message) => {
                    if(this.props.userid===message.sender_ID && this.state.chatid===message.receiver_ID){
                      return <Message role="sender" message={message.message}/>
                    }
                    else if(this.props.userid===message.receiver_ID && this.state.chatid===message.sender_ID){
                      return <Message role="receiver" message={message.message} url={this.props.userName2Img[message.sender_ID]}/>
                    }
                  })
                :
                  <MessageEmpty/> 
              }
            </div>
            <div className="user-input">
              <input onChange={this.inputMessageHandler} ref={this.inputRef}></input>
              <div className="send-icon">
                <img src={sendIcon} onClick={this.sendMessageHandler}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}