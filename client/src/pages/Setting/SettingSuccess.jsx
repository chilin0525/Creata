import React from "react";
import "./SettingSuccess.scss"
import {Alert} from "react-bootstrap"

const emotionText = "⎛⎝>⏝⏝<⎛⎝"

export default class SettingSuccess extends React.Component {
  render(){
    return (
      <Alert variant="success" className="welcome-container">
        <div>
          <Alert.Heading>Update profile successfully!🎉️ </Alert.Heading>
          <p>
            Happy hacking {emotionText}
          </p>
        </div>
      </Alert>
    )
  }
}