import React from "react";
import "./Footer.scss"
import Card from "react-bootstrap"

export default class Footer extends React.Component {
  render(){
    return (
      <div className="footer">
        <div className="footer-item">Copyright ©2022 CreaTa. All Rights Reserverd</div>
      </div>
    )
  }
}