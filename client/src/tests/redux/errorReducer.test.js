import errorReducer from '../../redux/reducers/errorReducer';
import * as types from '../../redux/actions/actionTypes';

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual({
      msg: null,
      status: null
    });
  });

  it('should handle GET_ERRORS', () => {
    expect(
      errorReducer(
        {},
        {
          type: types.GET_ERRORS,
          payload: { msg: 'An error', status: 400 }
        }
      )
    ).toEqual({
      msg: 'An error',
      status: 400
    });

    expect(
      errorReducer(
        {
          msg: 'Error 1',
          status: 400
        },
        {
          type: types.GET_ERRORS,
          payload: { msg: 'Error 2', status: 500 }
        }
      )
    ).toEqual(
      {
        msg: 'Error 2',
        status: 500
      },
      {
        msg: 'Error 1',
        status: 400
      }
    );
  });

  it('should handle CLEAR_ERRORS', () => {
    expect(
      errorReducer(
        {},
        {
          type: types.CLEAR_ERRORS
        }
      )
    ).toEqual({
      msg: null,
      status: null
    });

    expect(
      errorReducer(
        {
          msg: 'Error',
          status: 400
        },
        {
          type: types.CLEAR_ERRORS
        }
      )
    ).toEqual(
      {
        msg: null,
        status: null
      },
      {
        msg: 'Error',
        status: 400
      }
    );
  });
});
