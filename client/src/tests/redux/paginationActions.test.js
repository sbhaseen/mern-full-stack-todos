import * as actions from '../../redux/actions/paginationActions';
import * as types from '../../redux/actions/actionTypes';
import expect from 'expect';

describe('pagination actions', () => {
  it('should get the next page', () => {
    const expectedAction = {
      type: types.GET_NEXT_PAGE
    };

    expect(actions.getNextPage()).toEqual(expectedAction);
  });

  it('should get the previous page', () => {
    const expectedAction = {
      type: types.GET_PREV_PAGE
    };

    expect(actions.getPrevPage()).toEqual(expectedAction);
  });

  it('should get the previous page', () => {
    const itemLimit = 10;

    const expectedAction = {
      type: types.SET_PAGE_ITEM_LIMIT,
      payload: itemLimit
    };

    expect(actions.setPageItemLimit(itemLimit)).toEqual(expectedAction);
  });
});
