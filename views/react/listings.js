'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingExpanded from './listing-expanded';
import ListingContracted from './listing-contracted';

export default class Listings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: {}
    }
  }

  toggleView(route){
    console.log('clicked', route)
    if(this.state.clicked === route){
      this.setState({ clicked: {} })
    }else{
      this.setState({ clicked: route })
    }
  }


  displayListings(listings){
    return listings ? listings.map((listing, i) => {
     if(this.state.clicked === listing.route){
       return(
        <div key={i} onClick={this.toggleView.bind(this, listing.route)}>
        <ListingExpanded listing={listing}/>
        </div>
      )
     }else{
       return(
           <div onClick={this.toggleView.bind(this, listing.route)} key={i}>
           <ListingContracted listing={listing}/>
           </div>)
     }
    }) : '';
  }

  render() {
    return (
      <div>
      { this.displayListings(this.props.listings) }
      </div>
    )
  }

}

