import authReducer from '../redux/reducers/authReducer';
import * as types from '../redux/actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      isAuthenticated: null,
      isLoading: false,
      user: null
    });
  });

  it('should handle USER_LOADING', () => {
    expect(
      authReducer(
        {},
        {
          type: types.USER_LOADING
        }
      )
    ).toEqual({
      isLoading: true
    });
  });

  it('should handle USER_LOADED', () => {
    expect(
      authReducer(
        {},
        {
          type: types.USER_LOADED,
          payload: { id: 'userId', name: 'User Name', email: 'test@email.com' }
        }
      )
    ).toEqual({
      isAuthenticated: true,
      isLoading: false,
      user: { id: 'userId', name: 'User Name', email: 'test@email.com' }
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(
        {},
        {
          type: types.LOGIN_SUCCESS,
          payload: {
            token: 'valid token'
          }
        }
      )
    ).toEqual({
      token: 'valid token',
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      authReducer(
        {},
        {
          type: types.REGISTER_SUCCESS,
          payload: {
            token: 'valid token'
          }
        }
      )
    ).toEqual({
      token: 'valid token',
      isAuthenticated: true,
      isLoading: false
    });
  });

  it('should handle AUTH_ERROR', () => {
    expect(
      authReducer(
        {},
        {
          type: types.AUTH_ERROR
        }
      )
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      authReducer(
        {},
        {
          type: types.LOGIN_FAIL
        }
      )
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer(
        {},
        {
          type: types.LOGOUT_SUCCESS
        }
      )
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });

    expect(
      authReducer(
        {
          token: 'valid token',
          user: 'Test User',
          isAuthenticated: true
        },
        {
          type: types.LOGOUT_SUCCESS
        }
      )
    ).toEqual(
      {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      },
      {
        token: 'valid token',
        user: 'Test User',
        isAuthenticated: true
      }
    );
  });

  it('should handle REGISTER_FAIL', () => {
    expect(
      authReducer(
        {},
        {
          type: types.REGISTER_FAIL
        }
      )
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  });
});
