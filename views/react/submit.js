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
          <h4 style={{ color: '#ff4d4d' }}>Thanks so much for your interest in contributing.</h4>
          <h4 style={{ margin: '1em 0 1em 0' }}>At BeGood we’re adamant about selecting important and fulfilling volunteer opportunities right here in New York City- enabling positive people to create a positive impact.</h4>
          <h4 style={{ margin: '1em 0 1em 0' }}>If your organization or program is looking for cause-driven individuals to take charge and make this city a better place to live, please reach out using the form below and we’ll be in touch shortly!</h4>
        </div>
        <Create/>
        <Footer/>
      </div>
    )
  }
}
