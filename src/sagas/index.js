import { ADD_TODO, ADD_TODO_INIT } from '../const';
import { all, put, take, fork } from 'redux-saga/effects';

function* initaddTodo(todo) {
  yield put({ type: ADD_TODO, todo });
}
function* watchAddTodo() {
  while (true) {
    const action = yield take(ADD_TODO_INIT, initaddTodo);
    yield fork(initaddTodo, action.todo);
  }
}

export default function* rootSaga() {
  yield all([watchAddTodo()]);
}
