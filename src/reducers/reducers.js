import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// root reducer
const reducers = combineReducers({
  routing: routerReducer,
});

export default reducers;