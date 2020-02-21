import paginationReducer from '../../redux/reducers/paginationReducer';
import * as types from '../../redux/actions/actionTypes';

describe('pagination reducer', () => {
  it('should return the initial state', () => {
    expect(paginationReducer(undefined, {})).toEqual({
      currentPage: 1,
      itemLimit: 5,
      previousPage: undefined,
      nextPage: undefined,
      total: {},
      isLoading: false
    });
  });

  it('should handle GET_ITEMS', () => {
    expect(
      paginationReducer(
        {},
        {
          type: types.GET_ITEMS,
          payload: { previous: 1, next: 3, total: 4 }
        }
      )
    ).toEqual({
      previousPage: 1,
      nextPage: 3,
      total: 4,
      isLoading: false
    });
  });

  it('should handle GET_NEXT_PAGE', () => {
    expect(
      paginationReducer(
        {
          currentPage: 1,
          nextPage: 2
        },
        { type: types.GET_NEXT_PAGE }
      )
    ).toEqual({
      currentPage: 2,
      nextPage: 2
    });

    expect(
      paginationReducer(
        {
          currentPage: 1,
          nextPage: undefined
        },
        { type: types.GET_NEXT_PAGE }
      )
    ).toEqual({
      currentPage: 1
    });
  });

  it('should handle GET_PREV_PAGE', () => {
    expect(
      paginationReducer(
        {
          currentPage: 2,
          previousPage: 1
        },
        { type: types.GET_PREV_PAGE }
      )
    ).toEqual({
      currentPage: 1,
      previousPage: 1
    });

    expect(
      paginationReducer(
        {
          currentPage: 1,
          previousPage: undefined
        },
        { type: types.GET_PREV_PAGE }
      )
    ).toEqual({
      currentPage: 1,
      previousPage: undefined
    });
  });

  it('should handle SET_PAGE_ITEM_LIMIT', () => {
    expect(
      paginationReducer(
        { itemLimit: 5 },
        {
          type: types.SET_PAGE_ITEM_LIMIT,
          payload: 10
        }
      )
    ).toEqual(
      {
        itemLimit: 10
      },
      {
        itemLimit: 5
      }
    );

    expect(
      paginationReducer(
        { itemLimit: 5 },
        {
          type: types.SET_PAGE_ITEM_LIMIT,
          payload: 0
        }
      )
    ).toEqual({
      itemLimit: 5
    });
  });

  it('should handle ITEMS_LOADING', () => {
    expect(paginationReducer({}, { type: types.ITEMS_LOADING })).toEqual({
      isLoading: true
    });

    expect(
      paginationReducer({ isLoading: false }, { type: types.ITEMS_LOADING })
    ).toEqual(
      {
        isLoading: true
      },
      {
        isLoading: false
      }
    );
  });

  it('should handle ITEMS_ERROR', () => {
    expect(paginationReducer({}, { type: types.ITEMS_ERROR })).toEqual({
      isLoading: false
    });

    expect(
      paginationReducer({ isLoading: true }, { type: types.ITEMS_ERROR })
    ).toEqual(
      {
        isLoading: false
      },
      {
        isLoading: true
      }
    );
  });
});
