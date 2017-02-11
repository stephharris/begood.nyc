import React from 'react';
import Router from 'react-router';

import jwt from 'jsonwebtoken';

// Import your authenticator class here
// import AuthAction from './admin/authAction';

const isLoggedIn = true

export default class Authenticated extends React.Component {
  // componentDidMount() {
  //   if (!isLoggedIn) {
  //     // browserHistory.push('/admin-panel'
  //     window.location.href = 'google.com'
  //   }
  // }

  isLoggedIn() {
// session_token = 12345 > stephanieId
    // if (AuthAction.sessionToken === window.localStorage.jwtToken) {
    //   return true
    // } else {
    //   return false
    // }
    // window.localStorage.jwtToken = ;
    return false
  }

  render() {
    if (this.isLoggedIn()) {
      return this.props.children
    } else {
      window.location.href = 'http://localhost:3001'
      // null
    }
  }
}
