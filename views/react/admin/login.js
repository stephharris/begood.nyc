'use strict';

import React from 'react';
// import axios from 'axios';
// import { browserHistory } from 'react-router';
// import setAuthorizationToken from './setAuthorizationToken';
// import jwt from 'jsonwebtoken';
import AuthAction from './authAction';


export default class Login extends React.Component {

  constructor(props){
      super(props);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        username: '',
        password: '',
        errors: {},
        isAuthenticated: false,
        session: {}
      }
  }

  // setCurrentUser(data) {
  //   console.log('data', data)
  //   this.setState({ isAuthenticated: true , session: data })
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  revealState() {
    console.log('revealing errors', this.state.errors);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const authAction = new AuthAction;
    authAction.handleSubmit(this.state);
setTimeout(function() {
console.log('authAction', authAction);
}, 20000)
    // axios.put('/admin', { user: this.state })
    // .then( (res) => {
    //   const token = res.data;
    //   localStorage.setItem('jwtToken', token);
    //   setAuthorizationToken(token);
    //   console.log(jwt.decode(token))
    //   this.setCurrentUser(jwt.decode(token));
    //   browserHistory.push('/admin-panel/loggedin');
    // })
    // .catch( (error) => {
    //   this.setState({ errors: error.response.data })
    // })
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
