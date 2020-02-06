import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {
  msg: null,
  status: null
};

/**
 * Sets the error state based on the error action function that was invoked.
 * @param {Object} state - The existing state, defaults to initialState.
 * @param {Object} action - The action type which changes the state.
 */
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}
