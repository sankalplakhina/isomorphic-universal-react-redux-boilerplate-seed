import React from 'react';
import { app } from './styles/appContainer.less';

class AppContainer extends React.Component {
  render() {
    return (
    	<div className={app}>
    		{this.props.children}
    	</div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
