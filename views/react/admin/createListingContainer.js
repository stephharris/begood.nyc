import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './createListingForm';
import _ from 'lodash';
import { browserHistory } from 'react-router';


export default class CreateListingContainer extends React.Component {

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.reconfigureData = this.reconfigureData.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
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
       expires: '',
       errors: {},
       formsDirty: false,
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
       yyyy: '',
       errors: {},
       formsDirty: false
    }
  }


  handleCheckbox(e) {
    this.state.formsDirty === false ? this.setState({ formsDirty: true }) : '';
    let currentTags = this.state.tags;
    currentTags.indexOf(e.target.value) > -1 ? currentTags = _.remove(currentTags, (tag) => { return tag !== e.target.value }) : currentTags.push(e.target.value);
    this.setState({
      tags: currentTags
    })
  }

  handleChange(e) {
    this.state.formsDirty === false ? this.setState({ formsDirty: true }) : '';
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
  }

  reconfigureData() {
    console.log('the state when reconfigureData is called', this.state)
    const undesiredKeys = ['inputCleared','yyyy','mm','dd','hoursA','hoursB', 'errors']
    let data = {};
    // must concatenate hoursA + hoursB
    (this.state.hoursA && this.state.hoursB) ? data.hours = this.state.hoursA + ' to ' + this.state.hoursB : data.hours = 'scheduling tbd';
    // handles expiration date
    data.expires = this.state.yyyy + '-' + this.state.mm + '-' + this.state.dd;

    for(let i in this.state){
      if(undesiredKeys.indexOf(i) === -1){
        data[i] = this.state[i]
      }
    }
    data.expires === '--' ? data.expires = '' : '';
    return data;
  }

  handleSubmit() {
    let clear = Object.assign({}, this.state.inputCleared, {inputCleared: this.state.inputCleared })

    let data = this.reconfigureData();

    axios.post('/admin/create', { data })
    .then( () => {
      this.setState(clear);
      browserHistory.push('/submit/success/');
    })
    .catch( (error) => {
      console.log('got to the error/catch part')
      let errorArray = error.response.data;
      console.log('error array', errorArray);
      let err = {};
      for(let i = 0; i < errorArray.length; i++){
        err[errorArray[i].path] = errorArray[i].message;
      }
      this.setState({ errors: err })
      console.log('error city!', err )
      return;
    })
  }

  handleRefresh(){
    let formsDirty = this.state.formsDirty;
    window.onbeforeunload = function (e) {
      if(formsDirty) {
        console.log('got here')
        var message = "Are you sure you want leave?";
        e.returnValue = message;
        return message;
      }
        return;
    };
  }

  render() {
    this.handleRefresh();
    return (
      <div>
        <Form autocomplete="off" input={this.state} handleChange={this.handleChange} handleEnter={this.handleEnter} handleSubmit={this.handleSubmit} />
      </div>
    )
  }

}
