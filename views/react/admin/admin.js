'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Match } from 'react-router';
import Pending from './pending';

export default class Admin extends React.Component {

  constructor(){
    super();
    this.state = {
      pending: [],
      selected: 'pending'
    }
  }

  toggleSelected(value){
    this.setState({ selected: value })
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

  displayComponent(){
    if(this.state.selected === 'pending'){
      return (
        <div>
        <Pending pending={this.state.pending}/>
        </div>
      )
    }
    else if(this.state.selected === 'create'){
      return (
        <div>
        <h3>woooo create page</h3>
        </div>
      )
    }
    else if(this.state.selected === 'active'){
      return (
        <div>
        <h3>woooo active page</h3>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
      <div className="adminNav">
        <h3 onClick={ this.toggleSelected.bind(this, 'create') }>create</h3>
        <h3 onClick={ this.toggleSelected.bind(this, 'pending') }>pending</h3>
        <h3 onClick={ this.toggleSelected.bind(this, 'active') }>active</h3>
      </div>
        { this.displayComponent() }
      </div>
    )
  }

}
