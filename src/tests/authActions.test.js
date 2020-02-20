import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../redux/actions/authActions';
import * as types from '../redux/actions/actionTypes';
import moxios from 'moxios';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should successfully register a new user', () => {
    const mockData = {
      name: 'Test User',
      email: 'test@email.com',
      password: 'pass'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            id: 'a new id string',
            name: mockData.name,
            email: mockData.email
          }
        }
      });
    });

    const expectedActions = [
      {
        type: types.REGISTER_SUCCESS,
        payload: {
          data: {
            id: 'a new id string',
            name: mockData.name,
            email: mockData.email
          }
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.register(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an error if it fails to register a new user', () => {
    const mockData = {
      name: 'Test User',
      email: 'test@email.com',
      password: 'pass'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          err: 'Failed to register user.'
        }
      });
    });

    const expectedActions = [
      {
        type: types.GET_ERRORS,
        payload: {
          msg: {
            err: 'Failed to register user.'
          },
          status: 400
        }
      },
      {
        type: types.REGISTER_FAIL
      }
    ];

    const store = mockStore({
      auth: {
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.register(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should successfully login an existing user', () => {
    const mockData = {
      email: 'test@email.com',
      password: 'pass'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token: 'a good token',
          id: 'userID string',
          name: 'Test User',
          email: 'test@email.com'
        }
      });
    });

    const expectedActions = [
      {
        type: types.LOGIN_SUCCESS,
        payload: {
          token: 'a good token',
          id: 'userID string',
          name: 'Test User',
          email: 'test@email.com'
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.login(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an error if it fails to login an existing user', () => {
    const mockData = {
      email: 'failing@email.com',
      password: 'notPassing'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          err: 'Invalid credentials'
        }
      });
    });

    const expectedActions = [
      {
        type: types.GET_ERRORS,
        payload: {
          msg: { err: 'Invalid credentials' },
          status: 401
        }
      },
      { type: types.LOGIN_FAIL }
    ];

    const store = mockStore({
      auth: {
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.login(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should successfully logout a user', () => {
    const expectedAction = {
      type: types.LOGOUT_SUCCESS
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it('should load a user if an existing token is still valid', () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          id: 'userID string',
          name: 'Test User',
          email: 'test@email.com'
        }
      });
    });

    const expectedActions = [
      { type: types.USER_LOADING },
      {
        type: types.USER_LOADED,
        payload: {
          id: 'userID string',
          name: 'Test User',
          email: 'test@email.com'
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: 'a valid token',
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not load a user and return an error if a user does not have a valid token', () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          err: 'Invalid token'
        }
      });
    });

    const expectedActions = [
      { type: types.USER_LOADING },
      {
        type: types.GET_ERRORS,
        payload: {
          msg: { err: 'Invalid token' },
          status: 401
        }
      },
      { type: types.AUTH_ERROR }
    ];

    const store = mockStore({
      auth: {
        token: 'a valid token',
        isAuthenticated: null,
        isLoading: false,
        user: null
      }
    });

    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
