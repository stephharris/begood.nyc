'use strict';

import React from 'react';

export default class ListingContracted extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

   let today = new Date().toISOString();

   if(this.props.listing.expires < today && this.props.active || this.props.pending){
    return (
      <div id="listing">
       <div className="groupA">
          <h2>{ this.props.listing.title }</h2>
          <h3 className="commitment">{ this.props.listing.timeCommitment }</h3>
          <h3 className="time">{ this.props.listing.hours }</h3>
        </div>
        <div className="groupB">
          <h3>{ this.props.listing.neighborhood },</h3>
          <h3>{ this.props.listing.borough }</h3>
        </div>
        <div className="groupC">
          <h3 className="blurb">{ this.props.listing.briefDescription }</h3>
        </div>
      </div>)
   }
   else{
    return (
      <div id="listing">
        <div className="groupA">
          <h2>{ this.props.listing.title }</h2>
          <h3 className="commitment">{ this.props.listing.timeCommitment }</h3>
          <h3 className="time">{ this.props.listing.hours }</h3>
        </div>
        <div className="groupB">
          <h3>{ this.props.listing.neighborhood },</h3>
          <h3>{ this.props.listing.borough }</h3>
        </div>
        <div className="groupC">
          <h3 className="blurb">{ this.props.listing.briefDescription }</h3>
        </div>
      </div>)
    }
  }
}

