/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
    	<div>
    		404 Not Found
    		<Link to="/">Go Home</Link>
    	</div>
    );
  }
}

export default NotFound;
