import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./Profile.scss"
import chatIcon from "./chat.png"
import ProfileCV from "./ProfileCV"
import ProfileExperience from "./ProfileExperience"

export default class Profile extends React.Component {
  
  render(){
    console.log("this is profile")
    console.log(this.props)
    return (
      <div className="all">  
        <div className="hr-split"></div>
        <div className="profile-container">
          <div className="profile-child-container">
            <img src={this.props.img} alt="user" className="user-img"></img>
            <div>
              <h1 className="username">
                {this.props.name} 
                <img src={chatIcon} className="chat-icon"/>
              </h1>
              
            </div>
          </div>
        </div>
        <hr className="split-info"></hr>
        <div className="navbar-container">
          <div className="navbar-child-container">
            <Navbar style={{padding:"0"}} bg="dark" variant="dark">
              <Container  >
                <Nav className="me-auto">
                  <Nav.Link className="nabar-item"><Link to="/profile" className="item-text">Basic info</Link></Nav.Link>
                  <Nav.Link className="nabar-item"><Link to="experience" className="item-text">Experience</Link></Nav.Link>
                  <Nav.Link className="nabar-item"><Link to="cv" className="item-text">CV</Link></Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </div>
        </div>

        <div className="info-container">
          <div className="info-child-container">
            <div className="basic-info">
              <p className="info-title">個人基本資訊</p>
              <div className="user-info-container">
                <div className="info-metadata info-parent">
                  <div className="info-child">Username</div>
                  <div className="info-child">Mail</div>
                  <div className="info-child">Phone number</div>
                  <div className="info-child">Website</div>
                </div>
                <div className="info-splitoperator info-parent">
                  <div className="info-child">:</div>
                  <div className="info-child">:</div>
                  <div className="info-child">:</div>
                  <div className="info-child">:</div>
                </div>
                <div className="info-value info-parent">
                  {
                    this.props.name?
                      <div className="info-child">{this.props.name}</div>
                    :
                      <div className="info-child">null</div>
                  }
                  {
                    this.props.mail?
                      <div className="info-child">{this.props.mail}</div>
                    :
                      <div className="info-child">null</div>
                  }
                  {
                    this.props.phone?
                      <div className="info-child">{this.props.phone}</div>
                    :
                      <div className="info-child">null</div>
                  }
                  {
                    this.props.website&&this.props.website.length>=1&&this.props.website[0]!=''
                    ?
                      this.props.website.map((item)=>{
                        return <div className="info-child">{item}</div>
                      })
                    :
                      <div className="info-child">null</div>                    
                  }
                </div>
              </div>
            </div>
            <div className="component-info">
              <Routes>
                <Route path="cv" element={<ProfileCV
                  experience={this.props.experience}
                />}></Route>
                <Route path="experience" element={<ProfileExperience
                  experience={this.props.experience}
                />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    )
  }
}