'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Filter extends React.Component {

  constructor(props){
    super(props);
  }

        // <Filter filterBy={this.filterBy.bind(this)} active={this.state.filterActive} toggle={this.toggleFilter.bind(this)}/>

  render() {

    return (
      <div>
    { this.props.filterActive ?

        <div id="filters-expanded">
          <h3>health-care</h3>
          <h3>environment</h3>
          <h3>youth</h3>
          <h3>social justice</h3>
          <h3>immigration</h3>
          <h3>tech</h3>
          <h3>human rights</h3>
          <h3>homelessness</h3>
          <h3>women</h3>
          <h3>racial justice</h3>
          <h3>housing</h3>
          <h3>animal rights</h3>
          <h3>education</h3>
          <h3>LGBTQ</h3>
          <h3>meetups/events</h3>
          <h3>disability</h3>
          <h3>senior services</h3>
          <h3>policy/gov</h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.4 162.4"><path d="M138.6 2.5L81.2 59.9 23.8 2.5C21.2-0.2 11.9-2.3 4.8 4.8s-5 16.3-2.4 18.9l57.4 57.4L2.5 138.6c-2.6 2.6-4.7 11.8 2.4 18.9 7.1 7.1 16.3 5 18.9 2.4l57.4-57.4 57.4 57.4c2.6 2.6 11.8 4.7 18.9-2.4 7.1-7.1 5-16.3 2.4-18.9l-57.4-57.4 57.4-57.4c2.6-2.6 4.7-11.8-2.4-18.9C150.5-2.3 141.2-0.2 138.6 2.5z"/></svg>
        </div>
        :  <div id="filters">
           <h3>filters</h3>
           </div>
    }
      </div>
    )
  }

}
