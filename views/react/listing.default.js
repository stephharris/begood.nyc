import React from 'react';

export default function (props) {

const listing = props.listing;
const admin = props.admin;
let style;

admin ? style = 'adminHover' : '';

  return (
    <div id="listing" className={style}>
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

}
