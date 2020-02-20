import itemReducer from '../redux/reducers/itemReducer';
import * as types from '../redux/actions/actionTypes';

describe('item reducer', () => {
  it('should return the initial state', () => {
    expect(itemReducer(undefined, {})).toEqual({
      items: [],
      isLoading: false,
      addedItem: false
    });
  });

  it('should handle GET_ITEMS', () => {
    const dataArrayObject = [{ item: 'Data 1' }];

    expect(
      itemReducer(
        {},
        {
          type: types.GET_ITEMS,
          payload: { data: dataArrayObject }
        }
      )
    ).toEqual({
      items: dataArrayObject,
      isLoading: false,
      addedItem: false
    });

    const additionalItems = [{ item: 'Data 2' }];

    expect(
      itemReducer(
        {
          items: [{ item: 'Data 1' }],
          isLoading: false,
          addedItem: false
        },
        {
          type: types.GET_ITEMS,
          payload: { data: additionalItems }
        }
      )
    ).toEqual(
      {
        items: [{ item: 'Data 2' }],
        isLoading: false,
        addedItem: false
      },
      {
        items: [{ item: 'Data 1' }],
        isLoading: false,
        addedItem: false
      }
    );
  });

  it('should handle DELETE_ITEMS', () => {
    const dataArrayObject = [{ item: 'Data 1', _id: 0 }];

    expect(
      itemReducer(
        {
          items: dataArrayObject,
          isLoading: false,
          addedItem: false
        },
        {
          type: types.DELETE_ITEM,
          payload: dataArrayObject[0]._id
        }
      )
    ).toEqual({
      items: [],
      isLoading: false,
      addedItem: false
    });

    const muiltipleItems = [
      { item: 'Data 1', _id: 0 },
      { item: 'Data 2', _id: 1 }
    ];

    expect(
      itemReducer(
        {
          items: muiltipleItems,
          isLoading: false,
          addedItem: false
        },
        {
          type: types.DELETE_ITEM,
          payload: muiltipleItems[0]._id
        }
      )
    ).toEqual(
      {
        items: [{ item: 'Data 2', _id: 1 }],
        isLoading: false,
        addedItem: false
      },
      {
        items: [
          { item: 'Data 1', _id: 0 },
          { item: 'Data 2', _id: 1 }
        ],
        isLoading: false,
        addedItem: false
      }
    );
  });

  it('should handle ADD_ITEM_PRELOAD', () => {
    expect(
      itemReducer(
        {},
        {
          type: types.ADD_ITEM_PRELOAD
        }
      )
    ).toEqual({
      addedItem: false
    });

    expect(
      itemReducer(
        {
          addedItem: true
        },
        {
          type: types.ADD_ITEM_PRELOAD
        }
      )
    ).toEqual({ addedItem: false }, { addedItem: true });
  });

  it('should handle ADD_ITEM', () => {
    const dataObject = { data: 'Item 1', _id: 0 };

    expect(
      itemReducer(
        {
          items: [],
          isLoading: false,
          addedItem: false
        },
        {
          type: types.ADD_ITEM,
          payload: dataObject
        }
      )
    ).toEqual({
      items: [dataObject],
      isLoading: false,
      addedItem: true
    });

    const moreDataObjects = { data: 'Item 2', _id: 1 };

    expect(
      itemReducer(
        {
          items: [{ data: 'Item 1', _id: 0 }],
          isLoading: false,
          addedItem: false
        },
        {
          type: types.ADD_ITEM,
          payload: moreDataObjects
        }
      )
    ).toEqual(
      {
        items: [
          { data: 'Item 2', _id: 1 },
          { data: 'Item 1', _id: 0 }
        ],
        isLoading: false,
        addedItem: true
      },
      {
        items: [{ data: 'Item 1', _id: 0 }],
        isLoading: false,
        addedItem: true
      }
    );
  });

  it('should handle ITEMS_LOADING', () => {
    expect(
      itemReducer(
        {},
        {
          type: types.ITEMS_LOADING
        }
      )
    ).toEqual({
      isLoading: true
    });

    expect(
      itemReducer(
        {
          isLoading: false
        },
        {
          type: types.ITEMS_LOADING
        }
      )
    ).toEqual({ isLoading: true }, { isLoading: false });
  });

  it('should handle ITEMS_ERROR', () => {
    expect(
      itemReducer(
        {},
        {
          type: types.ITEMS_ERROR
        }
      )
    ).toEqual({
      isLoading: false
    });

    expect(
      itemReducer(
        {
          isLoading: true
        },
        {
          type: types.ITEMS_ERROR
        }
      )
    ).toEqual({ isLoading: false }, { isLoading: true });
  });
});
