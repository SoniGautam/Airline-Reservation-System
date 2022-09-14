import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

import Joi from "joi-browser";
import { ToastContainer, toast } from  'react-toastify'
import { Redirect, Link } from "react-router-dom";

import auth from "../services/authService";


class Login extends Component {
	state = {
		email: "",
		password: "",

		buttonDisabled: false
	}

	validateLogin = (req) => {
		const schema = {
			email: Joi.string().min(5).max(255).email().required(),
			password: Joi.string().min(5).max(255).required()
		};

		return Joi.validate(req, schema);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit = async event => {
		event.preventDefault();
		
		const data = {...this.state};
		delete data.buttonDisabled;
		
		const {error} = this.validateLogin(data)
		if (error) {
			toast.error(error.details[0].message) 
		}
		else {
			this.setState({buttonDisabled: true});	
			try {
				await auth.login(data);
				const { state } = this.props.location;
    			window.location = state ? state.from.pathname : "/home";
				toast.dark("Welcome")
			}	
			catch(error) {
				toast.error(error);
			}
		}
		this.setState({buttonDisabled: false})	
	}

	handleForgetPassword = event => {
		
	}

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/home"  />;

		return (
			<div>
				<ToastContainer hideProgressBar position="bottom-right"  />


				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
				<Container>
					<center>
					<Alert>
						<Alert.Heading>Airline Reservation System<br /></Alert.Heading>
					</Alert>
					</center>
					<Row>
						<Col></Col>
						<Col>

				<Form onSubmit={this.handleSubmit}>
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

					<Button variant="info" block type="submit" disabled={this.state.buttonDisabled}>
						Login
					</Button>

					<br />
					<Link to="/forget">
					<Button 
						variant="outline-dark" 
						block 
						onClick={this.handleForgetPassword}
					>
						Forgot Password
					</Button>
					</Link>
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

export default Login