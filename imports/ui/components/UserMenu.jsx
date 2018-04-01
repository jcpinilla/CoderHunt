import React, { Component } from 'react';
import { Link } from 'react-router';
import "../css/UserMenu.css";
import { Container, Row, Col, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import {Meteor} from "meteor/meteor";

class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
	}

	toggle() {
		this.setState({
			open: !this.state.open,
		})
	}

	componentDidMount() {
		console.log(this.props);
	}

	goCreate() {
		this.props.history.push("/project/new");
	}

	renderName() {
		if(this.props.user && this.props.user.services) {
			return this.props.user.services.github.username;
		}

		return "";
	}

	render() {
		return(
			<div className="user-menu vertical" onClick={this.toggle.bind(this)}>
				<a className="bti-secondary unselectable">{this.renderName()}</a>
				{ this.state.open ?
						<div className="starting_option">
							<a className="bti-secondary" onClick={() => {this.props.history.push("/")}}>Home</a>
							<a className="bti-secondary" onClick={this.goCreate.bind(this)}>Create Project</a>
							<a className="bti-secondary">Logout</a>
						</div>
						: null }
					</div>
		); 
	}
}

export default withRouter(UserMenu);
