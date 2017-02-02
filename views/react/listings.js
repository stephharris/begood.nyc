'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingExpanded from './listing-expanded';
import ListingContracted from './listing-contracted';
import { browserHistory } from 'react-router';

export default class Listings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: {},
      route: props.opportunity
    }
  }

  toggleView(route){
    console.log('clicked', route)
    if(this.state.clicked !== route){
      browserHistory.push(`${route}`);
      this.setState({ clicked: route })
    }else{
      browserHistory.push('/');
      this.setState({ clicked: {} })
    }
  }


  displayListings(listings){
    return listings ? listings.map((listing, i) => {
     if(this.state.clicked === listing.route || this.state.route === listing.route) {
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
