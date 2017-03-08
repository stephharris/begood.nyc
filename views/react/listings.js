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


  // componentDidMount() {
  //     let hash = window.location.hash.replace('#', '');
  //       console.log('hash', hash)
  //       if (hash) {
  //           let node = document.getElementById(hash);
  //           console.log('node', node)
  //           if (node) {
  //               node.scrollIntoView(true);
  //           }
  //       }
  // }


  displayListings(listings){
    return listings ? listings.map((listing, i) => {
     const hashed = '#' + listing.route;
     console.log('state route', this.state.route)

     if(this.state.route === hashed || this.state.clicked === listing.route) {
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
