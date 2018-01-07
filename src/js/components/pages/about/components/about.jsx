import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const About = () => (
  <div className="about-page">
    <Helmet title="About Title" />
    About
    <Link to="/undefined">Go to 404</Link>
  </div>
);

export default About;
