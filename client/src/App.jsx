import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header/Header"
// import Footer from "./components/Footer/Footer"

import Home from "./pages/Home/Home"
import Joblist from "./pages/Joblist/Joblist"
import Company from "./pages/Company/Company"
import CompanyAdd from "./pages/Company/CompanyAdd"
import Login from "./pages/Login/Login"
import Loginsuccess from "./pages/Login/Loginsuccess";
import Logoutsuccess from "./pages/Login/Logoutsuccess";
import Register from "./pages/Register/Register"
import Profile from "./pages/Profile/Profile"
import SettingSuccess from "./pages/Setting/SettingSuccess"
import Setting from "./pages/Setting/Setting"
import MessagePanal from "./pages/Message/MessagePanal";
import axios from 'axios'

import './App.scss';
import React from "react";
const { io } = require("socket.io-client");

export default class App extends React.Component {

  // check the user login or not
  // checkUserAuth = () =>{
  //   console.log("this is checkUserAuth")
  //   axios
  //     .get("http://localhost:8000/auth/user", 
  //       { withCredentials: true }
  //     )
  //     .then((res)=>{
  //       console.log(res.data)
  //       if(!res.data){
  //         // user not login!
  //         this.setState({isauth: false})
  //       }else{
  //         // user already login
  //         this.setState({isauth: true})
  //         this.setState({userid: res.data._id})
  //         this.setState({name: res.data.name})
  //         this.setState({img: res.data.url})
  //         this.setState({mail: res.data.email})
  //         this.setState({date: res.data.date})
  //       }
  //     })
  // }

  state = {
    isauth: false,
  }

  queryUserMessagebyID = (newMessages) => {
    let chatId = []
    for(let i=0;i<newMessages.length;i++){
      if(newMessages[i].sender_ID===this.state.userid){
        if(!chatId.includes(newMessages[i].receiver_ID)){
          chatId.push(newMessages[i].receiver_ID)
        }
      }else{
        if(!chatId.includes(newMessages[i].sender_ID)){
          chatId.push(newMessages[i].sender_ID)
        }
      }
    }
    return chatId
  }

  // when user click send button in chatroom
  // send all messages back to here
  // and udpate to state.message
  updateMessageAfterSend = async (newMessages)=>{
    console.log('updateMessageAfterSend')
    await this.setState({messages: newMessages})

    const chatId = await this.queryUserMessagebyID(newMessages)
    
    // using native way to create request 
    // (cause post method not support to send array)
    const payload = {
      user_ids: chatId
    };

    // query for user name, user image from user id list
    const chatUserInfo = await axios({
      url: "http://localhost:8000/message/userinfo",
      method: "post",
      data: payload
    })

    let userName2Img={}
    for(let i=0;i<chatUserInfo.data.length;i++){
      userName2Img[chatUserInfo.data[i].id]=chatUserInfo.data[i].url
    }
    
    this.setState({chatuserinfo: chatUserInfo.data})
    this.setState({userName2Img: userName2Img})
  }

  async componentDidMount(){
    console.log("Mount App componet")
    
    const socket = await io("http://localhost:8000", {
      withCredentials: true
    });

    const resUser = await axios
      .get("http://localhost:8000/auth/user", 
        { withCredentials: true }
      )
    console.log(resUser.data)

    // the result is sorted, early shold more little index
    const resMessage = await axios
      .post("http://localhost:8000/message", 
        { userid: resUser.data._id }
      )

    // little index of resMessage.data represent chatting recently
    // hence little index of chatId represent chatting recently
    let chatId = []
    for(let i=0;i<resMessage.data.length;i++){
      if(resMessage.data[i].sender_ID===resUser.data._id){
        if(!chatId.includes(resMessage.data[i].receiver_ID)){
          chatId.push(resMessage.data[i].receiver_ID)
        }
      }else{
        if(!chatId.includes(resMessage.data[i].sender_ID)){
          chatId.push(resMessage.data[i].sender_ID)
        }
      }
    }
    console.log(chatId)

    // using native way to create request 
    // (cause post method not support to send array)
    const payload = {
      user_ids: chatId
    };

    // query for user name, user image from user id list
    const chatUserInfo = await axios({
      url: "http://localhost:8000/message/userinfo",
      method: "post",
      data: payload
    })

    let userName2Img={}
    for(let i=0;i<chatUserInfo.data.length;i++){
      userName2Img[chatUserInfo.data[i].id]=chatUserInfo.data[i].url
    }
    // console.log(userName2Img)
    // console.log(chatUserInfo)

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
      this.setState({phone: resUser.data.phone})
      this.setState({experience: resUser.data.experience})
      this.setState({website: resUser.data.website})
      socket.emit("addUserid", resUser.data._id)
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
    // console.log(this.state.messages)
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
              <Route path="/companylist" element={<Company
                  companydata={this.state.companydata}
                  userid={this.state.userid}
                  updateMessageAfterSend={this.updateMessageAfterSend}
                />} 
              />
              <Route path="/companyadd" element={<CompanyAdd
                  userid={this.state.userid}
                  name={this.state.name} 
                  img={this.state.img}
                />} 
              />
              <Route path="/login" element={<Login/>} />
              <Route path="/loginsuccess" element={<Loginsuccess/>} />
              <Route path="/logoutsuccess" element={<Logoutsuccess/>} />
              <Route path="/settingsuccess" element={<SettingSuccess/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile/*" element={<Profile 
                  name={this.state.name} 
                  img={this.state.img}
                  mail={this.state.mail}
                  date={this.state.date}
                  phone={this.state.phone}
                  experience={this.state.experience}
                  website={this.state.website}
                />}>
              </Route>
              <Route path="/setting" element={<Setting
                  userid={this.state.userid}
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
                  updateMessageAfterSend={this.updateMessageAfterSend}
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
