import React, { Component } from 'react'

//import { getBookings } from '../services/bookingService';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import CreateBooking from '../components/CreateBooking'
import ExploreBooking from '../components/ExploreBooking'


class Booking extends Component {
	_isMounted = false;

	state = {
		view: "explore",
		id: "",
		bookingName: "",

		loading: true
	}

	async componentDidMount(){
		this._isMounted = true;
		
		if (this._isMounted) {
			//const { data: bookings } = await getBookings();
			
			
			this.setState({loading: false})	
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	bookingForm = () => {
		this.setState({
			view: "bookingForm"
		})
	}

	report = () => {
		this.setState({
			view: "report"
		})
	}

	explore = () => {
		this.setState({
			view: "explore"
		})
	}


	renderView = () => {
		if (this.state.view==="explore") {
			return (
				<div>
					<Alert variant="info">
						<center>
						<Alert.Heading>Show Bookings</Alert.Heading>				
						</center>
					</Alert>	
					<ExploreBooking/>
				</div>
			)
		}
		else if (this.state.view==="bookingForm") {
			return (
				<div>
					<Alert variant="info">
						<center>
						<Alert.Heading>Book a Flight</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<CreateBooking />
				</div>
			)
		}
	}

	render() {
		return (
			<div>

				{ this.state.loading
						?
						<div>
							<center>
							<br />
							<br />
							<br />
							<Spinner size="sm" animation="grow" variant="danger" />{' '}
							<Spinner size="sm" animation="grow" variant="warning" />{' '}
							<Spinner size="sm" animation="grow" variant="success" />
							</center>
						</div>
						: 
						<div>
				
				<Container>
					<br />
					<h3>My Bookings</h3>
					<br />

					<Button variant="dark" onClick={this.explore}>
						Explore
					</Button>{' '}

					<Button variant="dark" onClick={this.bookingForm}>
						Book
					</Button>{' '}

					<hr />
					<br />

					{this.renderView()}

				</Container>			
			</div>
			}	
		</div>
		)
	}
}

export default Booking