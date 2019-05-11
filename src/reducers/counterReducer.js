import { FETCH_ASYNC, CANCEL_ASYNC } from '../const';

export default function counterReducer(state = 0, action) {
  switch (action.type) {
    case FETCH_ASYNC:
      return action.value;
    case CANCEL_ASYNC:
      return 0;
    default:
      return 0;
  }
}
