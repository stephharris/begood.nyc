'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingContracted from '../listing-contracted';
import ListingExpanded from '../listing-expanded';

export default class Active extends React.Component {

  constructor(props){
    super(props);
    this.setToExpired = this.setToExpired.bind(this)
    this.delete = this.delete.bind(this)
    this.state = {
      errors: {},
      clicked: '',
      editing: false
    }
  }

  toggleView(id){
    if(this.state.clicked === id){
      this.setState({ clicked: '' })
    }else{
      this.setState({ clicked: id })
    }
  }

  delete(){
    console.log('deleting active')
    axios.delete('/admin', { data: { id: this.state.clicked } })
    .then( () => {
      this.setState({ clicked: '' })
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
    console.log('setting this active listing to expired')
  }

  edit(){
    console.log('editing mode')
  }

  renderExpanded(listing, i){
    return(
     <div key={i}>
        <ListingExpanded listing={listing} toggleView={this.toggleView.bind(this,listing.id)} edit={this.edit.bind(this,listing)} delete={this.delete} approve={this.approve} setToExpired={this.setToExpired} active={true}/>
    </div>
    )
  }


  displayActive(listings){
    return listings.map((listing, i) => {
    // if(this.state.editing && (this.state.clicked === listing.id)){
    //    return this.renderEditing(listing, i);
    //  }
    if(this.state.clicked === listing.id){
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
    <div style={{marginTop: '1.5em'}}>
       { this.displayActive(this.props.active) }
    </div>
  )
 }

}
