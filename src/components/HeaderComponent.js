import React, {Component} from 'react';
import { Navbar, NavbarBrand,Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			isNavOpen: false
		};
		this.toggleNav = this.toggleNav.bind(this);
	}
	toggleNav(){
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}
	render(){
		return(
			<>
				<Navbar dark expand="md">
	        	<div className="container">
	        	<NavbarToggler onClick={this.toggleNav} />
	         	 <NavbarBrand className="mr-auto" href="/">
	         	 	<img src="assets/images/logo.png" height="30" width="41"
	         	 	 alt="Ristorante Con Fusion" />
	         	 </NavbarBrand>
	         	 <Collapse isOpen={this.state.isNavOpen} navbar>
	         	 <Nav navbar>
	         	 	<NavItem>
	         	 		<NavLink className="nav-link" to="/home"></NavLink>
	         	 		<span className="fa fa-home fa-lg"></span> Home
	         	 	</NavItem>
	         	 	<NavItem>
	         	 		<NavLink className="nav-link" to="/aboutus"></NavLink>
	         	 		<span className="fa fa-info fa-lg"></span> aboutus
	         	 	</NavItem>
	         	 	<NavItem>
	         	 		<NavLink className="nav-link" to="/menu"></NavLink>
	         	 		<span className="fa fa-list fa-lg"></span> menu
	         	 	</NavItem>
	         	 	<NavItem>
	         	 		<NavLink className="nav-link" to="/contactus"></NavLink>
	         	 		<span className="fa fa-address-card fa-lg"></span> contactus
	         	 	</NavItem>
	         	 </Nav>
	         	 </Collapse>
	        	</div>
	      		</Navbar>
	      		<Jumbotron>
	      			<div className="container">
	      				<div className="row row-header">
	      					<div className="col-12 col-sm-6">
	      						<h1>Ristorante Con Fusion</h1>
	      						<p>We take inspiration from the World best cuisines, 
	      						and create unique</p>
	      					</div>
	      				</div>
	      			</div>
	      		</Jumbotron>
			</>
			);
	}
}
export default Header;