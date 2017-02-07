import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './createListingForm';

export default class CreateListingContainer extends React.Component {

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const initialState = {
       name: '',
       email: '',
       title: '',
       timecommitment: '',
       hoursA: '',
       hoursB: ''
    }
    this.state = {
      inputCleared: initialState,
       author: '',
       personalEmail: '',
       title: '',
       timeCommitment: '',
       hoursA: '',
       hoursB: '',
       briefDescription: '',
       neighborhood: '',
       borough: '',
       meetingLocation: ''
    }
  }

  // TO DO BEFORE AXIOS REQUEST:
  // must concatenate hoursA + hoursB


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // this simply 'saves our data' to state upon hitting enter key
  handleEnter(e) {
    e.preventDefault();
    console.log('saved values on enter key', this.state.input);
  }

  handleSubmit() {
    console.log('clicked le button')
    console.log('state', this.state);
    let obj = Object.assign({}, this.state.inputCleared, {inputCleared: this.state.inputCleared })
    // here we should submit post request a la axios

    // this clears our inputs after clicking submit
    this.setState(obj);
  }

  render() {
    return (
      <div>
        <Form input={this.state} handleChange={this.handleChange} handleEnter={this.handleEnter} handleSubmit={this.handleSubmit} />
      </div>
    )
  }

}
