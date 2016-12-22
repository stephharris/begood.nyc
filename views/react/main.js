'use strict';

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

// import About from './about.js';
// import AddOpportunity from './add-opportunity.js';
import Listings from './listings.js';

class Main extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      // defining our routes here
      // <Router history={hashHistory}> // tells browser to look at the front-end for routes
      //   <Route path={"/"} component={Listings} />
      //   <Route path={"/about"} component={About} />
      //   <Route path={"/add-opportunity"} component={AddOpportunity} />
      // </Router>
      <div>
      <Listings/>
      </div>
    )
  }
}

export { Main };
