import React from "react";
import "./Login.scss"
import {Alert} from "react-bootstrap"

const emotionText = "⎛⎝>⏝⏝<⎛⎝"

export default class Loginsuccess extends React.Component {
  render(){
    return (
      <Alert variant="success">
        <Alert.Heading>Login successfully!🎉️ </Alert.Heading>
        <p>
          Happy hacking {emotionText}
        </p>
      </Alert>
    )
  }
}