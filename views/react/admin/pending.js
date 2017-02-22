'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingContracted from '../listing-contracted';
import ListingExpanded from '../listing-expanded';
import Part1 from './form-part1';
import Part2 from './form-part2';
import _ from 'lodash';
import axios from 'axios';
import EditingMode from './editing-mode';

export default class Pending extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.cancel = this.cancel.bind(this);
    // this.approve = this.approve.bind(this);
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


  cancel(){
    // resetting/clearing the state
    let clearKeys = {};
    let fields = this.state.fieldsEdited;
    for(let i = 0; i < fields.length; i++){
      fields[i] !== 'tags' ? clearKeys[fields[i]] = '' : clearKeys['tags'] = [];
    }
    this.setState(clearKeys)
    this.setState({ editing: false, clicked: '', fieldsEdited: [], errors: {} })
  }

  approve(){
    console.log('this is the listing in state', this.state);
  }

  edit(listing){
    // console.log('inside edit', this.state, listing)
    let copyTags = listing.tags.map( (tag) => { return tag });
    this.setState({ editing: true, tags: copyTags })
  }

  save(listing){
    console.log('being saved', this.state)
    let editedKeys = {};
    let clearKeys = {};

    let fields = this.state.fieldsEdited;
    for(let i = 0; i < fields.length; i++){
      // listing[fields[i]] = this.state[fields[i]];
      editedKeys[fields[i]] = this.state[fields[i]];
      clearKeys[fields[i]] = '';
    }

    editedKeys.id = this.state.clicked;

    axios.put('/admin/pending', editedKeys)
    .then( () => {
      console.log('success')

      for(let i = 0; i < fields.length; i++){
        listing[fields[i]] = this.state[fields[i]];
      }

       this.setState({ clearKeys })
       this.setState({ editing: false, fieldsEdited: [], tags: [], errors: {} })
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


  handleCheckbox(e) {
    let currentTags = this.state.tags;
    currentTags.indexOf(e.target.value) > -1 ? currentTags = _.remove(currentTags, (tag) => { return tag !== e.target.value }) : currentTags.push(e.target.value);
    this.setState({
      tags: currentTags
    })
  }


  handleChange(e){
  let fields = this.state.fieldsEdited;
    if(e.target.type === 'checkbox'){
      this.handleCheckbox(e);
    }else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    if(fields.indexOf(e.target.name) === -1){
      fields.push(e.target.name);
      this.setState({ fieldsEdited: fields });
    }
  }

  renderEditing(listing, i){
    return(
      <div key={i} className="editing-outer">
        <EditingMode errors={this.state.errors} handleChange={this.handleChange} listing={listing} listingTags={this.state.tags} />
        <div className="editingButtons">
          <button onClick={this.save.bind(this, listing)}>save</button>
          <button onClick={this.cancel.bind(this)}>cancel</button>
        </div>
      </div>
    )
  }

  renderExpanded(listing, i){
    return(
     <div key={i}>
        <ListingExpanded listing={listing} toggleView={this.toggleView.bind(this,listing.id)} edit={this.edit.bind(this, listing)} approve={this.approve.bind(this)} pending={true}/>
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
