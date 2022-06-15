import React from "react";
import "./MessageEmpty.scss"

export default class MessageEmpty extends React.Component {  

  render(){
    console.log("here is empty")
    return (
      <div className="emptyImg-container">       
          <img alt="empty" src="https://i.pinimg.com/originals/54/85/6a/54856ab427f28a0b40b1a305792a3b00.png"></img>
      </div>
    )
  }
}