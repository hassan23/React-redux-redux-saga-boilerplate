import { ADD_TODO, TOGGLE_TODO, CLEAR_COMPLETE, DELETE_TODO } from '../const';

const addTodoReducer = (state = [], action) => {
  if (action.type === ADD_TODO) {
    return [...state, action.todo];
  } else if (action.type === TOGGLE_TODO) {
    state.forEach(todo => {
      if (todo.id === action.id) {
        todo.complete = !todo.complete;
      }
    });
    return [...state];
  } else if (action.type === CLEAR_COMPLETE) {
    return state.filter(todo => !todo.complete);
  } else if (action.type === DELETE_TODO) {
    return state.filter(todo => action.id !== todo.id);
  }
  return state;
};

export default addTodoReducer;
