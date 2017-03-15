'use strict';

import React from 'react';
import ListingContracted from '../listing-contracted';
import ListingExpanded from '../listing-expanded';

export default class Expired extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: ''
    }
  }

  toggleView(id){
    this.state.clicked === id ? this.setState({ clicked: ''}) : this.setState({ clicked: id });
  }

  renderExpanded(listing, i){
    return(
     <div key={i}>
        <ListingExpanded listing={listing} toggleView={this.toggleView.bind(this,listing.id)}/>
    </div>
    )
  }

  displayExpired(listings){
    return listings.map((listing, i) => {
    if(this.state.clicked === listing.id) {
      return this.renderExpanded(listing, i)
    }
    else{
      // this renders collapsed version of listing
       return(
          <div onClick={this.toggleView.bind(this, listing.id)} key={i}>
           <ListingContracted expired={true} listing={listing}/>
          </div>
       )
     }
    });
  }

  render(){
    return(
      <div>
        { this.displayExpired(this.props.expired) }
      </div>
    )
  }
}
