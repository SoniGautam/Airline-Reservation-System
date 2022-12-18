import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


import Welcome from './Welcome'
import Booking from './Booking'
import Settings from './Settings'



class Home extends Component {
	state = {
		view: "welcome",
		payload: ""
	}


	welcome = () => {
		this.setState({
			view: "welcome"
		})
	}

	
	booking = () => {
		this.setState({
			view: "booking"
		})
	}

	
	settings = () => {
		this.setState({
			view: "settings"
		})
	}

	
	
	renderView = () => {
		if (this.state.view==="welcome") {
			return <Welcome />
		}
		else if (this.state.view==="booking") {
			return <Booking user={this.props.user}/>
		}
		else if (this.state.view==="settings") {
			return <Settings user={this.props.user} />
		}
		
	}

	render() {
		return (
			<div>
				<Navbar expand="lg" bg="info" variant="info">
				    <Navbar.Brand>
				    	Airline Reservation System
				    </Navbar.Brand>
				    <Nav className="ml-auto">
						
				    <Nav.Link>
				      	<Button variant="info" onClick={this.booking}>
							Flight Booking
						</Button>{' '}
				    </Nav.Link>

				    <Nav.Link>
				      	<Button variant="info" onClick={this.settings}>
							Sign Out
						</Button>{' '}
				    </Nav.Link>
				  	</Nav>
				</Navbar>
					
				<br />

				{this.renderView()}

				<div>
					<br/><br/>
					<br/><br/>
				</div>	
			</div>
		)
	}
}

export default Home