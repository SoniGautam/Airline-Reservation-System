import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'

import Account from '../components/Account'


class Settings extends Component {
	render() {
		return (
			<div>
				<Container>
					<h3>Settings Section</h3>
					<Account user={this.props.user}/>
				</Container>			
			</div>
		)
	}
}

export default Settings