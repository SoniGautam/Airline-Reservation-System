import React, { Component } from 'react'

import { registerUser } from '../services/userService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

import Joi from "joi-browser";
import { ToastContainer, toast } from  'react-toastify'


class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		buttonDisabled: false
	}

	validateUser = (req) => {
		const schema = {
			name: Joi.string()
			.min(3)
			.max(50)
			.required(),
			email: Joi.string().min(5).max(255).email().required(),
			password: Joi.string().min(5).max(255).required(),
		};

		return Joi.validate(req, schema);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleCheck = e => {
		const checked = e.target.checked;
		this.setState({ isAdmin: checked })
	}

	handleSubmit = async event => {
		event.preventDefault();
		
		const data = {...this.state};
		delete data.buttonDisabled;
		
		const {error} = this.validateUser(data)
		if (error) {
			toast.error(error.details[0].message) 
		}
		else {
			this.setState({buttonDisabled: true});	
			try {
				await registerUser(data);
    			window.location = "/login";
				toast.dark("Successfully Registered")
			}	
			catch(error) {
				toast.error(error);
			}
		}
		this.setState({buttonDisabled: false});	
	}

	
	render() {
		//if (auth.getCurrentUser()) return <Redirect to="/home"  />;

		return (
			<div>
				<ToastContainer hideProgressBar position="bottom-right"  />


				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
				<Container>
					<center>
					<Alert>
						<Alert.Heading>Airline Reservation System</Alert.Heading>
					</Alert>
					</center>
					<Row>
						<Col></Col>
						<Col>

				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="">
						<Form.Label>Name</Form.Label>
						<Form.Control 
							type="text" 
							placeholder="Enter your name" 
							name="name" 
				    		value={this.state.name} 
				    		onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="">
						<Form.Label>Email</Form.Label>
						<Form.Control 
							type="email" 
							placeholder="Enter your email address" 
							name="email" 
				    		value={this.state.email} 
				    		onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="">
						<Form.Label>Password</Form.Label>
						<Form.Control 
							type="password" 
							placeholder="Password" 
							name="password" 
				    		value={this.state.password} 
				    		onChange={this.handleChange}
						/>
					</Form.Group>

					<br />

					<Button variant="success" block disabled={this.state.buttonDisabled} type="submit">
						Register
					</Button>
				</Form>

				</Col>
						<Col></Col>
					</Row>
					<br /><br />
					<br />
					<br /><br />	
				</Container>
				</div>
			</div>
		)
	}
}

export default Register