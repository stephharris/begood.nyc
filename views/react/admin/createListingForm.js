import React from 'react';

export default function (props) {

  const handleEnter = props.handleEnter;
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;

  return (
    <div>
    <form onSubmit={handleEnter}>
      <div>
        <label style={{ display: 'block'}}>Enter Name</label>
        <input onChange={handleChange} style={{ border: '.05em solid grey', marginLeft: '1em'}} type="text" name="test" value={props.input} />
      </div>
    </form>
    <button style={{ border: '.05em solid grey', marginLeft: '2em', backgroundColor: 'lightblue'}} onClick={handleSubmit}>click me</button>
    </div>
  );

}
