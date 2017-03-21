'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

export default class Success extends React.Component {

  constructor(props){
    super(props);
    this.adminRedirect = this.adminRedirect.bind(this);
    this.homeRedirect = this.homeRedirect.bind(this);
    this.createRedirect = this.createRedirect.bind(this);
  }

  createRedirect(){
    if(window.location.pathname === '/admin-panel/loggedin/submitted-successfully'){
      this.context.router.replace('/admin-panel/loggedin/create');
    }else{
      this.context.router.replace('/submit')
    }
  }

  adminRedirect(){
    this.context.router.replace('/admin-panel/loggedin');
  }

  homeRedirect(){
   this.context.router.replace('/');
  }

  render(){
    return(
      <div>
        <div id="successDescription">
          <h4>Thanks for your submission - </h4>
          <h4>We'll be in touch shortly.</h4>
          <h3>questions? <a href="mailto:steph@begood.nyc?Subject=submitted%20listing%20inquiry" target="_top">email us here</a>.</h3>
          <button id="uno_mas" onClick={this.createRedirect}>submit another</button>
        {
          window.location.pathname === '/admin-panel/loggedin/submitted-successfully' ?
          <button onClick={this.adminRedirect}>back to panel</button>
          :
          <button onClick={this.homeRedirect}>back to home</button>
        }

        </div>
      </div>
    )
  }
}

Success.contextTypes = {
  router: React.PropTypes.object.isRequired
};
