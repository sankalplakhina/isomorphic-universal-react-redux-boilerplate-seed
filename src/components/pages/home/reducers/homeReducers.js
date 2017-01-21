import * as ACTIONS from '../actions/homeActionTypes';

const initialState = {
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIONS.LOAD:
      return {
        loaded: false,
        loading: true,
        data: {}
      };
    case ACTIONS.LOAD_SUCCESS:
      return {
        loaded: true,
        loading: false,
        data: action.data
      };
    case ACTIONS.LOAD_FAIL:
      return {
        loaded: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}