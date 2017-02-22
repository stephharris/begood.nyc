'use strict';

import React from 'react';

export default class SingleTag extends React.Component {

constructor(props){
  super(props);
}

render(){
    return (
      <label className="control">{this.props.tag}
        <input name="tags" onChange={this.props.handleChange} defaultChecked={this.props.checked} value={this.props.tag} type="checkbox"/>
        <div className="controlIndicator"></div>
      </label>
    )
  }
}
