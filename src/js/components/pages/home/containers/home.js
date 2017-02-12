import { asyncConnect } from 'redux-connect';
import { homeMessageSelector } from '../selectors/homeSelectors';
import { load } from '../actions/homeActions';
import Home from '../components/home';

const asyncProps = {
    promise: ({ store: { dispatch, getState } }) => {
    	const state = getState();
    	if (!state.home.loaded) {
    		return dispatch(load());
    	}
    	return null;
    }
};

function mapStateToProps(state) {
  	return {
  		message: homeMessageSelector(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default asyncConnect([asyncProps], mapStateToProps, mapDispatchToProps)(Home);