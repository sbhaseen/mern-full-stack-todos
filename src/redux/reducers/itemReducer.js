import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_ERROR,
  ADD_ITEM_PRELOAD
} from '../actions/actionTypes';

const initialState = {
  items: [],
  isLoading: false,
  addedItem: false
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        addedItem: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM_PRELOAD:
      return {
        ...state,
        addedItem: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        isLoading: false,
        addedItem: true
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
