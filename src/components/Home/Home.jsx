/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Link } from 'react-router';

import style from './Home.css';

export default class Home extends React.Component {
  render() {
    return (
    	<div className={style.root}>
    		Home
    		<Link to="/about">Go to About</Link>
    	</div>
    );
  }
}
