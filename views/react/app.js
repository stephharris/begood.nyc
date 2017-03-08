'use strict';

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Authenticated from './authenticated';
import Home from './home';
import About from './about';
import Contact from './contact';
import Admin from './admin/admin.js';
import Login from './admin/login.js';
import Create from './admin/createListingContainer';

/********************
If you aren't going to use redux think about changing token store to be window global starting from app.js
which is  parent to all other routes and all other routes need to access same object.
If you keep importing tokenStore, you will create new instances possibly.

window.tokenStore = tokenStore

if refresh -
localstorage with token
first before window.tokenStore = require tokenStore
do check if localstorage contains token store
then if you require token store, you replace whatever is in the logged in token store
with what is on localStorage, if noting in local storage, then it's treated as new store

********************/

// import setAuthorizationToken from './admin/setAuthorizationToken';

// if(localStorage.jwtToken){
//   setAuthorizationToken(localStorage.jwtToken);
// }

{/* Take a look at onEnter={function} for react router if you need to do a check before you go to a route */}

/*********************************************
function onEnter(token){
  if (tokenStore.token){

  }
}
const authTransition = function authTransition(nextState, replace, callback) {
  const state = store.getState()
  const user = state.user

  // todo: in react-router 2.0, you can pass a single object to replace :)
  if (!user.isAuthenticated) {
    replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
  }

  callback()
}
*********************************************/

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 1);
  }
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path='/admin-panel' component={AdminLayout}>
            <IndexRoute component={Login} />
            <Route component={Authenticated}>
              <Route path='/admin-panel/loggedin' component={Admin}/>
              <Route path='/admin-panel/loggedin/create' component={Create}/>
            </Route>
          </Route>
          <Route path='/' component={Layout} onEnter={hashLinkScroll}>
            <IndexRoute component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/(:opportunity)' component={Home}/>
          </Route>
      </Router>
    )
  }
}

/*****************************
These bottom two feel like they should be in two different files
******************************/

const AdminLayout = (props) => (
  <div>
    <header>
      <div id="lockup">
        <Link to="/admin-panel">
        <h1>BEGOOD</h1>
          <h1 className="NYC"><span className="dot">.</span>NYC</h1>
          <h3 className="byline">curated local volunteer opportunities</h3>
        </Link>
      </div>
    </header>
    { props.children }
  </div>
);


const Layout = (props) => (
  <div>
    <header>
      <div id="lockup"><Link to="/">
        <h1>BEGOOD</h1>
        <h1 className="NYC"><span className="dot">.</span>NYC</h1>
        <h3 className="byline">curated local volunteer opportunities</h3>
      </Link>
      </div>
      <div id="nav">
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
      </div>
    </header>
    {props.children}
  </div>
);

export default App;
