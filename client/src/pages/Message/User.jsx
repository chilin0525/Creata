import React from "react";
import {
   Card, ListGroup, ListGroupItem
} from "react-bootstrap"
import "./User.scss"

export default class User extends React.Component {
  render(){
    return (
      <div className="user-panel">       
        <div className="user-item">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" className="user-img"></img>
          <div className="user-info">
              user1
          </div>
        </div>
      </div>
    )
  }
}