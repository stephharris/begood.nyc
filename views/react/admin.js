import React from 'react';
import ReactDOM from 'react-dom';

export default class Admin extends React.Component {

  constructor(){
    super();
    this.state = {
      pending: {}
    }
  }

  // displayPending(listings){
  //   return listings.map((listing, i) => {
  //     return (
  //       <div key={i}>
  //         <h3>{ listing.title }</h3>
  //       <div>
  //     )
  //   });
  // }

  componentDidMount() {
    fetch('/admin/pending')
    .then(res => res.json())
    .then(data => {
      console.log('data', data)
      this.setState({
        pending: data[0]
      })
    })
    .catch(err => {
      console.error('error', err)
    })
  }

  render() {
    console.log('inside render function', this.state.pending.title)
    return (
      <div>
        <h3>rendering admin panel!</h3>
        <h3>{ this.state.pending.title }</h3>
      </div>
    )
  }

}
