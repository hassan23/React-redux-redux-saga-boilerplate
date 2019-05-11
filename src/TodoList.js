import React from 'react';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';

import {
  addTodo,
  addTodoInit,
  toggleInit,
  fetchTodo,
  clearComplete,
  fetchAsync,
  cancelAsync
} from './actions';

class TodoList extends React.Component {
  render() {
    const {
      todos,
      countdown,
      addTodoInit,
      toggleInit,
      fetchTodo,
      clearComplete,
      fetchAsync,
      cancelAsync
    } = this.props;
    return (
      <div>
        <TodoForm onSubmit={addTodoInit} />
        <div>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.complete ? 'line-through' : ''
              }}
              onClick={() => toggleInit(todo.id)}
            >
              {todo.text}
            </li>
          ))}
        </div>
        <button onClick={fetchTodo}>Fetch random todo via API</button>
        <button onClick={clearComplete}>Clear Complete</button>
        <button
          onClick={countdown ? cancelAsync : fetchAsync}
          style={{ color: countdown ? 'red' : 'black' }}
        >
          {countdown ? `Cancel Fetch (${countdown})` : 'Fetch after 5s'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ todos, countdown }) => ({ todos, countdown });
const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  addTodoInit: todo => dispatch(addTodoInit(todo)),
  toggleInit: id => dispatch(toggleInit(id)),
  fetchTodo: () => dispatch(fetchTodo()),
  clearComplete: () => dispatch(clearComplete()),
  fetchAsync: () => dispatch(fetchAsync()),
  cancelAsync: () => dispatch(cancelAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
