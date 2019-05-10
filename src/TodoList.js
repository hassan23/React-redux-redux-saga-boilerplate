import React from 'react';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';

import { addTodo, addTodoInit } from './actions';

class TodoList extends React.Component {
  render() {
    const { todos, addTodoInit } = this.props;
    return (
      <div>
        <TodoForm onSubmit={addTodoInit} />
        <div>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ todos }) => ({ todos });
const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  addTodoInit: todo => dispatch(addTodoInit(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
