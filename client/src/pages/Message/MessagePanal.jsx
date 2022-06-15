import React from "react";
import User from "./User"
import MessageEmpty from "./MessageEmpty"
import Message from "./Message"
import "./MessagePanal.scss"
import sendIcon from "./send.png"
import axios from 'axios'

export default class MessagePanal extends React.Component {

  inputRef = React.createRef()
  scrollbarRef = React.createRef()

  state = {
    chatid: null,
  }

  sendMessageHandler = (e)=>{
    if(this.state.sendMessage){
      // when user click to send message to other user
      // 1. send sender, receiver id and message to backend
      axios
        .post("http://localhost:8000/message/sendmessage", { 
            message: this.state.sendMessage ,
            sender_ID: this.props.userid,
            receiver_ID: this.state.chatid
          }
        )
      // 2. get response of update messages of about current user
      //    call parent handler with all message for update state
        .then((res)=>{
          console.log("send done")
          this.props.updateMessageAfterSend(res.data)
        })
    }
  }

  inputMessageHandler = (e)=>{
    this.setState({sendMessage: e.target.value})
  }

  // when click any chated user of left panel 
  // update state represent chatting with the user
  // init value: null => show empty message componet
  clickHandler = (userid) => {
    this.setState({chatid: userid})
  }

  // 1. We need to update scrollbar after sending message
  //    if we not do this, scollbar will stop at last message
  //    hence we cannot see newer message after sending
  // 2. user-friendly
  //    We need to fix scrollbar at bottom cause the bottom side represent newer message
  //    so the user see newer message when he click the user
  componentDidUpdate(){
    this.scrollbarRef.current.scrollTop = this.scrollbarRef.current.scrollHeight - this.scrollbarRef.current.clientHeight;
  }

  render(){
    console.log("message panel render")
    // console.log(this.props)
    // console.log(this.props.messages)
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
            <div className="messages" ref={this.scrollbarRef}>
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