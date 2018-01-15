import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AppContainer from './components/appContainer/appContainer';
import Home from './components/pages/home/containers/home';
import About from './components/pages/about/containers/about';
import NotFound from './components/pages/notFound/components/notFound';

export default () => (
  // TODO:  Following approach to be used in case we need
  // to handle routes requiring login

  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }

  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
