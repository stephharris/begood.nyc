import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import ListingContracted from '../views/react/listing-contracted';

const targetDate = new Date();
const targetDate2 = new Date();

targetDate.setDate(targetDate.getDate() + 3);
targetDate2.setDate(targetDate2.getDate() + 10);

let testListings = [{
    title: 'Test Title',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123',
    expires: '2017-03-15T04:00:00.000Z'
  },{
    title: 'Test Title 2',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123',
    expires: targetDate2
  },{
    title: 'Test Title 2',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123',
    expires: targetDate
  }]

// describe('Test', () => {

//   beforeEach( () => {
//     let TestUtils = React.addons.TestUtils;
//     let today = new Date().toISOString();
//     let listing = testListings[1];
//     let Fn = TestUtils.renderIntoDocument(<ListingContracted listing={listing} pending={true}/>)
//   });

//   it('The compareDates function should return false if a listing\'s expiration date is more than 5 days away from today', () => {
//     Fn.compareDates(today, listing.expires)
//    // let test = new ListingContracted(listing)
//     //const component = renderer.create(<ListingContracted listing={listing} pending={true}/>)
//     console.log('test 1', Fn.compareDates(today, listing.expires));
//   })
// })

test('blah', () => {
  let listing = testListings[1];
  const checkbox = shallow(
    <ListingContracted listing={listing} pending={true}/>
  );

  console.log(checkbox.compareDates())
})

test('If listing expired, component should contain className expired', () => {
    let today = new Date().toISOString();
    let listing = testListings[0];
    const component = renderer.create(<ListingContracted listing={listing} pending={true}/>)
    let tree = component.toJSON();
    expect(tree.props.className).toContain('expired')
  })


test('If listing defaults (within admin), component should contain className adminHover', () => {
  let listing = testListings[1];
  const component = renderer.create(<ListingContracted active={true} admin={true} listing={listing}/>)
  let tree = component.toJSON();
  expect(tree.props.className).toContain('adminHover')
})

test('If listing is expiring soon, component should contain className...', () => {
  let listing = testListings[2];
  console.log(listing.expires)
  const component = renderer.create(<ListingContracted active={true} listing={listing}/>)
  let tree = component.toJSON();
  expect(tree.props.className).toContain('expiringsoon')
})
