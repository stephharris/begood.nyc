'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Listings extends React.Component {

  constructor(props){
    super(props);
  }

  displayListings(listings){
    return listings ? listings.map((listing) => {
      return (

          <div id="listing" key={listing.id}>
            <div className="groupA">
              <h2>{ listing.title }</h2>
              <h3 className="commitment">{ listing.timeCommitment }</h3>
              <h3 className="time">{ listing.hours }</h3>
            </div>
            <div className="groupB">
              <h3>{ listing.neighborhood },</h3>
              <h3>{ listing.borough }</h3>
            </div>
            <div className="groupC">
              <h3 className="blurb">{ listing.briefDescription }</h3>
            </div>
          </div>

      )
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

