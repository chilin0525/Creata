import React from "react";
import "./Setting.scss"
import { Container } from "react-bootstrap";

export default class Setting extends React.Component{
  
  updateHandler = ()=>{
    console.log("Submit update")
  }

  imageHandler = (e)=>{
    console.log(e)
  }

  render(){
    return (
      <div>
        <div>
          <label>user name</label>
          <input placeholder={this.props.name}></input>
        </div>
        <div>
          <label>user mail</label>
          <input placeholder={this.props.mail}></input>
        </div>
        <div>
          <label>user image</label>
          <input type="file" onClick={this.imageHandler}></input>
        </div>
        <button onClick={this.updateHandler}>Submit</button>
      </div>
    )
  }
}
