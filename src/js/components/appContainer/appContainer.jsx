import React from 'react';

const AppContainer = ({ children }) => (
  <div>
    {children}
  </div>
    );

AppContainer.propTypes = {
  children: React.PropTypes.object,
};

export default AppContainer;
