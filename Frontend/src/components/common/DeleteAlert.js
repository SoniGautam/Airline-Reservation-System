import React, { Component } from 'react'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

/*
class DeleteAlert extends Component {
	state = {
		value: false
	}

	confirm = () => {
		this.setState({
			value: true
		})
	}

	cancel = () => {
		this.setState({
			value: false
		})
	}

	render() {
		return (
			<div>
				<Alert>

					<br />Do you really want to DELETE ?<br /><br />

    				<Button variant="outline-success" onClick={this.confirm}>
						Confirm
					</Button>{' '}
					
					<Button variant="outline-danger" onClick={this.cancel}>
						Cancel
					</Button>{' '}
  				
  				</Alert>
			</div>
		)
	}
}


*/

class DeleteAlert extends React.Component{
 constructor(props){
  super(props)
  this.state = {
   label: props.label||'Unlabelled',
   question: props.question||'Confirm?',
   confirmed: false,
   className: props.className?'btn '+props.className:'btn'
  }
 }
 
 render() {
  return (
   <div>
    {
     this.state.confirmed!==true&&
     <button 
      type="button"
      className={this.state.className}
      onClick={()=>{this.setState({confirmed:true})}}>
      {this.state.label}
     </button>
     ||
     (
      <div>
       <span className="mr-3">{this.state.question}</span>
       <button 
        name={this.props.name}
        type="button"
        className="btn btn-success mr-3"
        onClick={(event)=>{
         this.props.onClick(event)
         this.setState({confirmed:false})
        }}>
        Yes
       </button>
       <button 
        type="button"
        className="btn btn-danger"
        onClick={()=>{this.setState({confirmed:false})}}>
        No
       </button>
      </div>
     )
    }
   </div>
  )
 }
}


export default DeleteAlert