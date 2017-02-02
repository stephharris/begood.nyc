'use strict';

import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {

  constructor(props){
      super(props);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        username: '',
        password: '',
        errors: false
      }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('/admin', { user: this.state }).then(
    () => {},
    ({ data }) => this.setState({ errors: data })
    );
  }


  render(){
    return(
    <div>
        <h2>Woo! Log in girl.</h2>
        <form onSubmit={this.onSubmit}>
          <label>name</label>
          <input type="text" name="username" style={{ border: '.05em solid grey'}} value={this.state.username} onChange={this.onChange}/>
          <label>password</label>
          <input type="text" name="password" style={{ border: '.05em solid grey'}} value={this.state.password} onChange={this.onChange}/>
          <button style={{backgroundColor: 'lightblue'}}>log in</button>
        </form>
        { this.state.errors && (<h3>Bad Login Info</h3>) }
    </div>
    )
  }


}
