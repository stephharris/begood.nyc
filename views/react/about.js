import React from "react";
import Layout from './layout';
import Footer from './footer';
import AboutTheProblemSection from './about-the-problem-section';
import AboutTheMissionSection from './about-the-mission-section';

export default class About extends React.Component {

  constructor(){
    super();
  }

  render(){

    return (
      <div id='test-container'>
        <Layout/>
        <div id="aboutBG">
          <div id="about">
            <AboutTheProblemSection/>
            <AboutTheMissionSection/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}




