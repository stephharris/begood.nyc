'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Pending from './pending';
import Expired from './expired';
import Active from './active';
import Create from './createListingContainer';
import Logout from './logout';
import axios from 'axios';

export default class Admin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pending: [],
      selected: 'pending',
      active: [],
      expired: []
    }
  }

  toggleSelected(value){
    this.setState({ selected: value });
    value === 'active' ? this.FetchActiveListings() : '';
    value === 'expired' ? this.FetchExpiredListings() : '';
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

  FetchExpiredListings() {
    return fetch('/admin/expired')
    .then( res => res.json())
    .then( data => {
      this.setState({ expired: data })
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
      this.handleRoute()
      return (
        <div>
        <Create/>
        </div>
      )
    }
    else if(this.state.selected === 'expired'){
      return (
        <div>
          <Expired expired={this.state.expired}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
      <button onClick={Logout}>logout</button>
      <div className="adminNav">
        <button className={this.state.selected === 'create' ? 'active' : ''} onClick={ this.toggleSelected.bind(this,'create')}>create</button>
        <button className={this.state.selected === 'pending' ? 'active' : ''} onClick={ this.toggleSelected.bind(this, 'pending')}>pending</button>
        <button className={this.state.selected === 'active' ? 'active' : ''} onClick={ this.toggleSelected.bind(this, 'active')}>active</button>
        <button className={this.state.selected === 'expired' ? 'active' : ''} onClick={this.toggleSelected.bind(this, 'expired')}>expired</button>
      </div>
        { this.displayComponent() }
      </div>
    )
  }

}
