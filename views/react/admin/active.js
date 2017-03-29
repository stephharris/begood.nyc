'use strict';

import React from 'react';
import ListingContracted from '../listing-contracted';
import ListingExpanded from '../listing-expanded';
import _ from 'lodash';
import axios from 'axios';
import EditingMode from './editing-mode';

export default class Active extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setToExpired = this.setToExpired.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete = this.delete.bind(this);
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
      deleted: [],
      madeExpired: [],
      clicked: '',
      editing: false,
      fieldsEdited: []
    }
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


  cancel(){
    // resetting/clearing the state
    let deletedIds = this.state.deleted;
    let madeExpired = this.state.madeExpired;
    let clearKeys = {};
    let fields = this.state.fieldsEdited;
    for(let i = 0; i < fields.length; i++){
      fields[i] !== 'tags' ? clearKeys[fields[i]] = '' : clearKeys['tags'] = [];
    }
    this.setState(clearKeys)
    this.setState({ editing: false, clicked: '', fieldsEdited: [], errors: {}, deleted: deletedIds, madeExpired: madeExpired })
  }

  save(listing){
    console.log('being saved', this.state)
    let editedKeys = {};
    let clearKeys = {};
    let deletedIds = this.state.deleted;
    let madeActive = this.state.madeActive;

    let fields = this.state.fieldsEdited;
    console.log('fields', fields)
    for(let i = 0; i < fields.length; i++){
      editedKeys[fields[i]] = this.state[fields[i]];
      clearKeys[fields[i]] = '';
    }

    editedKeys.id = this.state.clicked;
    console.log(this.state)
    axios.put('/admin', editedKeys)
    .then( () => {
      console.log('success')

      fields.map( (field) => {
        listing[field] = this.state[field]
      })

       this.setState({ clearKeys })
       this.setState({ editing: false, fieldsEdited: [], tags: [], errors: {}, deleted: deletedIds, madeActive: madeActive })
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


  delete(){
    axios.delete('/admin', { data: { id: this.state.clicked } })
    .then( () => {
      let id = this.state.clicked;
      this.setState({ clicked: '', deleted: this.state.deleted.concat([id]) })
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

  setToExpired(){
    axios.put('/admin/setexpired', { id: this.state.clicked })
    .then( () => {
      let id = this.state.clicked;
      this.setState({ clicked: '', madeExpired: this.state.madeExpired.concat([id]) })
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

  edit(listing){
    console.log('made it to editing within active', listing)
    let copyTags = listing.tags.map( (tag) => { return tag });
    this.setState({ editing: true, tags: copyTags })
  }

  renderEditing(listing, i){
    return(
      <div key={i} className="editing-outer">
        <EditingMode errors={this.state.errors} listing={listing} handleChange={this.handleChange} listingTags={this.state.tags} />
        <div className="editingButtons">
          <button onClick={this.save.bind(this,listing)}>save</button>
          <button onClick={this.cancel}>cancel</button>
        </div>
      </div>
    )
  }

  renderExpanded(listing, i){
    return(
     <div key={i}>
        <ListingExpanded listing={listing} toggleView={this.toggleView.bind(this,listing.id)} edit={this.edit.bind(this,listing)} delete={this.delete} approve={this.approve} setToExpired={this.setToExpired} active={true}/>
    </div>
    )
  }


  displayActive(listings){

    listings = listings.filter( (item) => {
      return (this.state.deleted.indexOf(item.id) === -1 && this.state.madeExpired.indexOf(item.id) === -1)
    })

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
           <ListingContracted active={true} listing={listing}/>
          </div>
       )
     }
    });
  }


 render() {
  return(
    <div>
       { this.displayActive(this.props.active) }
    </div>
  )
 }

}
