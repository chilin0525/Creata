import React from "react";
import {
    Navbar, Nav, Container, NavDropdown
} from 'react-bootstrap'
import "./Header.scss"
import settingIcon from "./setting.png"

export default class Header extends React.Component {
	render(){
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" className="navbar-sticky">
				<Container>
					<Navbar.Brand href="/home" className="nav-font">CreaTa</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav>
							<Nav.Link href="/joblist" className="nav-font">職缺資料</Nav.Link>
							<Nav.Link href="/companylist" className="nav-font">新創公司專欄</Nav.Link>
							{this.props.isauth ?
								<Nav.Link href="/companyadd" className="nav-font">新增專欄</Nav.Link>
							:
								<div></div>
							}	
						</Nav>
						{this.props.isauth ?
						
							<Nav className="ml-auto">
								<NavDropdown href="/profile" className="nav-font" title={this.props.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile" className="Dropdown-item">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/setting" className="Dropdown-item">
                    Setting <img src={settingIcon} alt="" className="setting-icon"/>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/message" className="Dropdown-item">
                    Messages
                  </NavDropdown.Item>
                </NavDropdown>
								<Nav.Link href="http://localhost:8000/auth/logout" className="nav-font">Logout</Nav.Link>
							</Nav>
						:
							<Nav className="ml-auto">
								<Nav.Link href="/register" className="nav-font">Register</Nav.Link>
								<Nav.Link href="/login" className="nav-font">Login</Nav.Link>
							</Nav>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}
}