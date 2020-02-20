import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

/**
 * Handle the parsing of a returned API error object into the global state.
 * Since it is invoked on API call catch methods, this is based on the pattern for axios error parsing.
 * See: https://github.com/axios/axios - Handling Errors section.
 * @param {Object} err - The error object to be parsed.
 */
export function returnErrors(err) {
  if (err.response) {
    return {
      type: GET_ERRORS,
      payload: { msg: err.response.data, status: err.response.status }
    };
  } else if (err.request) {
    return {
      type: GET_ERRORS,
      payload: { msg: err.request, status: 400 }
    };
  } else {
    return {
      type: GET_ERRORS,
      payload: { msg: err.message, status: 500 }
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
