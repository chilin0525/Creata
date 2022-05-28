import React from "react";
import "./Login.scss"

export default class Login extends React.Component {
  
  loginWithGoogle = () => {
    window.open("http://localhost:8000/auth/google", "_self")
  }
  
  render(){
    return (
      <div>
        <button className="google-signin" onClick={this.loginWithGoogle}></button>
      </div>
    )
  }
}