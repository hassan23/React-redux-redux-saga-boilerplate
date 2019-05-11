import { combineReducers } from 'redux';

import addTodoReducer from './addTodoReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  todos: addTodoReducer,
  countdown: counterReducer
});

export default rootReducer;
