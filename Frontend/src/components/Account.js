import React, { Component } from 'react'
import auth from "../services/authService";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'

import { ToastContainer, toast } from  'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom";


class Account extends Component {
	state = {
		email: "",
		oldPassword: "",
		reNewPassword: "",
		newPassword: "",

		changePW: false
	}

	handleChange = event => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	//validate

	validatePassword = () => {
		if (this.state.newPassword === this.state.reNewPassword) 
			return true;
	}

	handleSubmit = async ( event ) => {
		event.preventDefault();

		if (!this.validatePassword()) {
			toast.error('The two passwords do not match')
		}
		// else {
		// 	const data = {...this.state};
		// 	delete data.y;
		// 	delete data.m;
		// 	delete data.d;
			
		// 	const {error} = this.validateAccount(data)
		// 	if (error) {
		// 		toast.error(error.details[0].message) 
		// 	}
		// 	else {	
		// 		try {
		// 			await save(data);
		// 			toast.dark("Added successfully")
		// 		}	
		// 		catch(error) {
		// 			toast.error(error);
		// 		}
		// 	}
		//  }		
	}

	changePW = e => {
		this.setState({changePW: !this.state.changePW})
	}

	logout = () => {
		auth.logout();
    	window.location = "/"
	}

	render() {
		return (
			<div>
				<ToastContainer hideProgressBar position="bottom-right"  />
				
				<br />
				<Row>
				<Col>
				<p><b>{this.props.user.name}</b></p>
				</Col>

				<Col>
				<Button 
						variant="outline-danger"
						style={{float: 'right'}} 
						size="sm"
						onClick={this.logout}
					>
						Logout
				</Button>

				<Link to="/forget">
				<Button 
						variant="outline-dark"
						style={{float: "right", marginRight: 5}} 
						size="sm"
						onClick={this.changePW}
					>
						Change Password
				</Button>
				</Link>
				</Col>
				</Row>
				<br />
				<br />

				<Row>
					<Col>
						<Alert variant="light">
							
						</Alert>
					</Col>
					<Col></Col>
				</Row>

				{ this.state.changePW ? 
				<Form onSubmit={this.handleSubmit}>
					<hr />
					<Col xs={4}>
					<h4>Change Password</h4>
					</Col>
					<br />

					<Col xs={4}>
				    	<Form.Label>Old Password</Form.Label>
			    		<Form.Control 
			    			type="password"
			    			name="oldPassword" 
				    		value={this.state.oldPassword} 
				    		onChange={this.handleChange} 
			    		/>
					</Col>				

					<Col xs={4}>
				    	<Form.Label>New Password</Form.Label>
			    		<Form.Control 
			    			type="password"
			    			name="newPassword" 
				    		value={this.state.newPassword} 
				    		onChange={this.handleChange} 
			    		/>
					</Col>

					<Col xs={4}>
				    	<Form.Label>Re-Enter New Password</Form.Label>
			    		<Form.Control 
			    			type="password"
			    			name="reNewPassword" 
				    		value={this.state.reNewPassword} 
				    		onChange={this.handleChange} 
			    		/>
					</Col>
					<br/>

					<Col xs={4}>
					<Button 
						variant="dark" 
						type="submit"
						block
					>
						Change Password
					</Button>
					</Col>
				</Form>
				:
				<div>
				</div>
			}
			</div>
		)
	}
}

export default Account