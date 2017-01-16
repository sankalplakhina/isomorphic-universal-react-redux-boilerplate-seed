/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Link } from 'react-router';

import style from './About.css';

export default class About extends React.Component {
  render() {
    return (
    	<div className={style.root}>
    		About
    		<Link to="/">Go to Home</Link>
    	</div>
    );
  }
}
