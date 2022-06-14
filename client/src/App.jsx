import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import Home from "./pages/Home/Home"
import Joblist from "./pages/Joblist/Joblist"
import Login from "./pages/Login/Login"
import Loginsuccess from "./pages/Login/Loginsuccess";
import Logoutsuccess from "./pages/Login/Logoutsuccess";
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import Setting from "./pages/Setting/Setting"
import MessagePanal from "./pages/Message/MessagePanal";
import axios from 'axios'

import './App.scss';
import React from "react";

export default class App extends React.Component {

  // check the user login or not
  checkUserAuth = () =>{
    console.log("this is checkUserAuth")
    axios
      .get("http://localhost:8000/auth/user", 
        { withCredentials: true }
      )
      .then((res)=>{
        console.log(res.data)
        if(!res.data){
          // user not login!
          this.setState({isauth: false})
        }else{
          // user already login
          console.log(res.data)
          this.setState({isauth: true})
          this.setState({userid: res.data._id})
          this.setState({name: res.data.name})
          this.setState({img: res.data.url})
          this.setState({mail: res.data.email})
          this.setState({date: res.data.date})
        }
      })
  }

  getMessage = ()=>{
    console.log("this is getMessage")
    console.log(this.state)
    if(this.state.isauth){
      axios
        .post("http://localhost:8000/message", 
          { userid: this.state._id }
        )
        .then((res)=>{
          console.log(res.data)
          this.setState({messages: res.data})
        })
    }
  }
  
  state = {
    isauth: false
  }

  async componentDidMount(){
    console.log("Mount App componet")
    const resUser = await axios
      .get("http://localhost:8000/auth/user", 
        { withCredentials: true }
      )
    console.log("here")
    console.log(resUser.data)

    // the result is sorted, early shold more little index
    const resMessage = await axios
      .post("http://localhost:8000/message", 
        { userid: resUser.data._id }
      )
    
    console.log("messages ===")
    console.log(resMessage.data)

    // little index represent chatting more early
    let chatId = []
    for(let i=resMessage.data.length-1;i>=0;i--){
      if(resMessage.data[i].sender_ID==resUser.data._id){
        if(!chatId.includes(resMessage.data[i].receiver_ID)){
          chatId.push(resMessage.data[i].receiver_ID)
        }
      }else{
        if(!chatId.includes(resMessage.data[i].sender_ID)){
          chatId.push(resMessage.data[i].sender_ID)
        }
      }
    }
    console.log("Chat ID")
    console.log(chatId)

    // using native way to create request 
    // (cause post method not support to send array)

    const payload = {
      user_ids: chatId
    };

    const chatUserInfo = await axios({
      url: "http://localhost:8000/message/userinfo",
      method: "post",
      data: payload
    })

    let userName2Img={}
    for(let i=0;i<chatUserInfo.data.length;i++){
      userName2Img[chatUserInfo.data[i].id]=chatUserInfo.data[i].url
    }
    console.log(userName2Img)

    console.log(chatUserInfo)

    // const resChatIdInfo = await axios
    //   .post("http://localhost:8000/message/userinfo", 
    //     // { chatidList: chatId }
    //   )
    // console.log("response chat id info")
    // console.log(resChatIdInfo)
    
    if(!resUser.data){
      // user not login!
      this.setState({isauth: false})
    }else{
      // user already login
      this.setState({isauth: true})
      this.setState({userid: resUser.data._id})
      this.setState({name: resUser.data.name})
      this.setState({img: resUser.data.url})
      this.setState({mail: resUser.data.email})
      this.setState({date: resUser.data.date})
    }
    
    if(resMessage.data){
      this.setState({messages: resMessage.data})
    }else{
      console.log("Empty Message")
    }

    if(chatUserInfo.data){
      this.setState({chatuserinfo: chatUserInfo.data})
      this.setState({userName2Img: userName2Img})
    }else{
      console.log("Empty Message")
    }
  }

  render(){
    console.log("App render")
    console.log(this.state)
    return (
      <div className="App">
        <div className="header">
          <Header isauth={this.state.isauth} name={this.state.name} img={this.state.img} />
        </div>
        <main className="main">
          <div className="main-content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/joblist" element={<Joblist/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/loginsuccess" element={<Loginsuccess/>} />
              <Route path="/logoutsuccess" element={<Logoutsuccess/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile 
                  name={this.state.name} 
                  img={this.state.img}
                  mail={this.state.mail}
                  date={this.state.date}
                />} 
              />
              <Route path="/setting" element={<Setting
                  name={this.state.name} 
                  img={this.state.img}
                  mail={this.state.mail}
                  date={this.state.date}
                />} 
              />
              <Route path="/message" element={<MessagePanal
                  userid={this.state.userid}
                  name={this.state.name} 
                  img={this.state.img}
                  mail={this.state.mail}
                  date={this.state.date}
                  messages={this.state.messages}
                  chatuser={this.state.chatuserinfo}
                  userName2Img={this.state.userName2Img}
                />} 
              />
            </Routes>
          </BrowserRouter>
          </div>
        </main>
        {/* <div>
          <Footer className="footer"/>
        </div> */}
      </div>
    );
  }
}
