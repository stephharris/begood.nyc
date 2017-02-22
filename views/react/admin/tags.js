'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SingleTag from './singleTag';


export default class Tags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags1: [
        'health-care',
        'education',
        'tech',
        'human rights',
        'environment',
        'youth',
        'LGBTQ',
        'women',
        'policy/gov'
      ],
      tags2: [
        'homelessness',
        'racial justice',
        'meetups/events',
        'social justice',
        'animal rights',
        'senior services',
        'immigration',
        'disability',
        'housing'
      ]
    }
  }

  displayAllTags(tags, selectedTags){
    return tags.map( (tag, i) => {
      let checked;
      selectedTags.indexOf(tag) > -1 ? checked = true : checked = false;
      return (
        <div key={i}>
          <SingleTag handleChange={this.props.handleChange} checked={checked} tag={tag}/>
        </div>
      )
    })
  }

  render(){
    return(
    <div className="editadminTags">

      <div className="adminTagsGroup">
      {
        this.displayAllTags(this.state.tags1, this.props.tags)
      }
      </div>
      <div className="adminTagsGroup">
      {
        this.displayAllTags(this.state.tags2, this.props.tags)
      }
      </div>
    </div>
    )
  }

}
