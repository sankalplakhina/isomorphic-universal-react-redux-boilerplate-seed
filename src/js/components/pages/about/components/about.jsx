import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class About extends React.Component {
  render() {
    return (
    	<div className="about-page">
      		<Helmet title="About Title"/>
    		Aboutp
    		<Link to="/undefined">Go to 404</Link>
    	</div>
    );
  }
}

export default About;
