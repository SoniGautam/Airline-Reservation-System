import React, { Component } from 'react'
import { saveBooking } from '../services/bookingService';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { ToastContainer, toast } from  'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Joi from "joi-browser";


class CreateBooking extends Component {
	_isMounted = false;

	state = {
			date: "",
			flightDate: "",
			dest1: "",
			dest2: "",
			seats: 1,
			remarks: "",

			buttonDisabled: false,
			//loading: true		
	}

	getDate = () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		let date = dd + '/' + mm + '/' + yyyy;
		return date
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
			date: this.getDate()
		});
	}

	validateBooking = ( b ) => {
	    const schema = {
		    date: Joi.string().allow(''),
	        flightDate: Joi.date().required(),
	        dest1: Joi.string().min(2).max(255).required(),
	        dest2: Joi.string().min(2).max(255).required(),
	        seats: Joi.number().required(),
	        remarks: Joi.string().max(1024).allow('')        
	    };

	    return Joi.validate(b, schema);
	}

	handleSubmit = async ( event ) => {
		event.preventDefault();

		const data = {...this.state};
		delete data.buttonDisabled;
		delete data.loading;

		const {error} = this.validateBooking(data)
		if (error) {
			toast.error(error.details[0].message) 
		}
		else {
			this.setState({buttonDisabled: true});
			try {
				await saveBooking(data);	
				toast.dark("Flight reserved successfully")
			}	
			catch(error) {
				toast.error(error)
			}
		}	
	}

	handleClear = async () => {
		this.setState({
			flightDate: "",
			dest1: "",
			dest2: "",
			seats: 1,
			remarks: "",

			buttonDisabled: false
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
				<Form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>Date</Form.Label>
				    		<Form.Control 
				    			type="text"
					    		name="date"
					    		placeholder={this.getDate()} 
					    		value={this.state.date} 
					    		onChange={this.handleChange}
					    		disabled
				    		/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>Departure Date</Form.Label>
				    		<Form.Control 
				    			type="date"
					    		name="flightDate" 
					    		value={this.state.flightDate} 
					    		onChange={this.handleChange}
				    		/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>From</Form.Label>
				    		<Form.Control 
				    			type="text"
					    		placeholder="Pokhara"
					    		name="dest1" 
					    		value={this.state.dest1} 
					    		onChange={this.handleChange}
				    		/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>To</Form.Label>
				    		<Form.Control 
				    			type="text"
					    		placeholder="Kathmandu"
					    		name="dest2" 
					    		value={this.state.dest2} 
					    		onChange={this.handleChange}
				    		/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>No of Seats</Form.Label>
				    		<Form.Control 
				    			type="number"
					    		name="seats" 
					    		min="1"
					    		value={this.state.seats} 
					    		onChange={this.handleChange}
				    		/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="">
							<Form.Label>Remarks</Form.Label>
							<Form.Control as="textarea" rows={6}
								type="text"
								placeholder="Passenger Information [ Adults / Children ]" 
								name="remarks" 
				    			value={this.state.remarks} 
				    			onChange={this.handleChange}
							/>
						</Form.Group>
					</Form.Row>

					<Button 
						variant="dark" 
						type="submit"
						disabled={this.state.buttonDisabled}
					>
						Reserve
					</Button>

					<Button 
						variant="danger" 
						className="ml-2"
						onClick={this.handleClear}
					>
						Clear
					</Button>
				</Form>
			</div>
			}	
		</div>
		)
	}
}

export default CreateBooking
