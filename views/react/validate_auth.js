'use strict';

import React from 'react';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Logout from './admin/logout';


export default function Verify() {
  if(localStorage.token){
    console.log('got to the verify function')
    //let token = JSON.parse(localStorage.getItem("token"));
    axios.put('/admin/verify', { token: localStorage.token })
    .then( () => {
       return true;
    })
    .catch( (err) => {
      return Logout();
    })
    // console.log('payload', jwt.decode(localStorage.token.token))
  }else{
    console.log('ooopsies')
    browserHistory.replace('/admin-panel');
    return false;
  }
}
