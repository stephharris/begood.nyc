'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ListingExpanded from './listing-expanded';
import ListingContracted from './listing-contracted';
import { browserHistory, Link } from 'react-router';

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
      browserHistory.push('#' + route);
      this.setState({ clicked: route, route: '#' + route })
    }else{
      browserHistory.push('/');
      this.setState({ clicked: {}, route: '' })
    }
  }

  displayListings(listings){
    return listings.length > 0 ? listings.map((listing, i) => {
     const hashed = '#' + listing.route;

     if(this.state.route === hashed || this.state.clicked === listing.route) {
       return(
        <div aria-expanded="true" tableindex="0" key={i}>
        <ListingExpanded toggleView={this.toggleView.bind(this, listing.route)} listing={listing}/>
        </div>
      )
     }else{
       return(
        <div aria-expanded="false" tableindex="0" onClick={this.toggleView.bind(this, listing.route)} key={i}>
        <ListingContracted listing={listing}/>
        </div>)
     }
    }) : (<h3 className="sorry">sorry! nothing to see here...</h3>);
  }

  render() {
    return (
      <div className="displayListingsContainer">
      { this.displayListings(this.props.listings) }
      </div>
    )
  }

}
