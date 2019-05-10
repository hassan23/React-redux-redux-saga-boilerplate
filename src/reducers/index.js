import { combineReducers } from 'redux';

import addTodoReducer from './addTodoReducer';

const rootReducer = combineReducers({
  todos: addTodoReducer
});

export default rootReducer;
