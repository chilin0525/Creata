import React from "react";
import {
    Navbar, Nav, Container
} from 'react-bootstrap'
import "./Header.scss"

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
							<Nav.Link href="#deets" className="nav-font">新創公司專欄</Nav.Link>
						</Nav>
						{this.props.isauth ?
							<Nav className="ml-auto">
								<Nav.Link href="/profile" className="nav-font">Profile</Nav.Link>
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