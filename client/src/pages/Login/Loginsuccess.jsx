import React from "react";
import "./Loginsuccess.scss"
import {Alert} from "react-bootstrap"

const emotionText = "⎛⎝>⏝⏝<⎛⎝"

export default class Loginsuccess extends React.Component {
  render(){
    return (
      <Alert variant="success" className="welcome-container">
        <div>
          <Alert.Heading>Login successfully!🎉️ </Alert.Heading>
          <p>
            Happy hacking {emotionText}
          </p>
        </div>
      </Alert>
    )
  }
}