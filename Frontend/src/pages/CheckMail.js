import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { ToastContainer } from  'react-toastify'


class CheckMail extends Component {
	
	render() {
		return (
			<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
				<ToastContainer hideProgressBar position="bottom-right"  />
				<Container>
					<center>
					<Alert>
						<Alert.Heading>Airline Reservation System</Alert.Heading>
					</Alert>
					</center>
					<Row>
						<Col xs={2}></Col>
						<Col>
							<br />
							<center>
							<span style={{color: 'grey'}}><h3>Reset link has been sent to your email address.</h3>
							<h3><b>Check your mail</b> to reset your password.</h3></span>
							</center>
						</Col>
						<Col xs={2}></Col>
					</Row>
					<br /><br />
					<br />
					<br /><br />	
				</Container>			
			</div>
		)
	}
}

export default CheckMail