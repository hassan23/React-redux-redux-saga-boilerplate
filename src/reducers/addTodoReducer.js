import { ADD_TODO } from '../const';

const addTodoReducer = (state = [], action) => {
  if (action.type === ADD_TODO) {
    return [...state, action.todo];
  }
  return state;
};

export default addTodoReducer;
