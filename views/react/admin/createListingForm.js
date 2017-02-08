'use strict';

import React from 'react';
import Part1 from './form-part1';
import Part2 from './form-part2';

export default function (props) {

  const handleEnter = props.handleEnter;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  let input = props.input;

  return (
    <div>
    <div className="createContainer">
      <Part1 input={input} handleChange={handleChange} handleEnter={handleEnter} handleSubmit={handleSubmit}/>
      <Part2 input={input} handleChange={handleChange} handleEnter={handleEnter} handleSubmit={handleSubmit}/>
    </div>
          <button style={{backgroundColor: 'lightblue'}} onClick={handleSubmit}>click me</button>
    </div>
  );

}


//       <button style={{backgroundColor: 'lightblue'}} onClick={handleSubmit}>click me</button>


