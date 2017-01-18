/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Link } from 'react-router';

import style from '../about.css';

class About extends React.Component {
  render() {
    return (
    	<div className={style.root}>
    		About
    		<Link to="/undefined">Go to 404</Link>
    	</div>
    );
  }
}

export default About;
