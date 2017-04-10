'use strict';

import React from 'react';
import { browserHistory } from 'react-router';


export default function Logout() {
  console.log('woo logging out')
  localStorage.removeItem('token');
  browserHistory.replace('/admin-panel');
}
