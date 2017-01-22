import React from 'react';
import Component from '~/src/components/common/component/components/component';
import { app } from './styles/appContainer.less';

class AppContainer extends React.Component {
  render() {
    return (
    	<div className={app}>
    		{this.props.children}
    		<Component />
    	</div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
