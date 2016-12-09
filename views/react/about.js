import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link } from "react-router";

export default class About extends React.Component {
  render() {
    return (
      <h1>This is the about page</h1>
    )
  }
}


/*  displayListings(list){
    return list ? list.map((item) => {
      return (
        <h3>{ list.company }</h3>
      )
    }) : '';
  } */
 // componentDidMount() {
  //  return fetch('/api/listings')
  //  .then(res => res.json())
   // .then(data => {
   //   this.setState({ listings: data });
   // })
    //.catch(err => console.error('error', err));
  //}

