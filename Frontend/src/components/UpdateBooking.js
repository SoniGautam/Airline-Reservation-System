import React, { Component } from 'react'
import { getBooking, updateBooking } from '../services/bookingService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { ToastContainer, toast } from  'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Joi from "joi-browser"


class UpdateBooking extends Component {
	state = {
		_id: this.props.id,

		dest1: "",
		dest2: "",
		seats: "",
		remarks: "",
		
		buttonDisabled: false		
	}

	async componentDidMount() {
		const oldData = await getBooking(this.props.id);
		
		this.setState({
			date: oldData.data.date.toString(),
			flightDate: oldData.data.flightDate,
			dest1: oldData.data.dest1.toString(),
			dest2: oldData.data.dest2.toString(),
			seats: parseInt(oldData.data.seats),
			remarks: oldData.data.remarks.toString(),
			username: oldData.data.username.toString()
		});

		if (oldData.data.remarks === "") {
			this.setState({remarks: ""})
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	validateBooking = ( b ) => {
	    const schema = {
	        date: Joi.string().allow(''),
	        flightDate: Joi.date().required(),
	        dest1: Joi.string().min(2).max(255).required(),
	        dest2: Joi.string().min(2).max(255).required(),
	        seats: Joi.number().required(),
	        remarks: Joi.string().max(1024).allow(''),
	        username: Joi.string().required()        
	    };

	    return Joi.validate(b, schema);
	}

	handleSubmit = async ( event ) => {
		event.preventDefault();

		const data = {...this.state};
		delete data.buttonDisabled;
		const id = data._id;
		delete data._id;

		const {error} = this.validateBooking(data);
		if (error) {
			toast.error(error.details[0].message); 
		}
		else {
			this.setState({buttonDisabled: true});
			try {
				await updateBooking(data, id);	
				toast.dark("Updated successfully");
			}	
			catch(error) {
				toast.error(error);
			}
			this.props.handleUpdate();
		}	
	}


	render() {
		return (
			<div>
				<ToastContainer hideProgressBar position="bottom-right"  />

				<Form onSubmit={this.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} controlId="">
				    		<Form.Label>Date</Form.Label>
				    		<Form.Control 
				    			type="text"
					    		name="date" 
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
				    			type="text"
					    		name="flightDate" 
					    		value={this.state.flightDate} 
					    		onChange={this.handleChange}
					    		disabled
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
					    		placeholder="1"
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
								placeholder="Passenger Information [Adults / Children]" 
								name="remarks" 
				    			value={this.state.remarks} 
				    			onChange={this.handleChange}
							/>
						</Form.Group>
					</Form.Row>

					<br />
					
					<br />
					
					<Button 
						variant="dark" 
						type="submit"
						disabled={this.state.buttonDisabled}
					>
						Update Booking
					</Button>{" "}

					<Button 
						variant="outline-dark"
						onClick={this.props.handleCancel}
					>
						Cancel
					</Button>
				</Form>
			</div>
		)
	}
}


export default UpdateBooking