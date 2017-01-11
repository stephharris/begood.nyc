'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Filter extends React.Component {

  constructor(props){
    super(props);
  }

  displayCategories(categories){
    return categories ? categories.map((category, i) => {
      return (
          <div key={i} onClick={ () => {this.props.toggleCategory(category)} }>
          <h3 className={ category.selected ? 'filterSelected' : 'filterDefault'}>{category.name}</h3>
          </div>
      )
    }) : '';
  }

  render() {

    return (
        <div id="filters-expanded" >
        { this.displayCategories(this.props.categories) }
          <svg onClick={this.props.toggle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.4 162.4"><path d="M138.6 2.5L81.2 59.9 23.8 2.5C21.2-0.2 11.9-2.3 4.8 4.8s-5 16.3-2.4 18.9l57.4 57.4L2.5 138.6c-2.6 2.6-4.7 11.8 2.4 18.9 7.1 7.1 16.3 5 18.9 2.4l57.4-57.4 57.4 57.4c2.6 2.6 11.8 4.7 18.9-2.4 7.1-7.1 5-16.3 2.4-18.9l-57.4-57.4 57.4-57.4c2.6-2.6 4.7-11.8-2.4-18.9C150.5-2.3 141.2-0.2 138.6 2.5z"/></svg>
        </div>
    )
  }

}

