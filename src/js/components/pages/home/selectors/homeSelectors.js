export const homeDataSelector = state => state.home.data || {};

export const homeMessageSelector = state => homeDataSelector(state).message || '';
