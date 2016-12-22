'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Listings extends React.Component {

  constructor(){
    super();
    this.state = {
      listings: []
    }
  }

  displayListings(list){
  console.log('list', list);
    return list ? list.map((item) => {
      return (
        <div key={item.id}>
        <h3>{ item.title }</h3>
        <h3 style={{color: 'red'}}>{ item.briefDescription }</h3>
        </div>
      )
    }) : '';
  }

  componentDidMount() {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
      this.setState({ listings: data })
    })
    .catch(err => {
      console.error('error', err)
    });
  }

  render() {

    return (
      <div>
      <h1>Listingssss</h1>
      { this.displayListings(this.state.listings) }
      </div>
    )
  }

}


