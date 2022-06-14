import React from "react";
import {
   Card, ListGroup, ListGroupItem
} from "react-bootstrap"
import "./User.scss"

export default class User extends React.Component {  
  
  // curry function to handle click on user 
  clickChildHandler = (e) => {
    console.log(this.props.id)
    this.props.clickHandler(this.props.id)
  }

  // Attention to using image fromg Google oauth image
  // we should remove referrer in our request header: referrerPolicy="no-referrer"
  render(){
    return (
      <div className="user-panel">       
        <div className="user-item" onClick={this.clickChildHandler}>
          <img 
            referrerPolicy="no-referrer"
            src={this.props.url?this.props.url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} 
            className="user-img">
          </img>
          <div className="user-info">
              {this.props.name?this.props.name:"user"}
          </div>
        </div>
      </div>
    )
  }
}