import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import home from '../components/pages/home/reducers/homeReducers';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  home,
});

export default reducers;
