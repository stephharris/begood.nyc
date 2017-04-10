import React from "react";
import Layout from './layout';
import Footer from './footer';
import Content from './about-content';
import AboutSection from './about-section';

export default class About extends React.Component {

  constructor(){
    super();
  }

  render(){

    return (
      <div>
        <Layout/>
        <div id="aboutBG">
          <div id="about">
            <AboutSection content={Content.section1}/>
            <AboutSection content={Content.section2}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}




