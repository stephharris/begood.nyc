'use strict';

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
// import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';
// import tokenStore from './tokenStore';


export default class Login extends React.Component {

  constructor(props){
      super(props);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        username: '',
        password: '',
        errors: {}
      }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }



  onSubmit(e) {
    e.preventDefault();
    axios.put('/admin/login', { user: this.state })
    .then( (res) => {
      console.log('res data', res.data)
      const token = res.data;
      localStorage.setItem('token', JSON.stringify(token));
      this.setState({ errors: {} });
      // console.log('auth action token', jwt.decode(token))
      browserHistory.push('/admin-panel/loggedin');
    })
    .catch( (error) => {
      this.setState({ errors: error.response.data })
    })
  }



  render(){
    return(
    <div>
          <form onSubmit={this.onSubmit}>
            <label>name</label>
            <input type="text" name="username" style={{ border: '.05em solid grey'}} value={this.state.username} onChange={this.onChange}/>
            <label>password</label>
            <input type="text" name="password" style={{ border: '.05em solid grey'}} value={this.state.password} onChange={this.onChange}/>
            <button style={{backgroundColor: 'lightblue'}}>log in</button>
          </form>
          { Object.keys(this.state.errors).length !== 0 ?

            <div>
            <h3>{ this.state.errors.username }</h3>
            <h3>{ this.state.errors.password }</h3>
            </div>
            : '' }
    </div>
    )
  }


}
