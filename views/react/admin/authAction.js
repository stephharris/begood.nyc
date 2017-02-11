'use strict';

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';

export default class AuthAction extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        isAuthenticated: false,
        sessionToken: {}
      }
      this.setCurrentUser = this.setCurrentUser.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  setCurrentUser(data) {
    // console.log('data', data)
    this.state.isAuthenticated = true;
    this.state.sessionToken = data;
    // this.setState({ isAuthenticated: true , session: data })
  }

  handleSubmit(userData) {
    axios.put('/admin', { user: userData })
    .then( (res) => {
      const token = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      // console.log(jwt.decode(token))
      this.setCurrentUser(jwt.decode(token));
      browserHistory.push('/admin-panel/loggedin');
    })
    .catch( (error) => {
      this.setState({ errors: error.response.data })
    })
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
