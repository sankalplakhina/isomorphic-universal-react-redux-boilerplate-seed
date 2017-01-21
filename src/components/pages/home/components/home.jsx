/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import style from '../home.less';

class Home extends React.Component {
  render() {
    return (
    	<div className={style.root + ' ' + style.home}>
      		<Helmet title="Home Title"/>
      		{this.props.message}
    		<Link to="/about">Go to About</Link>
    	</div>
    );
  }
}

export default Home;
