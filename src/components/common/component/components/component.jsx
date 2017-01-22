/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import style from '../component.less';

class Component extends React.Component {
  render() {
    return (
    	<div className={style.root}>
      		New Component
    		<Link to="/home">Go home</Link>
    	</div>
    );
  }
}

export default Component;
