import { ADD_TODO, ADD_TODO_INIT } from '../const';

const addTodo = todo => ({ type: ADD_TODO, todo });

const addTodoInit = todo => ({ type: ADD_TODO_INIT, todo });

export { addTodo, addTodoInit };
