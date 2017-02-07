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
    this.state = {
      input: ''
    }
  }

  handleChange(e) {
    const currentInput = e.target.value;
    this.setState({ input: currentInput });
    console.log('current input', this.state.input);
  }

  // this simply saves the data upon enter key
  handleEnter(e) {
    e.preventDefault();
    console.log('saved value on enter key', this.state.input);
  }

  handleSubmit(e) {
    console.log('clicked le button')
    // here we should submit post request a la axios
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>
        <Form input={this.state.input} handleChange={this.handleChange} handleEnter={this.handleEnter} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }

}
