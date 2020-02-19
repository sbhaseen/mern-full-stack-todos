import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../redux/actions/itemActions';
import * as types from '../redux/actions/actionTypes';
import moxios from 'moxios';
import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('successfully fetch items from the api', () => {
    const mockData = {
      completed: false,
      _id: '5e27918af21a4d66c1352cec',
      description: 'A test description 1',
      responsible: 'Responsible Person 1',
      priority: 'Low'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [mockData]
        }
      });
    });

    const expectedActions = [
      { type: types.ITEMS_LOADING },
      {
        type: types.GET_ITEMS,
        payload: {
          data: [mockData]
        }
      }
    ];

    const store = mockStore({ items: [] });

    return store.dispatch(actions.getItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('successfully and an items to the database', () => {
    const mockData = {
      description: 'A test description 1',
      responsible: 'Responsible Person 1',
      priority: 'Low'
    };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [mockData]
        }
      });
    });

    const expectedActions = [
      {
        type: types.ADD_ITEM,
        payload: {
          data: [mockData]
        }
      }
    ];

    const store = mockStore({ items: [], auth: { token: 'A good token' } });

    return store.dispatch(actions.addItem()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
