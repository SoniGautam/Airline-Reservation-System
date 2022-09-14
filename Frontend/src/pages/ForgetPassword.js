import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Joi from "joi-browser";
import { ToastContainer, toast } from  'react-toastify'
import { forgetPassword } from "../services/userService";


class ForgetPassword extends Component {
	state = {
		email: "",
		buttonDisabled: false
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	validateEmail = (req) => {
		const schema = {
			email: Joi.string().min(5).max(255).email().required()
		};

		return Joi.validate(req, schema);
	}

	handleSubmit = async event => {
		event.preventDefault();

		//this.setState({buttonDisabled: true})
		
		const data = {...this.state};
		delete data.buttonDisabled
		
		const {error} = this.validateEmail(data)
		if (error) {
			toast.error(error.details[0].message) 
		}
		else {
			this.setState({buttonDisabled: true});	
			try {
				await forgetPassword(data);
    			window.location = "/check";
				toast.dark("Reset email sent.")
			}	
			catch(error) {
				toast.error(error);
			}
		}

		this.setState({buttonDisabled: false})
	}

	render() {
		return (
			<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
				<ToastContainer hideProgressBar position="bottom-right"  />
				<Container>
					<center>
					<Alert>
						<Alert.Heading>Reset your password</Alert.Heading>
					</Alert>
					</center>
					<Row>
						<Col></Col>
						<Col>
							<br />
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="">
									<Form.Label>Email Address</Form.Label>
									<Form.Control 
										type="email" 
										placeholder="Enter your email address" 
										name="email" 
							    		value={this.state.email} 
							    		onChange={this.handleChange}
									/>
								</Form.Group>

								<br />
								
								<Button variant="primary" block type="submit" disabled={this.state.buttonDisabled}>
									Send Password Reset Email
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
		)
	}
}

export default ForgetPassword