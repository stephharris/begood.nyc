import React from 'react';
import Router from 'react-router';
import { browserHistory } from 'react-router';

// import jwt from 'jsonwebtoken';
// Import your authenticator class here
// import AuthAction from './admin/authAction';
import tokenStore from './admin/tokenStore';

export default class Authenticated extends React.Component {
  render() {
      if (tokenStore.sessionToken === window.localStorage.jwtToken) {
        console.log('comin at ya from the if', tokenStore.sessionToken)
        return this.props.children;
      } else {
        console.log('comin at ya from the else', tokenStore.sessionToken)
        return this.props.children;
        browserHistory.push('/admin-panel');
        return null;
      }
    }
}
