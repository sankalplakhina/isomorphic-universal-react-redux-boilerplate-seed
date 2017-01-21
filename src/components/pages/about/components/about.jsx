/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import style from '../about.css';

class About extends React.Component {
  render() {
    return (
    	<div className={style.root}>
      		<Helmet title="About Title"/>
    		Aboutp
    		<Link to="/undefined">Go to 404</Link>
    	</div>
    );
  }
}

export default About;
