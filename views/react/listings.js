'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Listings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: {}
    }
  }

  toggleView(route){
    if(this.state.clicked === route){
      this.setState({ clicked: {} })
    }else{
      this.setState({ clicked: route })
    }
  }

  displayTags(tags){
    return tags.length < 2 ? tags : tags.join(', ');
  }

  displayListings(listings){
    return listings ? listings.map((listing, i) => {
     if(this.state.clicked === listing.route){
       return(
           <div key={i} onClick={this.toggleView.bind(this, listing.route)} className="listing-expanded">
               <div className="groupA">
                  <h2>{ listing.title }</h2>
                  <h3 className="commitment">{ listing.timeCommitment }</h3>
                  <h3 className="time">{ listing.hours }</h3>
                  <div className="address">
                    <h3>{ listing.meetingLocation }</h3>
                    <h3>{ listing.neighborhood }, { listing.borough }</h3>
                  </div>
                  <a href={`mailto:${listing.contactEmail}`}>contact</a>
                  <a href={listing.moreInfoUrl}>more info</a>
                  <h3 className="tags"><span style={{fontFamily: 'Avenir Black'}}>TAGS: </span>{ this.displayTags(listing.tags) }</h3>
               </div>
               <div className="groupD">
                  <h3 className="description">
                  { listing.fullDescription }
                  </h3>
                  <h3>REQUIREMENTS: { listing.requirements }</h3>
               </div>
         </div>)
     }else{
       return(
           <div onClick={this.toggleView.bind(this, listing.route)} id="listing" key={i}>
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

