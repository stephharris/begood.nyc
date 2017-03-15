'use strict';

import React from 'react';
import ListingExpired from './admin/admin.listing.expired';
import ListingExpiringSoon from './admin/admin.listing.expiringsoon';
import DefaultListing from './listing.default';

export default class ListingContracted extends React.Component {

  constructor(props){
    super(props);
    this.compareDates = this.compareDates.bind(this);
  }

// diff of one day is 86400000
// if the listing's expiration date is within 5 days of today, this fn returns true
  compareDates(today, expirationDate){
    let t = new Date(today), d = new Date(expirationDate);
    let diff = d - t;
    console.log('diff', diff)
    if(diff < 5184e5 && diff > 0){
        return true;
    }
  }

  render() {
    let today = new Date().toISOString();
    if(this.props.expired){
      return (<ListingExpired listing={this.props.listing} />);
    }
    else if(this.props.pending || this.props.active){
      if(this.props.listing.expires < today){
        return (<ListingExpired listing={this.props.listing} />);
       }
      else if(this.compareDates(today, this.props.listing.expires)){
        return (<ListingExpiringSoon listing={this.props.listing} />);
       }
      else{
        return (<DefaultListing admin={true} listing={this.props.listing} />);
      }
    }
    else{
      return (<DefaultListing listing={this.props.listing} />);
    }
  }
}

