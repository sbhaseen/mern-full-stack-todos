import * as actions from '../../redux/actions/errorActions';
import * as types from '../../redux/actions/actionTypes';
import expect from 'expect';

describe('error actions', () => {
  it('should return an err.response object', () => {
    const err = { response: { data: 'Response error', status: 400 } };

    const expectedAction = {
      type: types.GET_ERRORS,
      payload: {
        msg: err.response.data,
        status: err.response.status
      }
    };

    expect(actions.returnErrors(err)).toEqual(expectedAction);
  });

  it('should return an err.request object', () => {
    const err = { request: 'Request error' };

    const expectedAction = {
      type: types.GET_ERRORS,
      payload: {
        msg: err.request,
        status: 400
      }
    };

    expect(actions.returnErrors(err)).toEqual(expectedAction);
  });

  it('should return an err.message object', () => {
    const err = { message: 'Internal error' };

    const expectedAction = {
      type: types.GET_ERRORS,
      payload: {
        msg: err.message,
        status: 500
      }
    };

    expect(actions.returnErrors(err)).toEqual(expectedAction);
  });

  it('should invoke CLEAR_ERRORS', () => {
    const expectedAction = {
      type: types.CLEAR_ERRORS
    };

    expect(actions.clearErrors()).toEqual(expectedAction);
  });
});
