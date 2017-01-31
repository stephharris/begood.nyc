'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ListingExpanded extends React.Component {

  constructor(props){
    super(props);
  }

  displayTags(tags){
    return tags.length < 2 ? tags : tags.join(', ');
  }

  render() {
    return (
            <div className="listing-expanded">
               <div className="groupA">
                  <h2>{ this.props.listing.title }</h2>
                  <h3 className="commitment">{ this.props.listing.timeCommitment }</h3>
                  <h3 className="time">{ this.props.listing.hours }</h3>
                  <div className="address">
                    <h3>{ this.props.listing.meetingLocation }</h3>
                    <h3>{ this.props.listing.neighborhood }, { this.props.listing.borough }</h3>
                  </div>
                  <a href={`mailto:${this.props.listing.contactEmail}`}>contact</a>
                  <a href={this.props.listing.moreInfoUrl}>more info</a>
                  <h3 className="tags"><span style={{fontFamily: 'Avenir Black'}}>TAGS: </span>{ this.displayTags(this.props.listing.tags) }</h3>
               </div>
               <div className="groupD">
                  <h3 className="description">
                  { this.props.listing.fullDescription }
                  </h3>
                  <h3>REQUIREMENTS: { this.props.listing.requirements }</h3>
               </div>
         </div>
    )
  }

}
