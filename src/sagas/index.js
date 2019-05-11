import {
  ADD_TODO_INIT,
  TOGGLE_INIT,
  FETCH_TODO,
  FETCH_ASYNC,
  CANCEL_ASYNC
} from '../const';

import { addTodo, toggleTodo, cancelAsync } from '../actions';
import {
  all,
  put,
  take,
  fork,
  takeEvery,
  call,
  race,
  cancelled
} from 'redux-saga/effects';

import { eventChannel, END } from 'redux-saga';

const fetchRandonTodo = async () => {
  const response = await fetch('https://api.randomuser.me/');
  const data = await response.json();
  const [item] = data.results;
  return {
    id: String(Math.random()),
    text: item.name.first,
    complete: false
  };
};

function* initaddTodo(todo) {
  yield put(addTodo(todo));
}
function* watchAddTodo() {
  while (true) {
    const action = yield take(ADD_TODO_INIT);
    yield fork(initaddTodo, action.todo);
  }
}

function* initToggle(id) {
  yield put(toggleTodo(id));
}

function* watchToggleTodo() {
  while (true) {
    const action = yield take(TOGGLE_INIT);
    yield fork(initToggle, action.id);
  }
}
function* fetchTodo() {
  const todo = yield call(fetchRandonTodo);
  yield put(addTodo(todo));
}
function* watchFetchTodo() {
  yield takeEvery(FETCH_TODO, fetchTodo);
}

export const countdown = secs => {
  console.log('countdown', secs);
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1;
      console.log('countdown', secs);
      if (secs > 0) listener(secs);
      else {
        listener(END);
        clearInterval(iv);
        console.log('countdown terminated');
      }
    }, 1000);
    return () => {
      clearInterval(iv);
      console.log('countdown cancelled');
    };
  });
};

export function* fetchAsync({ value }) {
  const chan = yield call(countdown, value);
  try {
    while (true) {
      let seconds = yield take(chan);
      yield put({ type: FETCH_ASYNC, value: seconds });
    }
  } finally {
    if (!(yield cancelled())) {
      const todo = yield call(fetchRandonTodo);
      yield put(addTodo(todo));
      yield put(cancelAsync());
    }
    chan.close();
  }
}

function* watchFetchAsync() {
  try {
    while (true) {
      const action = yield take(FETCH_ASYNC);
      yield race([call(fetchAsync, action), take(CANCEL_ASYNC)]);
    }
  } finally {
    console.log('Async Terminated');
  }
}

export default function* rootSaga() {
  yield all([
    watchAddTodo(),
    watchToggleTodo(),
    watchFetchTodo(),
    watchFetchAsync()
  ]);
}
