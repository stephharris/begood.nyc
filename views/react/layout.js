'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router';
import Footer from './footer';


export default class Layout extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    if(window.location.pathname === '/' || window.location.pathname === '/submit') {
      return (
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
          { this.props.children }
        </div>
      )
    }

    else if(window.location.pathname === '/contact' || window.location.pathname === '/submit/success'){

      let strikethrough;
      window.location.pathname === '/contact' ? strikethrough = { textDecoration: 'line-through'} : '';

      return (
        <div>
          <header className="contactHeader">
            <div id="lockup"><Link to="/">
              <h1>BEGOOD</h1>
              <h1 className="NYC"><span className="dot">.</span>NYC</h1>

            </Link>
            </div>
            <div id="nav">
              <Link to="/about">about</Link>
              <Link style={strikethrough} to="/contact">contact</Link>
            </div>
          </header>
          { this.props.children }
        </div>
      )
    }

    else if(window.location.pathname === '/about'){
      return (
        <div className="aboutHeader">
          <header>
            <div id="lockup"><Link to="/">
              <h1>BEGOOD</h1>
              <h1 className="NYC"><span className="dot">.</span>NYC</h1>
            </Link>
            </div>
            <div id="nav">
              <Link style={{ textDecoration: 'line-through'}} to="/about">about</Link>
              <Link to="/contact">contact</Link>
            </div>
          </header>
          { this.props.children }
        </div>
      )
    }

  }

}
