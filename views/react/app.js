'use strict';

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Home from './home';
import About from './about';
import Contact from './contact';
import Admin from './admin/admin.js';
import Login from './admin/login.js';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
          <Route path='/admin-panel' component={AdminLayout}>
            <IndexRoute authorize={['user', 'admin']} component={Login} />
            <Route authorize={['admin']} path='/admin-panel/loggedin' component={Admin} />
          </Route>
          <Route path='/' component={Layout}>
            <IndexRoute authorize={['user', 'admin']} component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/(:opportunity)' component={Home}/>
          </Route>
      </Router>
    )
  }
}

const AdminLayout = (props) => (
  <div>
    <header>
      <div id="lockup"><Link to="/admin-panel">
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
