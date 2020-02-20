import {
  GET_ITEMS,
  GET_NEXT_PAGE,
  GET_PREV_PAGE,
  SET_PAGE_ITEM_LIMIT,
  ITEMS_LOADING,
  ITEMS_ERROR
} from '../actions/actionTypes';

const initialState = {
  currentPage: 1,
  itemLimit: 5,
  previousPage: undefined,
  nextPage: undefined,
  total: {},
  isLoading: false
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        previousPage: action.payload.previous,
        nextPage: action.payload.next,
        total: action.payload.total,
        isLoading: false
      };
    case GET_NEXT_PAGE:
      if (state.currentPage > 0 && state.nextPage !== undefined) {
        return {
          ...state,
          currentPage: state.nextPage
        };
      } else {
        return {
          ...state
        };
      }

    case GET_PREV_PAGE:
      if (state.currentPage > 1 && state.previousPage !== undefined) {
        return {
          ...state,
          currentPage: state.previousPage
        };
      } else {
        return {
          ...state
        };
      }

    case SET_PAGE_ITEM_LIMIT:
      return {
        ...state,
        itemLimit: action.payload > 0 ? action.payload : state.itemLimit
      };

    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ITEMS_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
