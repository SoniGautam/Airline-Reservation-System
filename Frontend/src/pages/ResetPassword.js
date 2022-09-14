import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Joi from "joi-browser";
import { ToastContainer, toast } from  'react-toastify'

import { resetPassword } from "../services/userService";


class ResetPassword extends Component {
	state = {
		userId: "",
		password: "",
		token: "",
		buttonDisabled: false
	}

	componentDidMount = async () => {
		const a = this.props.location.pathname.split('/')
		
		const l = a.length
		
		this.setState({
			token: a[l - 1].slice(0, -1),
			userId: a[l - 2]
		})
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	validatePassword = (req) => {
		const schema = {
			userId: Joi.string(),
			token: Joi.string(),
			password: Joi.string()
				.min(5)
				.max(255)
				.required()
		};

		return Joi.validate(req, schema);
	}

	handleSubmit = async event => {
		event.preventDefault();
		
		//this.setState({buttonDisabled: true})
		
		const data = {...this.state};
		delete data.buttonDisabled
		
		const {error} = this.validatePassword(data)
		if (error) {
			toast.error(error.details[0].message) 
		}
		else {
			this.setState({buttonDisabled: true});	
			try {
				await resetPassword(data);
    			window.location = "/login";
				toast.dark("Changed successfully")
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
									<Form.Label>Choose a new password</Form.Label>
									<Form.Control 
										type="password" 
										placeholder="New Password" 
										name="password" 
							    		value={this.state.password} 
							    		onChange={this.handleChange}
									/>
								</Form.Group>

								<br />
								
								<Button variant="dark" block type="submit" disabled={this.state.buttonDisabled}>
									Reset Password
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

export default ResetPassword