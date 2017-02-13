import React from 'react';
import Component from 'src/js/components/common/component/components/component';

class AppContainer extends React.Component {
  render() {
    return (
    	<div>
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
