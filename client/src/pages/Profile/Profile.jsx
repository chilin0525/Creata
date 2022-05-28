import React from "react";

export default class Profile extends React.Component {
  
  render(){
    console.log(this.props)
    return (  
      <div>
          <h1>Welcome {this.props.name}!</h1>
          <h2>Your email {this.props.mail}</h2>
          <img src={this.props.img}></img>
      </div>
    )
  }
}