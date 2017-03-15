import React from 'react';

export default function (props) {

const listing = props.listing;

  return (
    <div id="listing" className="expiringsoon">
     <div className="groupA">
        <h2>{ listing.title }</h2>
        <h3 id="black" className="commitment">{ listing.timeCommitment }</h3>
        <h3 id="lightgrey" className="time">{ listing.hours }</h3>
      </div>
      <div className="groupB">
        <h3 id="lightgrey">{ listing.neighborhood },</h3>
        <h3 id="lightgrey">{ listing.borough }</h3>
      </div>
      <div className="groupC">
        <h3 id="black" className="blurb">{ listing.briefDescription }</h3>
      </div>
    </div>
  )

}
