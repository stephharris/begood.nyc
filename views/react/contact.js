import React from "react";
import Layout from './layout';
import Footer from './footer';

const Contact = () => {
  return (
      <div>
        <Layout/>
        <div id="contact">
          <div>
          <h1 style={{ margin: '1em 0 1em 0' }}>
           This is for all the New Yorkers who want to do something physical to help & just don't know where to start...
          </h1>
          <h3>questions? <a href="mailto:steph@begood.nyc?Subject=submitted%20listing%20inquiry" target="_top">email us here</a>.</h3>
          </div>
        </div>
        <Footer/>
      </div>
  );
};

export default Contact;


