'use strict';

import React from 'react';
import Create from './admin/createListingContainer';

export default class Submit extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div id="submitDescription">
          <h4 style={{ color: '#ff4d4d' }}>Thanks so much for your interest in contributing.</h4>
          <h4 style={{ margin: '1em 0 1em 0' }}>At BeGood we’re adamant about selecting important and fulfilling volunteer opportunities right here in New York City- enabling positive people to create a positive impact.</h4>
          <h4 style={{ margin: '1em 0 1em 0' }}>If you/your organization is looking for cause-driven individuals to take charge and make this city a better place to live, reach out using the form below and we’ll be in touch shortly!</h4>
        </div>
        <Create/>
      </div>
    )
  }
}
