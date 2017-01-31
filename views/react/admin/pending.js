'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Pending extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: {},
      editing: false
    }
  }

  edit(){
    console.log('hit the edit button')
    this.setState({ editing: true })
    console.log(this.state.editing);
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

  renderEditing(listing, i){
    console.log('got to render editing')
    return(
    <div key={i} className="listing-expanded">
      <div onClick={this.toggleView.bind(this, listing.route)}  className="groupA">
        <h1>{ listing.title }</h1>
      </div>
    </div>
    )
  }

  renderNormal(listing, i){
    return(
     <div key={i} className="listing-expanded">
         <div onClick={this.toggleView.bind(this, listing.route)} className="groupA">
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
          <button onClick={this.edit.bind(this)}>Edit</button>
          <button>Remove</button>
          <button>Approve</button>
         </div>
    </div>
    )
  }


  displayPending(listings){
    return listings ? listings.map((listing, i) => {
    // this renders expanded version of listing
     if(this.state.clicked === listing.route){
        if(this.state.editing){
          return this.renderEditing(listing, i);
        }else{
          return this.renderNormal(listing, i)
        }
     }else{
      // this renders collapsed version of listing
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
  return(
    <div style={{marginTop: '1.5em'}}>
       { this.displayPending(this.props.pending) }
    </div>
  )
 }

}
