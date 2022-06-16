import React from "react";
import User from "./User"
import MessageEmpty from "./MessageEmpty"
import Message from "./Message"
import "./MessagePanal.scss"
import sendIcon from "./send.png"
import axios from 'axios'
const { io } = require("socket.io-client");

export default class MessagePanal extends React.Component {

  inputRef = React.createRef()
  scrollbarRef = React.createRef()

  state = {
    chatid: null,
    liveMessage: [],
    recentChatUser: []
  }

  sendMessageHandler = (e)=>{
    if(this.state.sendMessage){

      // 1. send to socket server 
      this.state.socket.emit("addUserid", this.props.userid)
      this.state.socket.emit("sendMessage", this.props.userid, this.state.chatid, this.state.sendMessage)

      // when user click to send message to other user
      // 2. send sender, receiver id and message to backend
      axios
        .post("http://localhost:8000/message/sendmessage", { 
            message: this.state.sendMessage ,
            sender_ID: this.props.userid,
            receiver_ID: this.state.chatid
          }
        )
        // 3. get response of update messages of about current user
        //    call parent handler with all message for update state
        .then((res)=>{
          console.log("send done")
          this.props.updateMessageAfterSend(res.data)
        })
      
        // 4. clear message queue from web socket
        //    when user sending new message we will query to DB ang get fresh data!
      this.setState({liveMessage: []})
      this.setState({recentChatUser: []})
    }
  }

  async componentDidMount(){
    // connect to socket server
    const socket = await io("http://localhost:8000", {
      withCredentials: true
    });

    // every time user received from other user
    // append to state.liveMessage
    // and clear state when send message cause get updated message from DB after sending
    socket.on("receiveMessage", (sendid, receiveid, message)=>{
      console.log("receive message")
      console.log(message)
      const tmpMessage = {
        "sender_ID": sendid,
        "receiver_ID": receiveid,
        "message": message,
      }
      this.setState({liveMessage: this.state.liveMessage.concat(tmpMessage)})
    })

    socket.on("recentChatUser", (id, name, url)=>{
      const user = {
        "id": id,
        "name": name,
        "url": url,
      }
      this.setState({recentChatUser: this.state.recentChatUser.concat(user)})
    })

    this.setState({socket: socket})
  }

  inputMessageHandler = (e)=>{
    this.setState({sendMessage: e.target.value})
  }

  // when click any chated user of left panel 
  // update state represent chatting with the user
  // init value: null => show empty message componet
  clickHandler = (userid) => {
    this.setState({chatid: userid})
    this.state.socket.emit("addUserid", this.props.userid)
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
    console.log(this.state.liveMessage);
    return (
      <div>
        <div className="horizontal-line" ></div>
        <div className="MessagePanal">
          <div  className="MessagePanel-user">

            {/* display recently chatting user on top */}
            {
              this.state.recentChatUser?
                this.state.recentChatUser.map((user) => {
                  // console.log(user)
                  return <User chatid={this.state.chatid} id={user.id} name={user.name} url={user.url} clickHandler={this.clickHandler}/>
                })
              :
                <div></div>
            }
            {/* If user already exist in state.recentChatUser, we don't display again *
                so we need to filter these user                                             */}
            {
              this.props.chatuser?
                this.props.chatuser.map((user) => {
                  const checkcallback = (recentChatUser) => recentChatUser.id===user.id
                  const checkExist = this.state.recentChatUser.some(checkcallback)
                  console.log(checkExist)
                  if(!checkExist){
                    return <User chatid={this.state.chatid} id={user.id} name={user.name} url={user.url} clickHandler={this.clickHandler}/>
                  }
                })
              :
                <div></div>
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
              {
                this.state.liveMessage?
                  this.state.liveMessage.map((message) => {
                    if(this.props.userid===message.sender_ID && this.state.chatid===message.receiver_ID){
                      return <Message role="sender" message={message.message}/>
                    }
                    else if(this.props.userid===message.receiver_ID && this.state.chatid===message.sender_ID){
                      return <Message role="receiver" message={message.message} url={this.props.userName2Img[message.sender_ID]}/>
                    }
                  })
               :
                  <div></div>
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