import React from "react";
import "./Login.scss"
import {Alert} from "react-bootstrap"

const emotionText = "(ಥ_ಥ)"

export default class Logoutsuccess extends React.Component {
  render(){
    return (
      <Alert variant="success">
        <Alert.Heading>Logout successfully!🎉️ </Alert.Heading>
        <p>
          Goodbye! {emotionText}
        </p>
      </Alert>
    )
  }
}