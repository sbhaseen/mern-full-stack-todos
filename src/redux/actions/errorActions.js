import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

/**
 * Handle the parsing of an error object into the global state.
 * @param {Object} err - The error object to be parsed.
 */
export function returnErrors(err) {
  if (err.response) {
    return {
      type: GET_ERRORS,
      payload: { msg: err.response.data, status: err.response.status }
    };
  } else {
    return {
      type: GET_ERRORS,
      payload: { msg: err, status: 500 }
    };
  }
}

/**
 * A function to clear out any errors in the global state.
 */
export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
