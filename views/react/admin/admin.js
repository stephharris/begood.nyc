'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Pending from './pending';
import Active from './active';
import Create from './createListingContainer';
import axios from 'axios';

export default class Admin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pending: [],
      selected: 'pending',
      active: []
    }
  }

  toggleSelected(value){
    this.setState({ selected: value });
    this.FetchActiveListings();
  }

  isActive(value) {
    return (value === this.state.selected) ? 'adminNavActive' : '';
  }


  componentDidMount() {
    fetch('/admin/pending')
    .then(res => res.json())
    .then(data => {
      this.setState({ pending: data })
    })
    .catch(err => {
      console.error('error', err)
    })
  }

  FetchActiveListings() {
  return fetch('/api')
    .then(res => res.json())
    .then(data => {
      this.setState({ active: data })
    })
    .catch(err => {
      console.error('error', err)
    })
  }

  handleRoute() {
    browserHistory.push('/admin-panel/loggedin/create');
  }


  displayComponent(){
    if(this.state.selected === 'pending'){
      return (
        <div>
        <Pending pending={this.state.pending}/>
        </div>
      )
    }
    else if(this.state.selected === 'active'){
      return (
        <div>
        <Active active={this.state.active}/>
        </div>
      )
    }
    else if(this.state.selected === 'create'){
      this.handleRoute();
      return (
        <div>
        <Create/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
      <div className="adminNav">
        <h3 className={ this.isActive('create')} onClick={ this.toggleSelected.bind(this,'create') }>create</h3>
        <h3 className={this.isActive('pending')} onClick={ this.toggleSelected.bind(this, 'pending') }>pending</h3>
        <h3 className={this.isActive('active')} onClick={ this.toggleSelected.bind(this, 'active') }>active</h3>
      </div>
        { this.displayComponent() }
      </div>
    )
  }

}
