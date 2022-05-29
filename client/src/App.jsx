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
import axios from 'axios'

import './App.css';
import React from "react";

export default class App extends React.Component {

  // check the user login or not
  checkUserAuth = () =>{
    let isUserAuth = true
    axios
      .get("http://localhost:8000/auth/user", 
        { withCredentials: true }
      )
      .then((res)=>{
        console.log(res.data)
        if(!res.data){
          // user not login!
          isUserAuth = false
          this.setState({isauth: false})
        }else{
          // user already login
          this.setState({isauth: true})
          this.setState({name: res.data.name})
          this.setState({img: res.data.url})
          this.setState({mail: res.data.email})
          this.setState({date: res.data.date})
        }
      })
    console.log(isUserAuth)
  }
  
  state = {
    isauth: false
  }

  componentDidMount(){
    console.log("here")
    this.checkUserAuth()
  }

  render(){
    console.log("App render")
    console.log(this.state)
    return (
      <div className="App">
        <Header isauth={this.state.isauth} name={this.state.name} img={this.state.img} />
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
          </Routes>
        </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}
