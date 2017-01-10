'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Listings from './listings.js';
import Filter from './filter.js';

export default class Home extends React.Component {

  constructor(){
    super();
    this.toggleFilter = this.toggleFilter.bind(this);
    this.state = {
      listings: [],
      filterActive: false,
      filterBy: []
    }
  }

 toggleFilter(event){
      this.setState({filterActive: !this.state.filterActive})
    console.log('clicked',this.state.filterActive)
  }

  componentDidMount() {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
      this.setState({ listings: data, filterActive: false, filterBy: [] })
    })
    .catch(err => {
      console.error('error', err)
    });
  }

  render() {

    return (
      <div>

        <div id="post">
          <h3>submit an opportunity</h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216"><path d="M204.3 92.9h-81.2V11.7C123.1 8 118 0 108 0S92.9 8 92.9 11.7v81.2H11.7C8 92.9 0 98 0 108s8 15.1 11.7 15.1h81.2v81.2c0 3.7 5 11.7 15.1 11.7s15.1-8 15.1-11.7v-81.2h81.2c3.7 0 11.7-5 11.7-15.1S208 92.9 204.3 92.9z"/></svg>
        </div>

        { this.state.filterActive ?
        <div onClick={this.toggleFilter.bind(this)} id="filters"><h3>filters active</h3></div>
        : <div onClick={this.toggleFilter.bind(this)} id="filters"><h3>filters inactive</h3></div>
        }

        <Listings listings={this.state.listings}/>
      </div>
    )
  }

}

