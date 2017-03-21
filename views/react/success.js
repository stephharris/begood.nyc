'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

export default class Success extends React.Component {

  constructor(props){
    super(props);
    this.adminRedirect = this.adminRedirect.bind(this);
    this.homeRedirect = this.homeRedirect.bind(this);
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
        <h3>Success!!</h3>
        {
          window.location.pathname === '/admin-panel/loggedin/submitted-successfully' ?
          <button onClick={this.adminRedirect}>go to admin</button>
          :
          <button onClick={this.homeRedirect}>go back to home</button>
        }
      </div>
    )
  }
}

Success.contextTypes = {
  router: React.PropTypes.object.isRequired
};
