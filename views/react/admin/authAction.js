'use strict';

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';
import tokenStore from './tokenStore';

export default class AuthAction extends React.Component {

  constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  // setCurrentUser(data) {
  //   // console.log('data', data)
  //   this.state.isAuthenticated = true;
  //   this.state.sessionToken = data;
  //   // this.setState({ isAuthenticated: true , session: data })
  // }

  handleSubmit(userData) {
    axios.put('/admin', { user: userData })
    .then( (res) => {
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      tokenStore.sessionToken = token;
      // console.log('auth action token', jwt.decode(token))
      this.setCurrentUser(token);
      browserHistory.push('/admin-panel/loggedin');
      return;
    })
    .catch( (error) => {
      tokenStore.errors = error.response.data;
      // this.setState({ errors: error.response.data })
    })
  }

  render(){
    return (null)
  }
}

// THIS IS FOR CREATING A STORE
// export default function AuthAction() {
//   this.state = {};
// }
//
// AuthAction.prototype.setCurrentUser(data) = function() {
//   // console.log('data', data)
//   this.state.isAuthenticated = true;
//   this.state.sessionToken = data;
//   // this.setState({ isAuthenticated: true , session: data })
// }
//
// AuthAction.prototype.handleSubmit(userData) = function() {
//   axios.put('/admin', { user: userData })
//   .then( (res) => {
//     const token = res.data;
//     localStorage.setItem('jwtToken', token);
//     setAuthorizationToken(token);
//     // console.log(jwt.decode(token))
//     this.setCurrentUser(jwt.decode(token));
//     browserHistory.push('/admin-panel/loggedin');
//   })
//   .catch( (error) => {
//     this.setState({ errors: error.response.data })
//   })
// }

