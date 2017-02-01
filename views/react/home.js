'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Router from 'react-router/BrowserRouter';
// import Match from 'react-router/Match';
// import Link from 'react-router/Link';
import Listings from './listings.js';
import Filter from './filter.js';

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.state = {
      listings: [],
      filteredListings: [],
      filterActive: false,
      categories: [],
      activeFilters: []
    }
  }

  // this is a helper function
  // we have activeFilters & need to check them against the tags in each listing to determine which items to display
  compareTags(activeFilters, arr){
  let matches;
    for(let i = 0; i < activeFilters.length; i++){
      if(arr.indexOf(activeFilters[i]) !== -1){ // aka it exists
        matches = true;
      }else{
        return false;
      }
    }
    return matches;
  }

  displayFilteredListings(){
  let update = [];
    if(this.state.activeFilters.length < 1){
      this.setState({ filteredListings: this.state.listings })
    }else{
      this.setState({ filteredListings: this.state.listings.filter(
        (listing) => {
           return this.compareTags(this.state.activeFilters,listing.tags)
        })
      })
    }
  }

// adds and removes tags from this.state.activeFilters, then calls displayFilteredListings() to update display
  toggleCategory(category){
    category.selected = !category.selected;
    let currentFilters = this.state.activeFilters;
    if(category.selected){
      currentFilters.push(category.name)
      // passing a callback as a 2nd param to setState ensures fn is called after the state, activeFilters, is set
      this.setState({ activeFilters: currentFilters }, () => { this.displayFilteredListings() });
    }else{
      console.log(this.state.activeFilters);
      this.setState({ activeFilters: currentFilters.filter((tag) => {
          return tag !== category.name
        })
      }, () => { this.displayFilteredListings() })
    }
  }


  toggleFilter(event){
    this.setState({filterActive: !this.state.filterActive})
  }

  componentDidMount() {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
      this.setState({
        listings: data,
        filterActive: false,
        filteredListings: data,
        categories: [
          { name: 'health-care', selected: false },
          { name: 'environment', selected: false },
          { name: 'youth', selected: false },
          { name: 'social justice', selected: false },
          { name: 'immigration', selected: false },
          { name: 'tech', selected: false },
          { name: 'human rights', selected: false },
          { name: 'homelessness', selected: false },
          { name: 'women', selected: false },
          { name: 'racial justice', selected: false },
          { name: 'housing', selected: false },
          { name: 'animal rights', selected: false },
          { name: 'education', selected: false },
          { name: 'LGTBQ', selected: false },
          { name: 'meetups/events', selected: false },
          { name: 'disability', selected: false },
          { name: 'senior services', selected: false },
          { name: 'policy/gov', selected: false }
        ]
      })
    })
    .catch(err => {
      console.error('error', err)
    });
  }

  render() {
    return (
      <div>
        <a style={{textDecoration: 'none'}} target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdKFCn5ZVsJoeT1Um7UQwt6giQ87qOM9pgwE2Vhdem_Pcwpiw/viewform">
        <div id="post">
          <h3>submit an opportunity</h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216"><path d="M204.3 92.9h-81.2V11.7C123.1 8 118 0 108 0S92.9 8 92.9 11.7v81.2H11.7C8 92.9 0 98 0 108s8 15.1 11.7 15.1h81.2v81.2c0 3.7 5 11.7 15.1 11.7s15.1-8 15.1-11.7v-81.2h81.2c3.7 0 11.7-5 11.7-15.1S208 92.9 204.3 92.9z"/></svg>
        </div>
        </a>
        { this.state.filterActive ?
        <Filter toggleCategory={this.toggleCategory.bind(this)} toggle={this.toggleFilter.bind(this)} active={this.state.filterActive} categories={this.state.categories} />
        : <div onClick={this.toggleFilter.bind(this)} id="filters">
          <h3>filters</h3>
          </div>
        }

        <Listings listings={this.state.filteredListings} opportunity={this.props.params.opportunity}/>
      </div>
    )
  }

}
