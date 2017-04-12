'use strict';

import React from 'react';
import Create from './admin/createListingContainer';
import Layout from './layout';
import Footer from './footer';

export default class Submit extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Layout/>
        <div id="submitDescription">
          <h1 style={{ color: '#ff4d4d' }}>Thanks so much for your interest in contributing.</h1>
          <h1 style={{ margin: '1em 0 1em 0' }}>We're adamant about selecting timely, important and fulfilling NYC-based volunteer opportunities - enabling cause-driven individuals to take charge and really do something positive for the community.</h1>
          <h1 style={{ margin: '1em 0 1em 0' }}>Please reach out using the form below and we’ll be in touch shortly!</h1>
        </div>
        <Create/>
        <Footer/>
      </div>
    )
  }
}
