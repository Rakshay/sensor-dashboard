import { createStore, combineReducers, compose } from 'redux';
import * as reducers from '../reducers/index';
import defaultState from './defaultState';

const reducer = combineReducers({
  archive: reducers.probe1Archiver,
  active: reducers.probe1Logger
});

const store = createStore(reducer, defaultState, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
