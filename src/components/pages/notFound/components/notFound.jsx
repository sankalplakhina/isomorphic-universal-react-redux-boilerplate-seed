/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Link } from 'react-router';

import style from '../notFound.css';

class NotFound extends React.Component {
  render() {
    return (
    	<div className={style.root}>
    		404 Not Found
    		<Link to="/">Go Home</Link>
    	</div>
    );
  }
}

export default NotFound;
