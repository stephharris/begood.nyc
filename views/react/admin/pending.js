'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingContracted from '../listing-contracted';
import ListingExpanded from '../listing-expanded';
import Part1 from './form-part1';
import Part2 from './form-part2';
import _ from 'lodash';
import axios from 'axios';

export default class Pending extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {
       author: '',
       personalEmail: '',
       title: '',
       timeCommitment: '',
       hours: '',
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
       clicked: '',
       editing: false,
       fieldsEdited: []
    }
  }


  cancel(listing){
    this.setState({ editing: false, clicked: '' })
  }

  approve(){
    console.log('this is the listing in state', this.state);
  }

  edit(listing){
    this.setState({ editing: true })
  }

  save(listing){
    let editedKeys = {};

    let fields = this.state.fieldsEdited;
    for(let i = 0; i < fields.length; i++){
      listing[fields[i]] = this.state[fields[i]];
      editedKeys[fields[i]] = this.state[fields[i]];
    }

    editedKeys.id = this.state.clicked;

    axios.put('/admin/pending', editedKeys)
    .then( () => {
       this.setState({ editing: false, fieldsEdited: [] })
    })
    .catch( (error) => {
      let errorArray = error.response.data
      let err = {};
      for(let i = 0; i < errorArray.length; i++){
        err[errorArray[i].path] = errorArray[i].message;
      }
      this.setState({ errors: err })
      console.log('error city!', err )
    })
  }

  toggleView(id){
    if(this.state.clicked === id){
      this.setState({ clicked: '' })
    }else{
      this.setState({ clicked: id })
    }
  }

  handleChange(e){
  console.log(e.target.value)
  let fields = this.state.fieldsEdited;
      this.setState({
        [e.target.name]: e.target.value
      });
    if(fields.indexOf(e.target.name) === -1){
      fields.push(e.target.name);
      this.setState({ fieldsEdited: fields });
    }
  }

  renderEditing(listing, i){
    return(
      <div key={i} className="createContainer">
      <div className="containerA">
        <form onChange={this.handleChange}>
          <input name="title" defaultValue={listing.title} className="adminAuth" type="text" placeholder="title*"/>
        </form>
      </div>
        <button onClick={this.save.bind(this, listing)}>Save</button>
        <button onClick={this.cancel.bind(this, listing)}>Cancel</button>
    </div>
    )
  }

  renderExpanded(listing, i){
    return(
     <div key={i}>
        <ListingExpanded listing={listing} toggleView={this.toggleView.bind(this,listing.id)} edit={this.edit} approve={this.approve} pending={true}/>
    </div>
    )
  }


  displayPending(listings){
    return listings.map((listing, i) => {
    if(this.state.editing && (this.state.clicked === listing.id)){
       return this.renderEditing(listing, i);
     }
    else if(this.state.clicked === listing.id){
       return this.renderExpanded(listing, i)
     }
    else{
      // this renders collapsed version of listing
       return(
          <div onClick={this.toggleView.bind(this, listing.id)} key={i}>
           <ListingContracted listing={listing}/>
          </div>
       )
     }
    });
  }

 render() {
  return(
    <div style={{marginTop: '1.5em'}}>
       { this.displayPending(this.props.pending) }
    </div>
  )
 }

}
