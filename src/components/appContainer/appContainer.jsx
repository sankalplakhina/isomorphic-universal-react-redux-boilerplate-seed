import React from 'react';

import styles from './appContainer.css';

class AppContainer extends React.Component {
  render() {
    return <div className={styles.app}>{this.props.children}</div>;
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
