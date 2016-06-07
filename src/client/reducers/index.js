/**
 *
 */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import todos from './todos';

const rootReducer = combineReducers({
  routing,
  todos,
});

export default rootReducer;