import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './createListingForm';
import _ from 'lodash';


export default class CreateListingContainer extends React.Component {

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    const initialState = {
       author: '',
       personalEmail: '',
       title: '',
       timeCommitment: '',
       hoursA: '',
       hoursB: '',
       briefDescription: '',
       neighborhood: '',
       borough: '',
       meetingLocation: '',
       tags: [],
       fullDescription: '',
       requirements: '',
       moreInfoUrl: '',
       contactEmail: '',
       expires: ''
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
       meetingLocation: '',
       tags: [],
       fullDescription: '',
       requirements: '',
       moreInfoUrl: '',
       contactEmail: '',
       mm: '',
       dd: '',
       yyyy: ''
    }
  }

  // TO DO BEFORE AXIOS REQUEST:
  // must concatenate hoursA + hoursB
  // must handle expiration date as well


  handleCheckbox(e) {
    let currentTags = this.state.tags;
    currentTags.indexOf(e.target.value) > -1 ? currentTags = _.remove(currentTags, (tag) => { return tag !== e.target.value }) : currentTags.push(e.target.value);
    this.setState({
      tags: currentTags
    })
  }

  handleChange(e) {
    if(e.target.type === 'checkbox'){
      this.handleCheckbox(e);
    }else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  // this simply 'saves our data' to state upon hitting enter key
  handleEnter(e) {
    e.preventDefault();
    console.log('saved values on enter key', this.state.input);
  }

  handleSubmit() {
    console.log('state', this.state);
    let clear = Object.assign({}, this.state.inputCleared, {inputCleared: this.state.inputCleared })
    axios.post('/admin/create', { listing: this.state })
    .catch( (error) => {
      this.setState({ errors: error.response.data })
    })
    // here we should submit post request a la axios

    // this clears our inputs after clicking submit
    this.setState(clear);
  }

  render() {
    return (
      <div>
        <Form input={this.state} handleChange={this.handleChange} handleEnter={this.handleEnter} handleSubmit={this.handleSubmit} />
      </div>
    )
  }

}
