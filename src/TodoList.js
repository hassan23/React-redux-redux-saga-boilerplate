import React from 'react';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';

import {
  addTodoInit,
  toggleInit,
  fetchTodo,
  clearComplete,
  fetchAsync,
  cancelAsync,
  deleteTodoInit
} from './actions';

class TodoList extends React.Component {
  deleteTodoHandler = id => e => {
    console.log(e, id);
    e.stopPropagation();
    this.props.deleteTodoInit(id);
  };

  toggleInitHandler(id) {
    this.props.toggleInit(id);
  }

  render() {
    const {
      todos,
      countdown,
      addTodoInit,
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
              onClick={this.toggleInitHandler.bind(this, todo.id)}
            >
              {todo.text}
              <button onClick={this.deleteTodoHandler(todo.id)}>x</button>
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
  addTodoInit: todo => dispatch(addTodoInit(todo)),
  toggleInit: id => dispatch(toggleInit(id)),
  fetchTodo: () => dispatch(fetchTodo()),
  clearComplete: () => dispatch(clearComplete()),
  fetchAsync: () => dispatch(fetchAsync()),
  cancelAsync: () => dispatch(cancelAsync()),
  deleteTodoInit: id => dispatch(deleteTodoInit(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
