import React, { Component } from 'react'

import { getBookings, deleteBooking } from '../services/bookingService';

import UpdateBooking from './UpdateBooking'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
//import Image from 'react-bootstrap/Image'

import Select from 'react-select'

import { ToastContainer, toast } from  'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class ExploreBooking extends Component {
	_isMounted = false;

	state = {
		bookingId: "",
		
		date: "",
		flightDate: "",
		dest1: "",
		dest2: "",
		seats: "",
		remarks: "",
		
		bookings: [],

		name: "",
		// totalBooking: 0.0,
		// totalSeats: 0.0,
		// total: 0.0,
		
		view: false,
		buttonDisabled: false,
		selectDisabled: false,

		update: false,
		loading: true
	}

	populateBookings = async () => {
		const { data: bookings } = await getBookings();
		this._isMounted && this.setState({ bookings })
	}	

	
	async componentDidMount(){
		this._isMounted = true;

		this._isMounted && await this.populateBookings();
		this._isMounted && this.setState({loading: false})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange = event => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = event => {
		event.preventDefault();

		const m = this.state.bookings.filter(i => i._id === this.state.bookingId);		
		
		this.setState({
			view: true,
			buttonDisabled: true,
			selectDisabled: true
		})

		if (m.length !== 0) {
			this.setState({
				date: m[0].date,
				flightDate: m[0].flightDate,
				dest1: m[0].dest1,
				dest2: m[0].dest2,
				seats: m[0].seats,
				remarks: m[0].remarks,

				name: `${m[0].dest1} - ${m[0].dest2}`
			})
		}

		// Calculate Totals
		// if (m.length !== 0) {
			
		// 	const totalBooking = 1//this.state.bookings.filter(i => i.taste === true).length;
		// 	const totalSeats  =  2//this.state.bookings.filter(i => i.taste === false).length;

		// 	const total = this.state.bookings.length*1;

		// 	this.setState({ totalBooking, totalSeats, total });
		// }

	}

	handleBookingSelect = e => {
		this.setState({
			bookingId: e.value, 
			name: `${e.dest1} - ${e.dest2}`
		})
	}

	handleReset = async () => {
		await this.populateBookings();
		this.setState({
			bookingId: "",

			date: "",
			flightDate: "",
			dest1: "",
			dest2: "",
			seats: "",
			remarks: "",

			name: "",

			// totalBooking: 0.0,
			// totalSeats: 0.0,
			// total: 0.0,
			
			view: false,
			buttonDisabled: false,
			selectDisabled: false		
		})
	}
	
	handleUpdate = async e => {
		if (this.state.bookingId !== "") {
			this.setState({ update: true });
		}
	}

	handleDelete = async e => {
		e.preventDefault();
		try {
			this.setState({
				bookingId: "",
				date: "",
				flightDate: "",
				dest1: "",
				dest2: "",
				seats: "",
				remarks: "",
				name: ""
			})
	    	await deleteBooking(this.state.bookingId)
	    	toast.dark("Booking Canceled");
	    }	
	    catch (ex) {
	    	toast.error(ex);
	    }
	}

	// handleTaste = async e => {
	// 	e.preventDefault();
	// 	try {
	//     	if (this.state.taste === true) {
	//     		this.setState({
	//     			"taste": false, 
	//     			"totalTaste": this.state.totalTaste*1 - 1,
	// 				"totalPending": this.state.totalPending*1 + 1,
	// 			})
	    		
	//     		const data = {
	//     			"name": this.state.name,
	//     			"description": this.state.description,
	//     			"taste": false,
	//     			"date": this.state.date,
	//     		}
	    		
	//     		await updateForeign(data, this.state.foreignId)
	//     		toast.dark("You should try it out");
	//     	}
	//     	else {
	//     		this.setState({
	//     			"taste": true, 
	//     			"totalTaste": this.state.totalTaste*1 + 1,
	// 				"totalPending": this.state.totalPending*1 - 1,	
	//     		});
	    		
	//     		const data = {
	//     			"name": this.state.name,
	//     			"description": this.state.description,
	//     			"taste": true,
	//     			"date": this.state.date
	//     		}
	    		
	//     		await updateForeign(data, this.state.foreignId)
	//     		toast.dark("It must be delicious");
	//     	} 
	//     }	
	//     catch (ex) {
	//     	if (ex.response && ex.response.status === 404) {
	//     		toast.error("Some error");
	//     	}
	//     }
	// }

	setCancel = e => {
		this.setState({
			update: false
		})
	}

	setUpdate = async () => {
		await this.populateBookings();

		const c = this.state.bookings.filter(i => i._id === this.state.bookingId);
		
		this.setState({
			view: true,
			buttonDisabled: true,
			selectDisabled: true
		})

		if (c.length !== 0) {
			this.setState({
				date: c[0].date,
				flightDate: c[0].flightDate,
				dest1: c[0].dest1,
				dest2: c[0].dest2,
				seats: c[0].seats,
				remarks: c[0].remarks,
				name: `${c[0].dest1} - ${c[0].dest2}`
			})
		}

		this.setState({
			update: false
		})
	}


	render() {
		return (
			<div>
			<ToastContainer hideProgressBar position="bottom-right"  />

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
			{ this.state.update 
				? <div>
					<Row><Col xs={8}>
					<br />
					<Alert variant="danger">
						<center>
						<Alert.Heading>Update Booking</Alert.Heading>				
						</center>
					</Alert>	
					<br />
					<UpdateBooking id={this.state.bookingId} handleCancel={this.setCancel} handleUpdate={this.setUpdate}/>
					</Col></Row>
				</div>
				:
				<div>
				<br />
				<Row>
							<Col>
								<Alert variant='success'>
									<center>
										<p>
											Enjoy your<br />
											<b>Vacations</b>
										</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='info'>
									<center>
										<p>
											Travel with<br />
											<b>Comfort</b> and <b>Fun</b>
										</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='success'>
									<center>
										<p>
											<b>Best Deals</b><br />
											of Available
										</p>
									</center>
								</Alert>
							</Col>
						</Row>
				<Form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Col xs={6}>
						    <Form.Label>Flight Path</Form.Label>
					    </Col>
					    <Col>
					    	<Form.Label></Form.Label>
					    </Col>
				    </Form.Row>

				    <Form.Row>
					    <Col xs={4}>	
					    	<Select 
					   			onChange={this.handleBookingSelect}
								options = {this.state.bookings.map(i => {
									return ({
										value: i._id, 
										label: `${i.dest1} - ${i.dest2}`,
										name: `${i.dest1} - ${i.dest2}`
									})
								})}
								isDisabled={this.state.selectDisabled} 
							/>
						</Col>
						<Col>
							<Button 
								variant="dark" 
								type="submit"
								disabled={this.state.buttonDisabled}
							>
								Choose
							</Button>
							{' '}
							<Button 
								variant="danger" 
								onClick={this.handleReset}
							>
								Reset
							</Button>
						</Col>
					</Form.Row>
				</Form>

				<br />

				{ this.state.view 
					? 
					<div>
						<br />
						<h4>{this.state.name}</h4>
						<br />

						<br/>
						<h4>
							Booking Details
							<Button 
								variant="outline-warning" 
								size="sm" 
								style={{float: 'right'}}
								onClick={this.handleUpdate}
							>
								Update
							</Button>
							
							<Button 
								variant="outline-danger" 
								size="sm" 
								style={{float: 'right', marginRight: 5}}
								onClick={this.handleDelete}
							>
								Delete
							</Button>
						</h4>
						
						<hr/>

						
							
						<Row>
							<Col xs={4}><p><b>Date</b></p></Col>
							<Col><p>{this.state.date}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>Departure Date</b></p></Col>
							<Col><p>{this.state.flightDate}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>From</b></p></Col>
							<Col><p>{this.state.dest1}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>To</b></p></Col>
							<Col><p>{this.state.dest2}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>Seats</b></p></Col>
							<Col><p>{this.state.seats}</p></Col>
						</Row>

						<Row>
							<Col xs={4}><p><b>Remarks</b></p></Col>
							<Col><p>{this.state.remarks}</p></Col>
						</Row>
						<br /> <br />
						


						<Row>
							<Col>
								<Alert variant='warning'>
									<center>
										<p>
											Enjoy your<br />
											<b>Vacations</b>
										</p>
									</center>
								</Alert>
							</Col>
							<Col>
								<Alert variant='primary'>
									<center>
										<p>
											Travel with<br />
											<b>Comfort</b> and <b>Fun</b>
										</p>
									</center>
								</Alert>
							</Col>

							<Col>
								<Alert variant='warning'>
									<center>
										<p>
											<b>Best Deals</b><br />
											of Available
										</p>
									</center>
								</Alert>
							</Col>
						</Row>
						
						
					</div>
					:  
					<div>
					<p>Choose a Booking</p>
					
					</div>
				}
			</div>
			}
		</div>
		}	
		</div>
		)
	}
}

export default ExploreBooking