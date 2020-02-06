import axios from 'axios';
import { returnErrors } from '../actions/errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './actionTypes';

/**
 * Handle the registration of a new user.
 * @param {Object} newUserData - The data entered to create a new user account.
 * @param {string} newUserData.name - The name of the user.
 * @param {string} newUserData.email - The email of the user.
 * @param {string} newUserData.password - The password of the user.
 */
export function register({ name, email, password }) {
  return dispatch => {
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ name, email, password });

    const postUrl = 'http://localhost:5000/api/users';

    return axios
      .post(postUrl, body, headerConfig)
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch(returnErrors(err));
        dispatch({ type: REGISTER_FAIL });
      });
  };
}

/**
 * Handle the login an existing user.
 * @param {Object} userData - The data of the user attempting to login.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 */
export function login({ email, password }) {
  return dispatch => {
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });

    const postUrl = 'http://localhost:5000/api/auth';

    return axios
      .post(postUrl, body, headerConfig)
      .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
      .catch(err => {
        dispatch(returnErrors(err));
        dispatch({ type: LOGIN_FAIL });
      });
  };
}

/**
 * Handle the logout of a user.
 * A side effect of this is to also clear an exisitng auth token.
 */
export function logout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

/**
 * Verifies that the use is loaded
 */
export function loadUser() {
  const getUrl = 'http://localhost:5000/api/auth/user';

  return (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    return axios
      .get(getUrl, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err));
        dispatch({ type: AUTH_ERROR });
      });
  };
}

/**
 * Sets the authentication token to send to server in a request.
 * @param {function} getState - Redux function to get state objects.
 */
export function tokenConfig(getState) {
  const token = getState().auth.token;

  const headerConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    headerConfig.headers['x-auth-token'] = token;
  }

  return headerConfig;
}
