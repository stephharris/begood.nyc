import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../views/react/listings';
import Listings from '../views/react/listings';
import ListingContracted from '../views/react/listing-contracted';
import ListingExpanded from '../views/react/listing-expanded';

test('Should render 0 Listings as expected', () => {
  const listings = [];
  const component = shallow(<Listings listings={listings}/>)
  const tree = toJson(component)
  expect(component.find(ListingContracted).length).toBe(0);
  expect(component.contains('awaiting more opportunities')).toBe(true)
  expect(tree).toMatchSnapshot();
})

test('Should properly render multiple contracted listings components', () => {
  let opportunity = '';
  const listings = [{
    active: true,
    title: 'Test Title',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123'
  },{
    active: true,
    title: 'Test Title 2',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123'
  }]
  const component = shallow(<Listings opportunity={opportunity} listings={listings}/>)
  const tree = toJson(component)
  expect(component.find(ListingContracted).length).toBe(2)
  expect(tree).toMatchSnapshot();
})

test('Should properly render singular expanded listings component', () => {
  let opportunity = '#Test_Title';
  let testRoute = 'Test_Title';
  let date = new Date();
  const listings = [{
    active: true,
    title: 'Test Title',
    timeCommitment: 'ongoing',
    hours: 'scheduling tbd',
    neighborhood: 'Downtown Brooklyn',
    borough: 'Brooklyn',
    briefDescription: 'testing testing 123',
    route: 'Test_Title'
  }]
  const component = shallow(<Listings testRoute={testRoute} opportunity={opportunity} listings={listings}/>)
  const tree = toJson(component)
  expect(component.find(ListingExpanded).length).toBe(1)
  expect(tree).toMatchSnapshot();
})





