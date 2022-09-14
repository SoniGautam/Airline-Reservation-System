import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class Welcome extends Component {
	
	render() {
		return (
			<div>
				<Container>
				<Alert variant="light">
					<center>
					<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfN_qHZzO87a22e4-4R7N6mW7xspC4kMWfjw&usqp=CAU" width="300" roundedCircle></Image>
					<br /><br />
					<Alert.Heading>Airline Reservaton System</Alert.Heading>
					<hr />
					<p>Welcome To Airline Reservaton System: Book your Flight</p>
					<hr />
					<p>
					</p>
					</center>

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
				</Alert>
				</Container>
				<br/><br/>
				<center>
					<p>Developed by Soni Gautam and Sima Gurung<br/>2022</p>
				</center>
			</div>
		)
	}
}

export default Welcome