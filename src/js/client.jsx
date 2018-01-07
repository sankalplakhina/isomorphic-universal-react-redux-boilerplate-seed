import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store/createStore';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

const client = new ApiClient();
const dest = global.document.getElementById('root');
const store = createStore(client, browserHistory, global.serverData);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router
    history={history}
    render={
      (props) =>
        <ReduxAsyncConnect
          {...props}
          helpers={{ client }}
          filter={item => !item.deferred}
        />
      }
    >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  global.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    // eslint-disable-next-line no-console
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !global.devToolsExtension) {
  const DevTools = require('./components/devTools');

  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
