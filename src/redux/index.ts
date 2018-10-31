import { combineReducers } from 'redux';

import { todoReducer as todo } from './todo';

export const rootReducer = combineReducers({
  todo
});
